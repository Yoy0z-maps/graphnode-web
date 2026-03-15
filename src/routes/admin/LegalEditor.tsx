import { useNavigate, useParams } from "react-router-dom";

export default function LegalEditor() {
  const navigate = useNavigate();
  const { type, version } = useParams<{ type: string; version?: string }>();

  const isPrivacy = type === "privacy";
  const title = isPrivacy ? "개인정보처리방침" : "이용약관";
  const backPath = isPrivacy ? "/admin/privacy" : "/admin/terms";

  return (
    <div className="p-8 max-w-3xl">
      <div className="flex items-center gap-3 mb-8">
        <button onClick={() => navigate(backPath)} className="text-gray-400 hover:text-white transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <div>
          <h1 className="text-2xl font-bold text-white">
            {title} {version ? `${version} 수정` : "새 버전 등록"}
          </h1>
          <p className="text-gray-400 text-sm mt-0.5">{title} 내용을 직접 편집합니다</p>
        </div>
      </div>

      <div className="bg-[#2c2f33] rounded-xl border border-[#40444b]/50 p-6 space-y-5">
        {/* Meta */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-300 mb-1.5">버전</label>
            <input
              type="text"
              defaultValue={version ?? ""}
              placeholder="예: v4"
              className="w-full bg-[#40444b]/40 border border-[#40444b] rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#2b89f8] transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1.5">시행일</label>
            <input
              type="date"
              className="w-full bg-[#40444b]/40 border border-[#40444b] rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#2b89f8] transition-colors"
            />
          </div>
        </div>

        {isPrivacy && (
          <div>
            <label className="block text-sm text-gray-300 mb-1.5">종료일 (이전 버전인 경우)</label>
            <input
              type="date"
              className="w-full bg-[#40444b]/40 border border-[#40444b] rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#2b89f8] transition-colors"
            />
          </div>
        )}

        {isPrivacy && (
          <div>
            <label className="block text-sm text-gray-300 mb-1.5">주요 변경사항 (줄바꿈으로 구분)</label>
            <textarea
              rows={3}
              placeholder={"기기 정보 수집 항목 추가\n위탁 조항 신설"}
              className="w-full bg-[#40444b]/40 border border-[#40444b] rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#2b89f8] transition-colors resize-none"
            />
          </div>
        )}

        <div>
          <label className="block text-sm text-gray-300 mb-1.5">본문 내용 (Markdown)</label>
          <textarea
            rows={20}
            placeholder={"## 1. 수집하는 개인정보 항목\n\n..."}
            className="w-full bg-[#40444b]/40 border border-[#40444b] rounded-lg px-3 py-2.5 text-sm text-white font-mono placeholder-gray-500 focus:outline-none focus:border-[#2b89f8] transition-colors resize-none"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            onClick={() => navigate(backPath)}
            className="px-5 py-2.5 rounded-lg border border-[#40444b] text-sm text-gray-300 hover:text-white hover:bg-[#40444b]/40 transition-colors"
          >
            취소
          </button>
          <button
            onClick={() => {
              // TODO: save
              navigate(backPath);
            }}
            className="px-5 py-2.5 rounded-lg bg-[#2b89f8] hover:bg-[#1a7ae8] text-sm text-white font-medium transition-colors"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
}
