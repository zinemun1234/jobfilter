import type { JobPosting, StatusHistory } from '@/lib/generated/prisma';
import type { ApplicationStatus } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';

interface StatusTimelineProps {
  job: JobPosting & { statusHistory: StatusHistory[] };
}

const statusConfig: Record<ApplicationStatus, { label: string; color: string }> = {
  PREPARING: { label: '서류 준비 중', color: 'bg-gray-500' },
  APPLIED: { label: '지원 완료', color: 'bg-blue-500' },
  DOCUMENT_PASS: { label: '서류 합격', color: 'bg-green-500' },
  INTERVIEW: { label: '면접 예정', color: 'bg-yellow-500' },
  FINAL_PASS: { label: '최종 합격', color: 'bg-purple-500' },
  REJECTED: { label: '불합격', color: 'bg-red-500' },
};

export function StatusTimeline({ job }: StatusTimelineProps) {
  const timeline = [
    {
      status: job.status,
      changedAt: job.updatedAt,
      note: '현재 상태',
      isCurrent: true,
    },
    ...job.statusHistory.map((history) => ({
      status: history.status,
      changedAt: history.changedAt,
      note: history.note || '',
      isCurrent: false,
    })),
  ].sort((a, b) => b.changedAt.getTime() - a.changedAt.getTime());

  return (
    <div className="space-y-4">
      <div className="relative">
        {timeline.map((item, index) => (
          <div key={index} className="flex items-start space-x-4 mb-6">
            <div className="flex flex-col items-center">
              <div
                className={`w-4 h-4 rounded-full border-2 ${
                  item.isCurrent
                    ? 'bg-blue-500 border-blue-500'
                    : 'bg-white border-gray-300'
                }`}
              />
              {index < timeline.length - 1 && (
                <div className="w-0.5 h-16 bg-gray-300 mt-2" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={`${statusConfig[item.status as ApplicationStatus]?.color ?? 'bg-gray-500'} text-white`}>
                      {statusConfig[item.status as ApplicationStatus]?.label ?? item.status}
                    </Badge>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      {item.changedAt.toLocaleDateString('ko-KR')}
                    </div>
                  </div>
                  {item.note && (
                    <p className="text-sm text-gray-600">{item.note}</p>
                  )}
                  {item.isCurrent && (
                    <p className="text-xs text-blue-600 mt-2">현재 상태</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        ))}
      </div>
      
      {timeline.length === 1 && (
        <Card>
          <CardContent className="p-4 text-center text-gray-500">
            아직 상태 변경 이력이 없습니다
          </CardContent>
        </Card>
      )}
    </div>
  );
}
