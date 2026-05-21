export default function EmbedGuidePage() {
  const baseUrl = process.env.NEXTAUTH_URL ?? 'https://your-domain.com';

  const snippets = [
    {
      dept: '컴퓨터정보과',
      from: 'info',
      color: '#2563eb',
      hoverColor: '#1d4ed8',
    },
    {
      dept: 'AI소프트웨어과',
      from: 'aisw',
      color: '#7c3aed',
      hoverColor: '#6d28d9',
    },
  ];

  const widgetCode = (from: string) =>
    `<iframe
  src="${baseUrl}/embed/widget?from=${from}&limit=8"
  width="100%"
  height="420"
  frameborder="0"
  style="border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;"
  title="CS 맞춤 채용공고"
></iframe>`;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">학과 홈페이지 연동 가이드</h1>
          <p className="text-sm text-gray-500 mt-2">
            버튼 링크 또는 공고 목록 위젯을 학과 홈페이지에 삽입할 수 있습니다.
          </p>
        </div>

        {/* 위젯 섹션 */}
        <div className="space-y-4">
          <h2 className="text-base font-semibold text-gray-800">공고 목록 위젯 (iframe)</h2>
          <p className="text-sm text-gray-500">최신 CS 공고를 학과 홈페이지에 직접 표시합니다.</p>

          {snippets.map(({ dept, from }) => (
            <div key={from} className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <p className="text-sm font-semibold text-gray-900">{dept} — 위젯</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  미리보기: <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">{baseUrl}/embed/widget?from={from}</code>
                </p>
              </div>
              {/* 실제 위젯 미리보기 */}
              <div className="px-6 py-4 bg-gray-50">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-widest mb-2">미리보기</p>
                <iframe
                  src={`/embed/widget?from=${from}&limit=5`}
                  width="100%"
                  height="320"
                  style={{ border: '1px solid #e2e8f0', borderRadius: '8px', background: '#fff' }}
                  title={`${dept} 공고 위젯 미리보기`}
                />
              </div>
              <div className="px-6 py-4">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-widest mb-2">HTML 코드</p>
                <pre className="bg-gray-950 text-gray-100 text-xs rounded-lg p-4 overflow-x-auto leading-relaxed whitespace-pre-wrap">
                  {widgetCode(from)}
                </pre>
              </div>
            </div>
          ))}
        </div>

        {/* 버튼 링크 섹션 */}
        <div className="space-y-4">
          <h2 className="text-base font-semibold text-gray-800">버튼 링크</h2>
          <p className="text-sm text-gray-500">포털로 바로 이동하는 버튼을 삽입합니다.</p>

        {snippets.map(({ dept, from, color, hoverColor }) => {
          const url = `${baseUrl}/?from=${from}`;
          const code = `<!-- ${dept} 취업지원 포털 버튼 -->
<a href="${url}"
   target="_blank"
   rel="noopener noreferrer"
   style="display:inline-flex;align-items:center;gap:8px;background:${color};color:#fff;padding:10px 20px;border-radius:8px;font-size:14px;font-weight:600;text-decoration:none;font-family:sans-serif;"
   onmouseover="this.style.background='${hoverColor}'"
   onmouseout="this.style.background='${color}'">
  🎯 AI 맞춤 취업지원 바로가기
</a>`;

          return (
            <div key={from} className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-900">{dept}</p>
                  <p className="text-xs text-gray-400 mt-0.5">진입 URL: <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">{url}</code></p>
                </div>
                <a
                  href={`/?from=${from}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ background: color }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white text-xs font-semibold hover:opacity-90 transition-opacity"
                >
                  🎯 AI 맞춤 취업지원 바로가기
                </a>
              </div>
              <div className="px-6 py-4">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-widest mb-2">HTML 코드</p>
                <pre className="bg-gray-950 text-gray-100 text-xs rounded-lg p-4 overflow-x-auto leading-relaxed whitespace-pre-wrap">
                  {code}
                </pre>
              </div>
            </div>
          );
        })}
        </div>

        <div className="rounded-xl border border-amber-100 bg-amber-50 p-5 text-sm text-amber-800">
          <p className="font-semibold mb-1">적용 방법</p>
          <ol className="list-decimal list-inside space-y-1 text-xs text-amber-700">
            <li>학과 홈페이지 관리자 페이지 접속</li>
            <li>취업/공지 메뉴 편집 화면에서 HTML 편집 모드 선택</li>
            <li>위 코드를 원하는 위치에 붙여넣기</li>
            <li>저장 후 버튼 또는 위젯이 표시되는지 확인</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
