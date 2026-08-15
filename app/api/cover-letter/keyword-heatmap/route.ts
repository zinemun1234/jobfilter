/**
 * POST /api/cover-letter/keyword-heatmap
 * JD의 키워드가 자소서 문항에 얼마나 포함되어 있는지 히트맵 데이터 반환
 *
 * 입력: { coverLetterId, jobListingId }
 * 출력: { keywords: string[], matrix: number[][], company, position }
 */
import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthSession, successResponse, badRequest, notFound } from '@/lib/api';
import { handleApiError } from '@/lib/errors';

function parseJson(value: string | null): string[] {
  if (!value) return [];
  try { return JSON.parse(value); } catch { return []; }
}

// 기술/역량 키워드 사전 (description 추가 추출용)
const TECH_KEYWORDS = [
  'JavaScript', 'TypeScript', 'React', 'Next.js', 'Vue', 'Angular', 'Node.js',
  'Python', 'Django', 'Flask', 'FastAPI', 'Java', 'Spring', 'Spring Boot',
  'SQL', 'MySQL', 'PostgreSQL', 'Oracle', 'MongoDB', 'Redis', 'Elasticsearch',
  'NoSQL', 'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP', 'CI/CD',
  'Git', 'GitHub', 'GitLab', 'Linux', 'REST API', 'GraphQL', 'gRPC',
  'Kafka', 'RabbitMQ', 'Airflow', 'Spark', 'Hadoop', 'TensorFlow', 'PyTorch',
  'Pandas', 'NumPy', 'Scikit-learn', 'Keras', 'Tableau', 'Power BI',
  'Figma', 'Notion', 'Jira', 'Confluence', 'Slack', 'TDD', 'Jest', 'Cypress',
  'Selenium', 'C', 'C++', 'C#', 'Go', 'Rust', 'Swift', 'Kotlin',
  'Flutter', 'React Native', 'iOS', 'Android', 'HTML', 'CSS', 'Sass', 'Tailwind',
  'PHP', 'Laravel', 'Ruby', 'Rails', '.NET', 'ASP.NET', 'Blazor',
  'WebSocket', 'OAuth', 'JWT', 'Microservices', 'Serverless', 'Lambda',
  'EC2', 'S3', 'RDS', 'CloudFront', 'CloudWatch', 'Prometheus', 'Grafana',
  'Terraform', 'Ansible', 'Jenkins', 'GitHub Actions', 'Nginx', 'Apache',
];

function extractKeywords(description: string, tags: string[]): string[] {
  const lowerDesc = description.toLowerCase();
  const fromDesc = TECH_KEYWORDS.filter((k) => lowerDesc.includes(k.toLowerCase()));
  const fromTags = tags.map((t) => t.trim()).filter(Boolean);
  const all = Array.from(new Set([...fromTags, ...fromDesc]));
  return all.slice(0, 20);
}

function countKeyword(text: string, keyword: string): number {
  if (!keyword) return 0;
  const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const matches = text.toLowerCase().match(new RegExp(escaped, 'gi'));
  return matches ? matches.length : 0;
}

export async function POST(req: NextRequest) {
  try {
    const userId = await getAuthSession();
    const { coverLetterId, jobListingId } = await req.json();

    if (!coverLetterId || !jobListingId) {
      return badRequest('coverLetterId와 jobListingId가 필요합니다.');
    }

    const coverLetter = await prisma.coverLetter.findFirst({
      where: { id: coverLetterId, userId },
      select: { id: true, items: true, company: true, position: true },
    });
    if (!coverLetter) return notFound('자소서를 찾을 수 없습니다.');

    const jobListing = await prisma.jobListing.findUnique({
      where: { id: jobListingId },
      select: { id: true, company: true, position: true, description: true, tags: true },
    });
    if (!jobListing) return notFound('공고를 찾을 수 없습니다.');

    const items = parseJson(coverLetter.items as string) as unknown as { question: string; answer: string }[];
    const tags = parseJson(jobListing.tags as string);
    const keywords = extractKeywords(jobListing.description ?? '', tags);

    const matrix = items.map((item) => {
      const text = `${item.question || ''} ${item.answer || ''}`;
      return keywords.map((keyword) => countKeyword(text, keyword));
    });

    return successResponse({
      company: jobListing.company,
      position: jobListing.position,
      keywords,
      matrix,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
