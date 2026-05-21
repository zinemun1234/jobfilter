'use client';

import { useState } from 'react';
import { Building2, Upload, CheckCircle, AlertCircle, FileSpreadsheet, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

type JobRow = {
  company: string;
  position: string;
  location: string;
  career: string;
  employType: string;
  salary: string;
  deadline: string;
  url: string;
  description: string;
  contactEmail: string;
  headcount: string;
};

const emptyRow = (): JobRow => ({
  company: '', position: '', location: '', career: '신입',
  employType: '정규직', salary: '', deadline: '', url: '',
  description: '', contactEmail: '', headcount: '',
});

type SubmitState = 'idle' | 'loading' | 'success' | 'error';

export default function RecruitPage() {
  const [mode, setMode] = useState<'manual' | 'excel'>('manual');
  const [rows, setRows] = useState<JobRow[]>([emptyRow()]);
  const [state, setState] = useState<SubmitState>('idle');
  const [resultMsg, setResultMsg] = useState('');

  // 수동 입력 제출
  async function handleManualSubmit(e: React.FormEvent) {
    e.preventDefault();
    const valid = rows.filter(r => r.company && r.position);
    if (valid.length === 0) { toast.error('회사명과 직무명은 필수입니다'); return; }
    setState('loading');
    try {
      const res = await fetch('/api/recruit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobs: valid }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Failed');
      setState('success');
      setResultMsg(`${data.inserted}건 등록 완료${data.skipped > 0 ? ` (중복 ${data.skipped}건 제외)` : ''}`);
      setRows([emptyRow()]);
    } catch (err: unknown) {
      setState('error');
      setResultMsg(err instanceof Error ? err.message : '등록 실패');
    }
  }

  // 엑셀 업로드 제출
  async function handleExcelSubmit(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setState('loading');
    const form = new FormData();
    form.append('file', file);
    try {
      const res = await fetch('/api/recruit', { method: 'POST', body: form });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Failed');
      setState('success');
      setResultMsg(`${data.inserted}건 등록 완료${data.skipped > 0 ? ` (중복 ${data.skipped}건 제외)` : ''}`);
    } catch (err: unknown) {
      setState('error');
      setResultMsg(err instanceof Error ? err.message : '등록 실패');
    }
    e.target.value = '';
  }

  function updateRow(i: number, field: keyof JobRow, val: string) {
    setRows(prev => prev.map((r, idx) => idx === i ? { ...r, [field]: val } : r));
  }

  if (state === 'success') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center space-y-4">
          <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-7 h-7 text-emerald-600" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">등록 완료</h2>
          <p className="text-sm text-gray-500">{resultMsg}</p>
          <p className="text-xs text-gray-400">담당자 검토 후 학생들에게 공개됩니다.</p>
          <button
            type="button"
            onClick={() => setState('idle')}
            className="mt-2 px-6 py-2.5 bg-[#0f172a] text-white text-sm font-medium rounded-lg hover:bg-[#1e293b] transition-colors"
          >
            추가 등록하기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* 헤더 */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 mb-2">
            <Building2 className="w-3.5 h-3.5 text-blue-500" />
            <span className="text-xs font-semibold text-blue-600">기업 채용공고 등록</span>
          </div>
          <h1 className="text-2xl font-semibold text-gray-900">채용공고 등록</h1>
          <p className="text-sm text-gray-500">
            컴퓨터공학부 학생들에게 채용공고를 직접 등록하세요.<br />
            담당자 검토 후 학생 포털에 공개됩니다.
          </p>
        </div>

        {/* 모드 선택 */}
        <div className="flex rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          <button
            type="button"
            onClick={() => setMode('manual')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors ${
              mode === 'manual' ? 'bg-[#0f172a] text-white' : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <Plus className="w-4 h-4" /> 직접 입력
          </button>
          <button
            type="button"
            onClick={() => setMode('excel')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors ${
              mode === 'excel' ? 'bg-[#0f172a] text-white' : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" /> 엑셀 일괄 등록
          </button>
        </div>

        {state === 'error' && (
          <div className="flex items-center gap-2 rounded-xl bg-red-50 border border-red-100 px-4 py-3">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
            <p className="text-sm text-red-600">{resultMsg}</p>
          </div>
        )}

        {/* 직접 입력 모드 */}
        {mode === 'manual' && (
          <form onSubmit={handleManualSubmit} className="space-y-4">
            {rows.map((row, i) => (
              <div key={i} className="rounded-xl border border-gray-200 bg-white shadow-sm p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">공고 {i + 1}</p>
                  {rows.length > 1 && (
                    <button type="button" onClick={() => setRows(p => p.filter((_, idx) => idx !== i))}
                      className="text-xs text-red-400 hover:text-red-600 flex items-center gap-1">
                      <Trash2 className="w-3.5 h-3.5" /> 삭제
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">회사명 *</label>
                    <input required value={row.company} onChange={e => updateRow(i, 'company', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f172a]/20"
                      placeholder="(주)회사명" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">직무명 *</label>
                    <input required value={row.position} onChange={e => updateRow(i, 'position', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f172a]/20"
                      placeholder="백엔드 개발자" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">근무지</label>
                    <input value={row.location} onChange={e => updateRow(i, 'location', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f172a]/20"
                      placeholder="서울 강남구" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">경력</label>
                    <select value={row.career} onChange={e => updateRow(i, 'career', e.target.value)}
                      aria-label="경력 선택"
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f172a]/20 bg-white">
                      <option>신입</option>
                      <option>경력</option>
                      <option>신입/경력</option>
                      <option>무관</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">고용형태</label>
                    <select value={row.employType} onChange={e => updateRow(i, 'employType', e.target.value)}
                      aria-label="고용형태 선택"
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f172a]/20 bg-white">
                      <option>정규직</option>
                      <option>계약직</option>
                      <option>인턴</option>
                      <option>파트타임</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">급여</label>
                    <input value={row.salary} onChange={e => updateRow(i, 'salary', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f172a]/20"
                      placeholder="협의 / 3,000만원" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">마감일</label>
                    <input type="date" value={row.deadline} onChange={e => updateRow(i, 'deadline', e.target.value)}
                      aria-label="마감일 선택"
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f172a]/20" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">모집인원</label>
                    <input value={row.headcount} onChange={e => updateRow(i, 'headcount', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f172a]/20"
                      placeholder="0명" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">담당자 이메일</label>
                    <input type="email" value={row.contactEmail} onChange={e => updateRow(i, 'contactEmail', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f172a]/20"
                      placeholder="hr@company.com" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">공고 URL</label>
                    <input type="url" value={row.url} onChange={e => updateRow(i, 'url', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f172a]/20"
                      placeholder="https://..." />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">공고 상세 내용</label>
                  <textarea value={row.description} onChange={e => updateRow(i, 'description', e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f172a]/20 resize-none"
                    placeholder="담당 업무, 자격 요건, 우대 사항 등을 입력하세요" />
                </div>
              </div>
            ))}

            <button type="button" onClick={() => setRows(p => [...p, emptyRow()])}
              className="w-full py-2.5 border-2 border-dashed border-gray-200 text-sm text-gray-400 rounded-xl hover:border-gray-300 hover:text-gray-600 transition-colors flex items-center justify-center gap-2">
              <Plus className="w-4 h-4" /> 공고 추가
            </button>

            <button type="submit" disabled={state === 'loading'}
              className="w-full py-3 bg-[#0f172a] text-white text-sm font-medium rounded-xl hover:bg-[#1e293b] disabled:opacity-50 transition-colors">
              {state === 'loading' ? '등록 중...' : `공고 ${rows.length}건 등록 신청`}
            </button>
          </form>
        )}

        {/* 엑셀 업로드 모드 */}
        {mode === 'excel' && (
          <div className="space-y-4">
            <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-6 space-y-4">
              <p className="text-sm font-medium text-gray-700">엑셀 파일 업로드</p>
              <p className="text-xs text-gray-400">
                컬럼 순서: 회사명, 직무명, 근무지, 경력, 고용형태, 급여, 마감일, URL, 상세내용, 담당자이메일, 모집인원
              </p>
              <label className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-gray-200 rounded-xl py-10 cursor-pointer hover:border-blue-300 hover:bg-blue-50/30 transition-colors">
                <Upload className="w-8 h-8 text-gray-300" />
                <span className="text-sm text-gray-400">클릭하여 .xlsx 파일 선택</span>
                <input type="file" accept=".xlsx,.xls" className="hidden" onChange={handleExcelSubmit} disabled={state === 'loading'} />
              </label>
              {state === 'loading' && (
                <p className="text-center text-sm text-gray-400 animate-pulse">업로드 중...</p>
              )}
            </div>
          </div>
        )}

        <p className="text-center text-xs text-gray-400">
          등록된 공고는 담당자 검토 후 학생 포털에 공개됩니다. 문의: 학생성공처
        </p>
      </div>
    </div>
  );
}
