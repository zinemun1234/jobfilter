'use client';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Download, FileText } from 'lucide-react';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

type CLItem = { question: string; answer: string };
type CoverLetter = {
  id: string;
  company: string;
  position: string;
  items: CLItem[];
  updatedAt: string;
};

const styles = StyleSheet.create({
  page: { padding: 48, fontFamily: 'Helvetica', backgroundColor: '#ffffff' },
  header: { marginBottom: 24, borderBottom: '1 solid #e2e8f0', paddingBottom: 16 },
  company: { fontSize: 20, fontFamily: 'Helvetica-Bold', color: '#0f172a', marginBottom: 4 },
  position: { fontSize: 11, color: '#64748b' },
  sectionLabel: { fontSize: 8, color: '#94a3b8', letterSpacing: 1.5, marginBottom: 10, marginTop: 20, textTransform: 'uppercase' },
  item: { marginBottom: 18 },
  question: { fontSize: 10, fontFamily: 'Helvetica-Bold', color: '#374151', marginBottom: 6 },
  answer: { fontSize: 10, color: '#4b5563', lineHeight: 1.7 },
  charCount: { fontSize: 8, color: '#9ca3af', marginTop: 4, textAlign: 'right' },
  divider: { borderBottom: '1 solid #f1f5f9', marginBottom: 18 },
});

function CoverLetterPDF({ letter }: { letter: CoverLetter }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.company}>{letter.company}</Text>
          <Text style={styles.position}>{letter.position}</Text>
        </View>
        <Text style={styles.sectionLabel}>자기소개서 항목</Text>
        {letter.items.map((it, i) => (
          <View key={i} style={styles.item}>
            <Text style={styles.question}>Q{i + 1}. {it.question || '(질문 없음)'}</Text>
            <Text style={styles.answer}>{it.answer || '(답변 없음)'}</Text>
            <Text style={styles.charCount}>{it.answer.length}자</Text>
            {i < letter.items.length - 1 && <View style={styles.divider} />}
          </View>
        ))}
      </Page>
    </Document>
  );
}

async function fetchLetters(): Promise<CoverLetter[]> {
  const res = await fetch('/api/cover-letter');
  if (!res.ok) throw new Error('Failed');
  return (await res.json()).data;
}

export default function CoverLetterExportPage() {
  const { data: letters = [], isLoading } = useQuery({ queryKey: ['cover-letters'], queryFn: fetchLetters });
  const [selected, setSelected] = useState<string | null>(null);

  const letter = letters.find(l => l.id === selected) ?? null;

  return (
    <div className="max-w-3xl mx-auto px-6 py-8 space-y-6">
      <div className="border-b border-gray-200 pb-5">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-1">Export</p>
        <h1 className="text-xl font-semibold text-gray-900">자기소개서 PDF 내보내기</h1>
        <p className="text-sm text-gray-400 mt-1">내보낼 자기소개서를 선택하세요</p>
      </div>

      {isLoading ? (
        <div className="space-y-3 animate-pulse">{[...Array(3)].map((_, i) => <div key={i} className="h-16 bg-gray-100 rounded-xl" />)}</div>
      ) : letters.length === 0 ? (
        <div className="rounded-xl border border-gray-100 bg-white py-20 text-center shadow-sm">
          <FileText className="w-10 h-10 text-gray-200 mx-auto mb-3" />
          <p className="text-sm text-gray-400">자기소개서가 없습니다</p>
        </div>
      ) : (
        <>
          <div className="space-y-2">
            {letters.map(l => {
              const totalChars = l.items.reduce((s, it) => s + it.answer.length, 0);
              return (
                <label key={l.id} className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-colors ${
                  selected === l.id ? 'border-[#0f172a] bg-[#0f172a]/5' : 'border-gray-100 bg-white hover:bg-gray-50'
                }`}>
                  <input type="radio" name="letter" value={l.id} checked={selected === l.id}
                    onChange={() => setSelected(l.id)} className="accent-[#0f172a]" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{l.company}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{l.position} · 항목 {l.items.length}개 · 총 {totalChars.toLocaleString()}자</p>
                  </div>
                </label>
              );
            })}
          </div>

          {letter && (
            <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-3">미리보기</p>
              <div className="space-y-1 text-sm text-gray-700 mb-4">
                <p><span className="font-medium">{letter.company}</span> · {letter.position}</p>
                <p className="text-gray-400">항목 {letter.items.length}개</p>
              </div>
              <PDFDownloadLink
                document={<CoverLetterPDF letter={letter} />}
                fileName={`자기소개서_${letter.company}_${letter.position}.pdf`}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0f172a] text-white text-sm font-medium rounded-lg hover:bg-[#1e293b] transition-colors"
              >
                <Download className="w-4 h-4" />
                PDF 다운로드
              </PDFDownloadLink>
            </div>
          )}
        </>
      )}
    </div>
  );
}
