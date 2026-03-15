import { useNavigate, useParams } from "react-router-dom";

export default function NoticeForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  return (
    <div className="p-8 max-w-2xl">
      <div className="flex items-center gap-3 mb-8">
        <button onClick={() => navigate("/admin/notices")} className="text-gray-400 hover:text-white transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <div>
          <h1 className="text-2xl font-bold text-white">{isEdit ? "공지사항 수정" : "공지사항 등록"}</h1>
          <p className="text-gray-400 text-sm mt-0.5">{isEdit ? `#${id} 수정` : "새 공지 작성"}</p>
        </div>
      </div>

      <div className="bg-[#2c2f33] rounded-xl border border-[#40444b]/50 p-6 space-y-5">
        <div>
          <label className="block text-sm text-gray-300 mb-1.5">제목</label>
          <input
            type="text"
            placeholder="공지사항 제목을 입력하세요"
            className="w-full bg-[#40444b]/40 border border-[#40444b] rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#2b89f8] transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-1.5">내용</label>
          <textarea
            rows={10}
            placeholder="공지 내용을 입력하세요..."
            className="w-full bg-[#40444b]/40 border border-[#40444b] rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#2b89f8] transition-colors resize-none"
          />
        </div>
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
            <input type="checkbox" className="accent-[#2b89f8]" />
            상단 고정
          </label>
          <div>
            <label className="block text-xs text-gray-400 mb-1">상태</label>
            <select className="bg-[#40444b]/40 border border-[#40444b] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#2b89f8]">
              <option value="active">활성</option>
              <option value="inactive">비활성</option>
            </select>
          </div>
        </div>
        <div className="flex gap-3 pt-2">
          <button
            onClick={() => navigate("/admin/notices")}
            className="px-5 py-2.5 rounded-lg border border-[#40444b] text-sm text-gray-300 hover:text-white hover:bg-[#40444b]/40 transition-colors"
          >
            취소
          </button>
          <button
            onClick={() => {
              // TODO: save
              navigate("/admin/notices");
            }}
            className="px-5 py-2.5 rounded-lg bg-[#2b89f8] hover:bg-[#1a7ae8] text-sm text-white font-medium transition-colors"
          >
            {isEdit ? "수정 완료" : "등록"}
          </button>
        </div>
      </div>
    </div>
  );
}
