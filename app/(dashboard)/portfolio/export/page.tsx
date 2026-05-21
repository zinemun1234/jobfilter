'use client';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Download, FileText } from 'lucide-react';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, Font } from '@react-pdf/renderer';

type Portfolio = {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  startDate: string;
  endDate: string | null;
  githubUrl: string | null;
  deployUrl: string | null;
};

type ProfileData = {
  name: string | null;
  email: string;
  major: string | null;
  targetJob: string | null;
  skills: string[];
};

// PDF 스타일
const styles = StyleSheet.create({
  page: { padding: 40, fontFamily: 'Helvetica', backgroundColor: '#ffffff' },
  header: { marginBottom: 24, borderBottom: '1 solid #e2e8f0', paddingBottom: 16 },
  name: { fontSize: 22, fontFamily: 'Helvetica-Bold', color: '#0f172a', marginBottom: 4 },
  meta: { fontSize: 10, color: '#64748b', marginBottom: 2 },
  sectionLabel: { fontSize: 8, color: '#94a3b8', letterSpacing: 1.5, marginBottom: 8, marginTop: 20 },
  card: { marginBottom: 12, padding: 12, backgroundColor: '#f8fafc', borderRadius: 4 },
  cardTitle: { fontSize: 13, fontFamily: 'Helvetica-Bold', color: '#0f172a', marginBottom: 4 },
  cardDesc: { fontSize: 10, color: '#475569', lineHeight: 1.5, marginBottom: 6 },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 4 },
  tag: { fontSize: 9, color: '#475569', backgroundColor: '#e2e8f0', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 3 },
  dateText: { fontSize: 9, color: '#94a3b8', marginBottom: 4 },
  linkText: { fontSize: 9, color: '#3b82f6' },
  skillsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 4 },
});

function PortfolioPDF({ profile, portfolios }: { profile: ProfileData; portfolios: Portfolio[] }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* 헤더 */}
        <View style={styles.header}>
          <Text style={styles.name}>{profile.name ?? '이름 없음'}</Text>
          <Text style={styles.meta}>{profile.email}</Text>
          {profile.major && <Text style={styles.meta}>전공: {profile.major}</Text>}
          {profile.targetJob && <Text style={styles.meta}>목표 직무: {profile.targetJob}</Text>}
        </View>

        {/* 기술 스택 */}
        {profile.skills.length > 0 && (
          <View>
            <Text style={styles.sectionLabel}>SKILLS</Text>
            <View style={styles.skillsRow}>
              {profile.skills.map((s, i) => (
                <Text key={i} style={styles.tag}>{s}</Text>
              ))}
            </View>
          </View>
        )}

        {/* 프로젝트 */}
        <Text style={styles.sectionLabel}>PROJECTS</Text>
        {portfolios.map(p => (
          <View key={p.id} style={styles.card}>
            <Text style={styles.cardTitle}>{p.title}</Text>
            <Text style={styles.dateText}>
              {new Date(p.startDate).toLocaleDateString('ko-KR', { year: 'numeric', month: 'short' })}
              {p.endDate
                ? ` ~ ${new Date(p.endDate).toLocaleDateString('ko-KR', { year: 'numeric', month: 'short' })}`
                : ' ~ 진행 중'}
            </Text>
            <Text style={styles.cardDesc}>{p.description}</Text>
            {p.techStack.length > 0 && (
              <View style={styles.tagRow}>
                {p.techStack.map((t, i) => <Text key={i} style={styles.tag}>{t}</Text>)}
              </View>
            )}
            {(p.githubUrl || p.deployUrl) && (
              <View style={{ marginTop: 6, gap: 2 }}>
                {p.githubUrl && <Text style={styles.linkText}>GitHub: {p.githubUrl}</Text>}
                {p.deployUrl && <Text style={styles.linkText}>Deploy: {p.deployUrl}</Text>}
              </View>
            )}
          </View>
        ))}
      </Page>
    </Document>
  );
}

