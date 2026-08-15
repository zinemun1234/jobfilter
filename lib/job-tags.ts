/**
 * 공고 제목/내용에서 IT/개발/기획 관련 기술 키워드를 추출합니다.
 * AI 없이 룰 기반으로 동작하며, 중복을 제거한 태그 배열을 반환합니다.
 */

const KEYWORDS: { keyword: string; tag: string }[] = [
  // 언어
  { keyword: 'JavaScript', tag: 'JavaScript' },
  { keyword: 'TypeScript', tag: 'TypeScript' },
  { keyword: 'Python', tag: 'Python' },
  { keyword: 'Java', tag: 'Java' },
  { keyword: 'C++', tag: 'C++' },
  { keyword: 'C#', tag: 'C#' },
  { keyword: 'Go', tag: 'Go' },
  { keyword: 'Rust', tag: 'Rust' },
  { keyword: 'Kotlin', tag: 'Kotlin' },
  { keyword: 'Swift', tag: 'Swift' },
  { keyword: 'PHP', tag: 'PHP' },
  { keyword: 'Ruby', tag: 'Ruby' },
  { keyword: 'R', tag: 'R' },
  { keyword: 'SQL', tag: 'SQL' },
  { keyword: 'HTML', tag: 'HTML' },
  { keyword: 'CSS', tag: 'CSS' },
  // 프레임워크/라이브러리
  { keyword: 'React', tag: 'React' },
  { keyword: 'Next.js', tag: 'Next.js' },
  { keyword: 'Vue', tag: 'Vue' },
  { keyword: 'Angular', tag: 'Angular' },
  { keyword: 'Svelte', tag: 'Svelte' },
  { keyword: 'Node.js', tag: 'Node.js' },
  { keyword: 'Spring', tag: 'Spring' },
  { keyword: 'Django', tag: 'Django' },
  { keyword: 'Flask', tag: 'Flask' },
  { keyword: 'FastAPI', tag: 'FastAPI' },
  { keyword: 'Express', tag: 'Express' },
  { keyword: 'NestJS', tag: 'NestJS' },
  { keyword: 'Laravel', tag: 'Laravel' },
  { keyword: 'Rails', tag: 'Rails' },
  { keyword: '.NET', tag: '.NET' },
  { keyword: 'jQuery', tag: 'jQuery' },
  { keyword: 'Bootstrap', tag: 'Bootstrap' },
  { keyword: 'Tailwind', tag: 'Tailwind CSS' },
  { keyword: 'TensorFlow', tag: 'TensorFlow' },
  { keyword: 'PyTorch', tag: 'PyTorch' },
  { keyword: 'Keras', tag: 'Keras' },
  { keyword: 'Pandas', tag: 'Pandas' },
  { keyword: 'NumPy', tag: 'NumPy' },
  { keyword: 'OpenCV', tag: 'OpenCV' },
  // 데이터/AI/클라우드/인프라
  { keyword: '데이터', tag: '데이터' },
  { keyword: 'AI', tag: 'AI' },
  { keyword: '인공지능', tag: '인공지능' },
  { keyword: '머신러닝', tag: '머신러닝' },
  { keyword: '딥러닝', tag: '딥러닝' },
  { keyword: 'LLM', tag: 'LLM' },
  { keyword: 'AWS', tag: 'AWS' },
  { keyword: 'Azure', tag: 'Azure' },
  { keyword: 'GCP', tag: 'GCP' },
  { keyword: 'Docker', tag: 'Docker' },
  { keyword: 'Kubernetes', tag: 'Kubernetes' },
  { keyword: 'Jenkins', tag: 'Jenkins' },
  { keyword: 'Terraform', tag: 'Terraform' },
  { keyword: 'Linux', tag: 'Linux' },
  { keyword: 'Nginx', tag: 'Nginx' },
  { keyword: 'Apache', tag: 'Apache' },
  { keyword: 'Kafka', tag: 'Kafka' },
  { keyword: 'Redis', tag: 'Redis' },
  { keyword: 'Elasticsearch', tag: 'Elasticsearch' },
  { keyword: 'GraphQL', tag: 'GraphQL' },
  { keyword: 'REST API', tag: 'REST API' },
  { keyword: 'gRPC', tag: 'gRPC' },
  { keyword: 'Microservices', tag: 'Microservices' },
  // DB
  { keyword: 'MySQL', tag: 'MySQL' },
  { keyword: 'PostgreSQL', tag: 'PostgreSQL' },
  { keyword: 'MongoDB', tag: 'MongoDB' },
  { keyword: 'Oracle', tag: 'Oracle' },
  { keyword: 'SQLite', tag: 'SQLite' },
  { keyword: 'Firebase', tag: 'Firebase' },
  // 직군
  { keyword: '프론트엔드', tag: '프론트엔드' },
  { keyword: '백엔드', tag: '백엔드' },
  { keyword: '풀스택', tag: '풀스택' },
  { keyword: '웹 개발', tag: '웹 개발' },
  { keyword: '모바일', tag: '모바일' },
  { keyword: 'DevOps', tag: 'DevOps' },
  { keyword: 'MLOps', tag: 'MLOps' },
  { keyword: 'SRE', tag: 'SRE' },
  { keyword: '보안', tag: '보안' },
  { keyword: 'QA', tag: 'QA' },
  { keyword: 'UI/UX', tag: 'UI/UX' },
  { keyword: 'PM', tag: 'PM' },
  { keyword: '기획', tag: '기획' },
  { keyword: '데이터 분석', tag: '데이터 분석' },
  { keyword: '데이터 엔지니어', tag: '데이터 엔지니어' },
  { keyword: '사무', tag: '사무' },
  // 도구/협업
  { keyword: 'Git', tag: 'Git' },
  { keyword: 'GitHub', tag: 'GitHub' },
  { keyword: 'GitLab', tag: 'GitLab' },
  { keyword: 'Bitbucket', tag: 'Bitbucket' },
  { keyword: 'Jira', tag: 'Jira' },
  { keyword: 'Confluence', tag: 'Confluence' },
  { keyword: 'Notion', tag: 'Notion' },
  { keyword: 'Figma', tag: 'Figma' },
  { keyword: 'Slack', tag: 'Slack' },
  { keyword: 'Excel', tag: 'Excel' },
  { keyword: 'PowerPoint', tag: 'PowerPoint' },
  { keyword: 'Word', tag: 'Word' },
];

function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function extractJobTags(text: string): string[] {
  const lower = text.toLowerCase();
  const tags = new Set<string>();
  for (const { keyword, tag } of KEYWORDS) {
    const escaped = escapeRegExp(keyword);
    const pattern = /[a-z0-9#+./]/.test(keyword)
      ? new RegExp(`(^|[^\\w])${escaped}($|[^\\w])`, 'i')
      : new RegExp(escaped, 'i');
    if (pattern.test(lower)) tags.add(tag);
  }
  return Array.from(tags);
}
