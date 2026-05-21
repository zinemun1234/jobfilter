'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { FileSpreadsheet, CheckCircle2, XCircle, ArrowLeft, Filter, Building2 } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';

type JobRow = {
  company: string;
  position: string;
  location?: string;
  career?: string;
  employType?: string;
  education?: string;
  salary?: string;
  deadline?: string;
  url?: string;
  description?: string;
  contactEmail?: string;
  headcount?: string;
};

type PreviewResult = {
  total: number;
  parsed: number;
  valid: number;
  expired: number;
  rows: JobRow[];
};

export default function BulkJobsPage() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<PreviewResult | null>(null);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [registering, setRegistering] = useState(false);

  function handleFile(f: File) {
    if (!f.name.match(/\.(xlsx|xls|csv)$/i)) {
      toast.error('xlsx, xls, csv 파일만 업로드 가능합니다');
      return;
    }
    setFile(f);
    setPreview(null);
    setSelected(new Set());
  }

  async function handleUpload() {
    if (!file) return;
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/admin/bulk-jobs', { method: 'POST', body: fd });
      if (!res.ok) throw new Error();
      const json = await res.json();
      setPreview(json.data);
      setSelected(new Set(json.data.rows.map((_: JobRow, i: number) => i)));
    } catch {
      toast.error('파일 분석에 실패했습니다');
    } finally {
      setLoading(false);
    }
  }

  function toggleRow(i: number) {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  }

  function toggleAll() {
    if (!preview) return;
    setSelected(
      selected.size === preview.rows.length
        ? new Set()
        : new Set(preview.rows.map((_, i) => i))
    );
  }

  async function handleRegister() {
    if (!preview || selected.size === 0) return;
    setRegistering(true);
    try {
      const rows = preview.rows.filter((_, i) => selected.has(i));
      const res = await fetch('/api/admin/bulk-jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rows }),
      });
      if (!res.ok) throw new Error();
      const json = await res.json();
      const msg = json.data.duplicateCount > 0
        ? `${json.data.count}개 등록 완료 (중복 ${json.data.duplicateCount}개 제외)`
        : `${json.data.count}개 공고가 등록되었습니다`;
      toast.success(msg);
      router.push('/admin/listings');
    } catch {
      toast.error('등록에 실패했습니다');
    } finally {
      setRegistering(false);
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">
      <div className="flex items-end justify-between border-b border-gray-200 pb-5">
        <div>
          <Link href="/admin" className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 mb-2 transition-colors">
            <ArrowLeft className="w-3 h-3" /> 관리 대시보드로 돌아가기
          </Link>
          <div className="flex items-center gap-2 mb-1">
            <Building2 className="w-5 h-5 text-gray-600" />
            <h1 className="text-xl font-semibold text-gray-900">구인자 공고 일괄 등록</h1>
          </div>
          <p className="text-xs text-gray-400">기업 담당자가 제공한 엑셀 파일을 업로드하여 공고를 일괄 등록합니다. 마감된 공고는 자동으로 제외됩니다.</p>
        </div>
      </div>

      {/* 차이점 안내 */}
      <div className="rounded-xl border border-blue-100 bg-blue-50/50 px-5 py-4 text-xs text-blue-700 space-y-1">
        <p className="font-semibold">학생성공처 업로드와의 차이점</p>
        <p>· 학생성공처 업로드: CS 직군 자동 필터링 → 컴공 맞춤 공고만 추출</p>
        <p>· 구인자 직접등록: 기업이 직접 제출한 공고 → 필터링 없이 전체 등록 (출처: 구인자 직접등록)</p>
      </div>

      {/* 업로드 영역 */}
      <div
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={e => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
        onClick={() => inputRef.current?.click()}
        className={`relative flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed py-14 cursor-pointer transition-colors ${
          dragging ? 'border-[#0f172a] bg-gray-50' : 'border-gray-200 hover:border-gray-300 bg-white'
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".xlsx,.xls,.csv"
          aria-label="구인자 공고 엑셀 파일 업로드"
          title="구인자 공고 엑셀 파일 업로드"
          className="hidden"
          onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
        />
        <FileSpreadsheet className="w-10 h-10 text-gray-300" />
        {file ? (
          <div className="text-center">
            <p className="text-sm font-medium text-gray-700">{file.name}</p>
            <p className="text-xs text-gray-400 mt-0.5">{(file.size / 1024).toFixed(1)} KB</p>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-sm text-gray-500">파일을 드래그하거나 클릭하여 업로드</p>
            <p className="text-xs text-gray-400 mt-1">.xlsx, .xls, .csv 지원</p>
          </div>
        )}
      </div>

      {file && !preview && (
        <button
          type="button"
          onClick={handleUpload}
          disabled={loading}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#0f172a] text-white text-sm font-medium rounded-lg hover:bg-[#1e293b] disabled:opacity-50 transition-colors"
        >
          <Filter className="w-4 h-4" />
          {loading ? '분석 중...' : '공고 파싱 시작'}
        </button>
      )}

      {/* 분석 결과 */}
      {preview && (
        <div className="space-y-4">
          <div className="grid grid-cols-4 gap-3">
            {[
              { label: '전체 행', value: preview.total, color: 'gray' },
              { label: '파싱 성공', value: preview.parsed, color: 'gray' },
              { label: '마감 제외', value: preview.expired, color: 'red' },
              { label: '등록 가능', value: preview.valid, color: 'blue' },
            ].map(({ label, value, color }) => (
              <div key={label} className={`rounded-xl border px-5 py-4 shadow-sm ${
                color === 'blue' ? 'border-blue-100 bg-blue-50' :
                color === 'red' ? 'border-red-100 bg-red-50' :
                'border-gray-100 bg-white'
              }`}>
                <p className={`text-xs mb-1 ${color === 'blue' ? 'text-blue-500' : color === 'red' ? 'text-red-400' : 'text-gray-400'}`}>{label}</p>
                <p className={`text-2xl font-semibold ${color === 'blue' ? 'text-blue-700' : color === 'red' ? 'text-red-600' : 'text-gray-900'}`}>{value}</p>
              </div>
            ))}
          </div>

          {preview.rows.length === 0 ? (
            <div className="rounded-xl border border-gray-100 bg-white py-16 text-center shadow-sm">
              <XCircle className="w-10 h-10 text-gray-200 mx-auto mb-3" />
              <p className="text-sm text-gray-400">등록 가능한 공고가 없습니다</p>
            </div>
          ) : (
            <>
              <div className="rounded-xl border border-gray-100 bg-white shadow-sm overflow-hidden">
                <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 bg-gray-50/50">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selected.size === preview.rows.length}
                      onChange={toggleAll}
                      aria-label="전체 선택"
                      title="전체 선택"
                      className="rounded border-gray-300"
                    />
                    <span className="text-xs text-gray-500">{selected.size}개 선택됨</span>
                  </div>
                  <span className="text-xs text-gray-400">총 {preview.rows.length}개</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="w-10 px-4 py-3" aria-label="선택" />
                        <th className="text-left px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">회사 / 직무</th>
                        <th className="text-left px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider hidden md:table-cell">조건</th>
                        <th className="text-left px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider hidden sm:table-cell">마감일</th>
                        <th className="text-left px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider hidden lg:table-cell">담당자</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {preview.rows.map((row, i) => (
                        <tr
                          key={i}
                          onClick={() => toggleRow(i)}
                          className={`cursor-pointer transition-colors ${selected.has(i) ? 'bg-blue-50/50' : 'hover:bg-gray-50/50'}`}
                        >
                          <td className="px-4 py-3">
                            <input
                              type="checkbox"
                              checked={selected.has(i)}
                              onChange={() => toggleRow(i)}
                              onClick={e => e.stopPropagation()}
                              aria-label={`${row.company} 선택`}
                              className="rounded border-gray-300"
                            />
                          </td>
                          <td className="px-4 py-3">
                            <p className="font-medium text-gray-900">{row.company}</p>
                            <p className="text-xs text-gray-500 mt-0.5">{row.position}</p>
                          </td>
                          <td className="px-4 py-3 hidden md:table-cell">
                            <div className="space-y-0.5 text-xs text-gray-500">
                              {row.career && <p>{row.career}</p>}
                              {row.employType && <p className="text-gray-400">{row.employType}</p>}
                              {row.headcount && <p className="text-gray-400">모집 {row.headcount}명</p>}
                            </div>
                          </td>
                          <td className="px-4 py-3 hidden sm:table-cell">
                            <span className="text-xs text-gray-500">{row.deadline ?? '-'}</span>
                          </td>
                          <td className="px-4 py-3 hidden lg:table-cell">
                            <span className="text-xs text-gray-400">{row.contactEmail ?? '-'}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => { setPreview(null); setFile(null); setSelected(new Set()); }}
                  className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
                >
                  다시 업로드
                </button>
                <button
                  type="button"
                  onClick={handleRegister}
                  disabled={selected.size === 0 || registering}
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#0f172a] text-white text-sm font-medium rounded-lg hover:bg-[#1e293b] disabled:opacity-50 transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  {registering ? '등록 중...' : `선택한 ${selected.size}개 공고 등록`}
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* 컬럼 가이드 */}
      <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">엑셀 컬럼 가이드</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs text-gray-500">
          {[
            ['회사명 *', '회사명, 기업명, 구인업체'],
            ['직무 *', '직무, 직종, 모집직종, 포지션'],
            ['근무지', '근무지, 근무지역, 지역'],
            ['경력', '경력, 경력조건'],
            ['고용형태', '고용형태, 근무형태'],
            ['마감일', '마감일, 접수마감, 채용마감일'],
            ['모집인원', '모집인원, 채용인원'],
            ['담당자이메일', '담당자이메일, 이메일, email'],
            ['URL', 'url, 링크, 공고링크'],
          ].map(([field, aliases]) => (
            <div key={field} className="flex gap-1.5">
              <span className="font-medium text-gray-700 shrink-0">{field}</span>
              <span className="text-gray-400">{aliases}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-3">* 필수 항목. 마감일이 지난 공고는 자동으로 제외됩니다.</p>
      </div>
    </div>
  );
}