async function fetchPortfolios(): Promise<Portfolio[]> {
  const res = await fetch('/api/portfolio');
  if (!res.ok) throw new Error('Failed');
  return (await res.json()).data;
}
async function fetchProfile(): Promise<ProfileData> {
  const res = await fetch('/api/profile');
  if (!res.ok) throw new Error('Failed');
  const d = await res.json();
  return { ...d.data, skills: (() => { try { return JSON.parse(d.data.skills); } catch { return []; } })() };
}

export default function PortfolioExportPage() {
  const { data: portfolios = [], isLoading: pLoading } = useQuery({ queryKey: ['portfolios'], queryFn: fetchPortfolios });
  const { data: profile, isLoading: prLoading } = useQuery({ queryKey: ['profile'], queryFn: fetchProfile });
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const isLoading = pLoading || prLoading;
  const filtered = portfolios.filter(p => selected.size === 0 || selected.has(p.id));

  function toggle(id: string) {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-8 space-y-6">
      <div className="border-b border-gray-200 pb-5">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-1">Export</p>
        <h1 className="text-xl font-semibold text-gray-900">포트폴리오 PDF 내보내기</h1>
        <p className="text-sm text-gray-400 mt-1">포함할 프로젝트를 선택하고 PDF로 다운로드하세요</p>
      </div>

      {isLoading ? (
        <div className="space-y-3 animate-pulse">{[...Array(3)].map((_, i) => <div key={i} className="h-16 bg-gray-100 rounded-xl" />)}</div>
      ) : (
        <>
          <div className="space-y-2">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-widest">프로젝트 선택</p>
              <button onClick={() => setSelected(new Set())} className="text-xs text-gray-400 hover:text-gray-600">
                {selected.size === 0 ? '전체 포함됨' : `${selected.size}개 선택됨 · 초기화`}
              </button>
            </div>
            {portfolios.map(p => (
              <label key={p.id} className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-colors ${
                selected.has(p.id) ? 'border-[#0f172a] bg-[#0f172a]/5' : 'border-gray-100 bg-white hover:bg-gray-50'
              }`}>
                <input type="checkbox" checked={selected.size === 0 || selected.has(p.id)}
                  onChange={() => toggle(p.id)} className="rounded" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{p.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{p.description}</p>
                </div>
                <div className="flex flex-wrap gap-1 max-w-[160px] justify-end">
                  {p.techStack.slice(0, 3).map(t => (
                    <span key={t} className="text-[10px] bg-gray-100 text-gray-500 rounded px-1.5 py-0.5">{t}</span>
                  ))}
                </div>
              </label>
            ))}
          </div>

          {profile && filtered.length > 0 && (
            <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-3">미리보기</p>
              <div className="space-y-1 text-sm text-gray-700">
                <p><span className="font-medium">{profile.name}</span> · {profile.email}</p>
                {profile.targetJob && <p className="text-gray-400">목표 직무: {profile.targetJob}</p>}
                <p className="text-gray-400">프로젝트 {filtered.length}개 포함</p>
              </div>
              <div className="mt-4">
                <PDFDownloadLink
                  document={<PortfolioPDF profile={profile} portfolios={filtered} />}
                  fileName={`portfolio_${profile.name ?? 'export'}.pdf`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0f172a] text-white text-sm font-medium rounded-lg hover:bg-[#1e293b] transition-colors"
                >
                  <Download className="w-4 h-4" />
                  PDF 다운로드
                </PDFDownloadLink>
              </div>
            </div>
          )}

          {filtered.length === 0 && (
            <div className="rounded-xl border border-gray-100 bg-white py-12 text-center shadow-sm">
              <FileText className="w-8 h-8 text-gray-200 mx-auto mb-2" />
              <p className="text-sm text-gray-400">포트폴리오가 없습니다</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
