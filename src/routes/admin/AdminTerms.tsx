import { useNavigate } from "react-router-dom";

const SECTIONS = [
  "제1조 (목적)", "제2조 (정의)", "제3조 (약관의 효력 및 변경)",
  "제4조 (서비스 이용)", "제5조 (이용자의 의무)", "제6조 (콘텐츠의 권리)",
  "제7조 (서비스 이용 제한)", "제8조 (면책 조항)", "제9조 (준거법 및 분쟁 해결)", "부칙",
];

export default function AdminTerms() {
  const navigate = useNavigate();

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">이용약관</h1>
          <p className="text-gray-400 text-sm mt-1">현재 적용 중인 이용약관 조회 및 수정</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => navigate("/terms")}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-[#40444b] text-sm text-gray-300 hover:text-white transition-colors"
          >
            공개 미리보기
          </button>
          <button
            onClick={() => navigate("/admin/terms/edit")}
            className="flex items-center gap-2 bg-[#2b89f8] hover:bg-[#1a7ae8] text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            수정
          </button>
        </div>
      </div>

      <div className="bg-[#2c2f33] rounded-xl border border-[#40444b]/50 p-6">
        {/* Meta */}
        <div className="flex flex-wrap gap-4 mb-6 pb-5 border-b border-[#40444b]/30">
          <div>
            <p className="text-xs text-gray-500 mb-0.5">현재 버전</p>
            <p className="text-sm font-semibold text-white">v1</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-0.5">시행일</p>
            <p className="text-sm font-semibold text-white">2025년 3월 1일</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-0.5">마지막 수정</p>
            <p className="text-sm font-semibold text-white">2025.03.01</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-0.5">상태</p>
            <span className="text-xs px-2 py-0.5 bg-emerald-400/15 text-emerald-400 rounded-full font-medium">
              적용 중
            </span>
          </div>
        </div>

        {/* Section list */}
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">조항 목록</p>
        <div className="space-y-1">
          {SECTIONS.map((section, i) => (
            <div key={i} className="flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-[#40444b]/20 transition-colors group">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#40444b]" />
                <span className="text-sm text-gray-300">{section}</span>
              </div>
              <button
                onClick={() => navigate("/admin/terms/edit")}
                className="text-xs text-gray-500 hover:text-[#2b89f8] opacity-0 group-hover:opacity-100 transition-all"
              >
                수정
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
