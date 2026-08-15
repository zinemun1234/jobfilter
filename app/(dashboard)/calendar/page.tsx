'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Briefcase, Clock, Bell, CalendarCheck, Download } from 'lucide-react';
import Link from 'next/link';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isSameDay, isToday, isBefore } from 'date-fns';
import { ko } from 'date-fns/locale';
import { toast } from 'sonner';
import { STATUS_CONFIG, STATUS_ORDER } from '@/lib/status-config';
import { downloadIcs } from '@/lib/calendar-ics';

type JobPosting = {
  id: string;
  company: string;
  position: string;
  deadline: string | null;
  interviewAt: string | null;
  status: string;
  updatedAt: string;
};

const statusDot = (s: string) => STATUS_CONFIG[s as keyof typeof STATUS_CONFIG]?.dot ?? 'bg-slate-400';
const statusLabel = (s: string) => STATUS_CONFIG[s as keyof typeof STATUS_CONFIG]?.label ?? s;

async function fetchJobs(): Promise<JobPosting[]> {
  const res = await fetch('/api/jobs');
  if (!res.ok) throw new Error('Failed');
  return (await res.json()).data;
}

// 면접 날짜 등록 모달
function InterviewModal({ job, onClose }: { job: JobPosting; onClose: () => void }) {
  const qc = useQueryClient();
  const [date, setDate] = useState(
    job.interviewAt ? job.interviewAt.slice(0, 16) : ''
  );

  const mutation = useMutation({
    mutationFn: async () => {
      // 현재 job 전체 데이터를 가져와서 interviewAt만 업데이트
      const res = await fetch(`/api/jobs/${job.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company: job.company,
          position: job.position,
          status: job.status,
          interviewAt: date || null,
        }),
      });
      if (!res.ok) throw new Error('Failed');
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['jobs'] });
      toast.success('면접 일정이 저장되었습니다');
      onClose();
    },
    onError: () => toast.error('저장에 실패했습니다'),
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm mx-4 p-6 space-y-4">
        <div>
          <p className="text-xs font-medium text-amber-500 uppercase tracking-widest mb-1">면접 일정 등록</p>
          <p className="text-sm font-semibold text-gray-900">{job.company}</p>
          <p className="text-xs text-gray-400">{job.position}</p>
        </div>
        <div>
          <label htmlFor="interview-date" className="block text-xs text-gray-500 mb-1">면접 날짜 및 시간</label>
          <input
            id="interview-date"
            type="datetime-local"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400/30"
          />
        </div>
        <div className="flex gap-2 justify-end pt-1">
          <button type="button" onClick={onClose} className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700">취소</button>
          {job.interviewAt && (
            <button
              type="button"
              onClick={() => { setDate(''); mutation.mutate(); }}
              className="px-4 py-2 text-sm text-red-500 hover:text-red-700"
            >
              삭제
            </button>
          )}
          <button
            type="button"
            disabled={mutation.isPending}
            onClick={() => mutation.mutate()}
            className="px-4 py-2 text-sm font-medium bg-amber-500 text-white rounded-lg hover:bg-amber-600 disabled:opacity-50 transition-colors"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CalendarPage() {
  const [current, setCurrent] = useState(new Date());
  const [selected, setSelected] = useState<Date | null>(null);
  const [interviewModal, setInterviewModal] = useState<JobPosting | null>(null);

  const { data: jobs = [] } = useQuery({ queryKey: ['jobs'], queryFn: fetchJobs });

  const activeJobs = jobs.filter(j => !['FINAL_PASS', 'REJECTED'].includes(j.status));
  const jobsWithDeadline = activeJobs.filter(j => j.deadline);
  const jobsWithInterview = activeJobs.filter(j => j.interviewAt);

  const monthStart = startOfMonth(current);
  const monthEnd = endOfMonth(current);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const startPad = getDay(monthStart);

  function getDeadlinesForDay(date: Date) {
    return jobsWithDeadline.filter(j => j.deadline && isSameDay(new Date(j.deadline), date));
  }
  function getInterviewsForDay(date: Date) {
    return jobsWithInterview.filter(j => j.interviewAt && isSameDay(new Date(j.interviewAt), date));
  }

  const selectedDeadlines = selected ? getDeadlinesForDay(selected) : [];
  const selectedInterviews = selected ? getInterviewsForDay(selected) : [];

  // 팔로업 필요: APPLIED 상태로 14일 이상
  const now = new Date();
  const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
  const followUpJobs = jobs.filter(j =>
    j.status === 'APPLIED' && new Date(j.updatedAt) <= twoWeeksAgo
  );

  // 이번 달 마감 목록
  const monthDeadlines = jobsWithDeadline
    .filter(j => { const d = new Date(j.deadline!); return d >= monthStart && d <= monthEnd; })
    .sort((a, b) => new Date(a.deadline!).getTime() - new Date(b.deadline!).getTime());

  // 이번 달 면접 목록
  const monthInterviews = jobsWithInterview
    .filter(j => { const d = new Date(j.interviewAt!); return d >= monthStart && d <= monthEnd; })
    .sort((a, b) => new Date(a.interviewAt!).getTime() - new Date(b.interviewAt!).getTime());

  function exportMonthIcs() {
    const events = monthInterviews.map((j) => ({
      uid: `interview-${j.id}`,
      summary: `[면접] ${j.company} - ${j.position}`,
      description: `지원 공고: ${j.position} @ ${j.company}\n준비 자료: /jobs/${j.id}`,
      start: new Date(j.interviewAt!),
    }));
    downloadIcs(events, `jobfilter-interviews-${format(current, 'yyyy-MM')}.ics`);
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">
      <div className="border-b border-gray-200 pb-6">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Calendar</p>
        <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">지원 일정 캘린더</h1>
        <p className="text-sm text-gray-500 mt-1.5">마감일과 면접 일정을 한눈에 확인하세요</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* 캘린더 */}
        <div className="md:col-span-2 rounded-2xl border border-gray-200 bg-white shadow-sm p-6">
          <div className="flex items-center justify-between mb-5">
            <button type="button" onClick={() => setCurrent(d => new Date(d.getFullYear(), d.getMonth() - 1, 1))}
              className="p-2 rounded-xl hover:bg-gray-100 transition-colors" aria-label="이전 달">
              <ChevronLeft className="w-[1.125rem] h-[1.125rem] text-gray-500" />
            </button>
            <h2 className="text-base font-semibold text-gray-900">
              {format(current, 'yyyy년 M월', { locale: ko })}
            </h2>
            <div className="flex items-center gap-2">
              {monthInterviews.length > 0 && (
                <button
                  type="button"
                  onClick={exportMonthIcs}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-2.5 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50"
                >
                  <Download className="w-3.5 h-3.5" /> .ics
                </button>
              )}
              <button type="button" onClick={() => setCurrent(d => new Date(d.getFullYear(), d.getMonth() + 1, 1))}
              className="p-2 rounded-xl hover:bg-gray-100 transition-colors" aria-label="다음 달">
              <ChevronRight className="w-[1.125rem] h-[1.125rem] text-gray-500" />
            </button>
            </div>
          </div>

          <div className="grid grid-cols-7 mb-2">
            {['일', '월', '화', '수', '목', '금', '토'].map((d, i) => (
              <div key={d} className={`text-center text-xs font-semibold py-1.5 ${i === 0 ? 'text-red-400' : i === 6 ? 'text-blue-400' : 'text-gray-400'}`}>{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-px bg-gray-100 rounded-2xl overflow-hidden">
            {Array.from({ length: startPad }).map((_, i) => (
              <div key={`pad-${i}`} className="bg-white min-h-[72px]" />
            ))}
            {days.map(day => {
              const deadlines = getDeadlinesForDay(day);
              const interviews = getInterviewsForDay(day);
              const isSelected = selected && isSameDay(day, selected);
              const isPast = isBefore(day, now) && !isToday(day);
              const dow = getDay(day);
              const hasEvents = deadlines.length > 0 || interviews.length > 0;

              return (
                <button
                  key={day.toISOString()}
                  type="button"
                  onClick={() => setSelected(isSelected ? null : day)}
                  className={`bg-white min-h-[72px] p-2 text-left transition-colors hover:bg-gray-50 ${isSelected ? 'ring-2 ring-inset ring-violet-400' : ''} ${hasEvents ? 'cursor-pointer' : ''}`}
                >
                  <span className={`text-xs font-medium block mb-1 w-7 h-7 flex items-center justify-center rounded-full ${
                    isToday(day) ? 'bg-primary text-white' :
                    isSelected ? 'text-violet-600' :
                    isPast ? 'text-gray-300' :
                    dow === 0 ? 'text-red-400' :
                    dow === 6 ? 'text-blue-400' : 'text-gray-700'
                  }`}>
                    {format(day, 'd')}
                  </span>
                  <div className="space-y-0.5">
                    {/* 마감일 (파란/빨간 계열) */}
                    {deadlines.slice(0, 1).map(j => (
                      <div key={`d-${j.id}`} className={`text-xs font-medium text-white px-1.5 py-0.5 rounded truncate ${statusDot(j.status) ?? 'bg-gray-400'}`}>
                        {j.company}
                      </div>
                    ))}
                    {/* 면접 (노란색) */}
                    {interviews.slice(0, 1).map(j => (
                      <div key={`i-${j.id}`} className="text-xs font-medium text-white px-1.5 py-0.5 rounded truncate bg-amber-400">
                        🎤 {j.company}
                      </div>
                    ))}
                    {(deadlines.length + interviews.length) > 2 && (
                      <div className="text-xs text-gray-400 px-1.5">+{deadlines.length + interviews.length - 2}</div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* 범례 */}
          <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-gray-100">
            {STATUS_ORDER.map((key) => (
              <span key={key} className="flex items-center gap-1.5 text-xs text-gray-500">
                <span className={`w-2 h-2 rounded-full ${statusDot(key)}`} />{STATUS_CONFIG[key].label}
              </span>
            ))}
            <span className="flex items-center gap-1.5 text-xs text-gray-500">
              <span className="w-2 h-2 rounded-full bg-amber-400" />면접
            </span>
          </div>
        </div>

        {/* 사이드 패널 */}
        <div className="space-y-4">
          {/* 선택된 날짜 */}
          {selected && (selectedDeadlines.length > 0 || selectedInterviews.length > 0) && (
            <div className="rounded-2xl border border-violet-200 bg-violet-50/50 p-5">
              <p className="text-sm font-semibold text-violet-700 mb-3">
                {format(selected, 'M월 d일 (EEE)', { locale: ko })}
              </p>
              {selectedInterviews.length > 0 && (
                <div className="mb-3">
                  <p className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-1.5">면접</p>
                  <div className="space-y-1.5">
                    {selectedInterviews.map(j => (
                      <Link
                        key={j.id}
                        href={`/jobs/${j.id}`}
                        className="block rounded-lg bg-amber-50 border border-amber-100 px-3 py-2.5 hover:border-amber-300 transition-colors"
                      >
                        <p className="text-xs font-semibold text-gray-900">{j.company}</p>
                        <p className="text-[11px] text-gray-500">{j.position}</p>
                        <p className="text-xs text-amber-600 mt-0.5">
                          {format(new Date(j.interviewAt!), 'HH:mm', { locale: ko })}
                        </p>
                        <p className="text-[11px] text-amber-500 mt-1">면접 준비 자료 보러가기 →</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              {selectedDeadlines.length > 0 && (
                <div>
                  <p className="text-xs font-bold text-violet-600 uppercase tracking-wider mb-1.5">마감</p>
                  <div className="space-y-1.5">
                    {selectedDeadlines.map(j => (
                      <Link key={j.id} href={`/jobs/${j.id}`}
                        className="block rounded-lg bg-white border border-violet-100 px-3 py-2.5 hover:border-violet-300 transition-colors">
                        <p className="text-xs font-semibold text-gray-900">{j.company}</p>
                        <p className="text-[11px] text-gray-500">{j.position}</p>
                        {(() => {
                          const cfg = STATUS_CONFIG[j.status as keyof typeof STATUS_CONFIG] ?? STATUS_CONFIG.PREPARING;
                          return (
                            <span className={`mt-1 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${cfg.bg} ${cfg.text}`}>
                              <span className={`h-1 w-1 rounded-full ${cfg.dot}`} />
                              {cfg.label}
                            </span>
                          );
                        })()}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 팔로업 리마인더 */}
          {followUpJobs.length > 0 && (
            <div className="rounded-2xl border border-orange-200 bg-orange-50/50 p-5">
              <div className="flex items-center gap-2 mb-3">
                <Bell className="w-4 h-4 text-orange-500" />
                <p className="text-sm font-semibold text-orange-700">팔로업 필요</p>
                <span className="ml-auto text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full">{followUpJobs.length}건</span>
              </div>
              <div className="space-y-2">
                {followUpJobs.map(j => {
                  const days = Math.floor((now.getTime() - new Date(j.updatedAt).getTime()) / 86400000);
                  return (
                    <Link key={j.id} href={`/jobs/${j.id}`}
                      className="flex items-center justify-between rounded-lg bg-white border border-orange-100 px-3 py-2.5 hover:border-orange-300 transition-colors">
                      <div>
                        <p className="text-xs font-semibold text-gray-900">{j.company}</p>
                        <p className="text-[11px] text-gray-400">{j.position}</p>
                      </div>
                      <span className="text-[11px] font-bold text-orange-500 tabular-nums shrink-0">{days}일 경과</span>
                    </Link>
                  );
                })}
              </div>
              <button
                type="button"
                onClick={() => {
                  followUpJobs.forEach(j => {
                    window.open(`/jobs/${j.id}`, '_blank');
                  });
                }}
                className="mt-3 w-full text-xs font-medium bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors"
              >
                전체 팔로업하기 ({followUpJobs.length}건)
              </button>
            </div>
          )}

          {/* 이번 달 면접 */}
          {monthInterviews.length > 0 && (
            <div className="rounded-2xl border border-amber-100 bg-white p-5">
              <div className="flex items-center gap-2 mb-3">
                <CalendarCheck className="w-4 h-4 text-amber-500" />
                <p className="text-sm font-semibold text-gray-700">이번 달 면접</p>
                <span className="ml-auto text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{monthInterviews.length}건</span>
              </div>
              <div className="space-y-2">
                {monthInterviews.map(j => {
                  const d = new Date(j.interviewAt!);
                  const daysLeft = Math.ceil((d.getTime() - now.getTime()) / 86400000);
                  return (
                    <Link
                      key={j.id}
                      href={`/jobs/${j.id}`}
                      className="flex items-center gap-3 rounded-lg hover:bg-amber-50 px-2 py-2.5 transition-colors"
                    >
                      <div className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-gray-900 truncate">{j.company}</p>
                        <p className="text-[11px] text-gray-400">{format(d, 'M/d HH:mm')}</p>
                      </div>
                      <div className="shrink-0 text-right">
                        <p className={`text-[11px] font-bold tabular-nums ${daysLeft <= 1 ? 'text-red-500' : daysLeft <= 3 ? 'text-amber-500' : 'text-gray-400'}`}>
                          {daysLeft >= 0 ? `D-${daysLeft}` : '완료'}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* 이번 달 마감 */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <div className="flex items-center gap-2 mb-3">
              <Briefcase className="w-4 h-4 text-gray-400" />
              <p className="text-sm font-semibold text-gray-700">이번 달 마감</p>
              <span className="ml-auto text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{monthDeadlines.length}건</span>
            </div>
            {monthDeadlines.length === 0 ? (
              <p className="text-xs text-gray-400 text-center py-4">이번 달 마감 공고 없음</p>
            ) : (
              <div className="space-y-2">
                {monthDeadlines.map(j => {
                  const deadline = new Date(j.deadline!);
                  const daysLeft = Math.ceil((deadline.getTime() - now.getTime()) / 86400000);
                  return (
                    <Link key={j.id} href={`/jobs/${j.id}`}
                      className="flex items-center gap-3 rounded-lg hover:bg-gray-50 px-2 py-2.5 transition-colors">
                      <div className={`w-2 h-2 rounded-full shrink-0 ${statusDot(j.status)}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-gray-900 truncate">{j.company}</p>
                        <p className="text-[11px] text-gray-400 truncate">{j.position}</p>
                      </div>
                      <div className="shrink-0 text-right">
                        <p className={`text-[11px] font-bold tabular-nums ${daysLeft <= 3 && daysLeft >= 0 ? 'text-red-500' : 'text-gray-400'}`}>
                          {daysLeft >= 0 ? `D-${daysLeft}` : '마감'}
                        </p>
                        <p className="text-xs text-gray-300">{format(deadline, 'M/d')}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* D-7 이내 마감 */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-4 h-4 text-gray-400" />
              <p className="text-sm font-semibold text-gray-700">D-7 이내 마감</p>
            </div>
            {activeJobs.filter(j => {
              if (!j.deadline) return false;
              const d = Math.ceil((new Date(j.deadline).getTime() - now.getTime()) / 86400000);
              return d >= 0 && d <= 7;
            }).length === 0 ? (
              <p className="text-xs text-gray-400 text-center py-2">없음</p>
            ) : (
              <div className="space-y-1.5">
                {activeJobs
                  .filter(j => {
                    if (!j.deadline) return false;
                    const d = Math.ceil((new Date(j.deadline).getTime() - now.getTime()) / 86400000);
                    return d >= 0 && d <= 7;
                  })
                  .sort((a, b) => new Date(a.deadline!).getTime() - new Date(b.deadline!).getTime())
                  .map(j => {
                    const daysLeft = Math.ceil((new Date(j.deadline!).getTime() - now.getTime()) / 86400000);
                    return (
                      <Link key={j.id} href={`/jobs/${j.id}`}
                        className="flex items-center justify-between rounded-lg bg-red-50 border border-red-100 px-3 py-2.5 hover:bg-red-100 transition-colors">
                        <div>
                          <p className="text-xs font-semibold text-gray-900">{j.company}</p>
                          <p className="text-[11px] text-gray-500">{j.position}</p>
                        </div>
                        <span className="text-xs font-bold text-red-600 tabular-nums">D-{daysLeft}</span>
                      </Link>
                    );
                  })}
              </div>
            )}
          </div>

          {/* 면접 일정 등록 버튼 */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <p className="text-sm font-semibold text-gray-700 mb-3">면접 일정 등록</p>
            {activeJobs.filter(j => ['APPLIED', 'DOCUMENT_PASS', 'INTERVIEW'].includes(j.status)).length === 0 ? (
              <p className="text-xs text-gray-400 text-center py-2">등록 가능한 공고 없음</p>
            ) : (
              <div className="space-y-1.5">
                {activeJobs
                  .filter(j => ['APPLIED', 'DOCUMENT_PASS', 'INTERVIEW'].includes(j.status))
                  .map(j => (
                    <button
                      key={j.id}
                      type="button"
                      onClick={() => setInterviewModal(j)}
                      className="w-full flex items-center justify-between rounded-lg border border-gray-100 hover:border-amber-300 hover:bg-amber-50 px-3 py-2.5 transition-colors text-left"
                    >
                      <div>
                        <p className="text-xs font-medium text-gray-900">{j.company}</p>
                        <p className="text-[11px] text-gray-400">{j.position}</p>
                      </div>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full shrink-0 ${
                        j.interviewAt ? 'bg-amber-100 text-amber-600' : 'bg-gray-100 text-gray-400'
                      }`}>
                        {j.interviewAt ? format(new Date(j.interviewAt), 'M/d HH:mm') : '미등록'}
                      </span>
                    </button>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {interviewModal && (
        <InterviewModal job={interviewModal} onClose={() => setInterviewModal(null)} />
      )}
    </div>
  );
}
