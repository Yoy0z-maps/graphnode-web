import { useState } from "react";
import { useNavigate } from "react-router-dom";

const DUMMY_NOTICES = [
  { id: 1, title: "v1.2.0 업데이트 안내", status: "active", date: "2025.03.14", pinned: true },
  { id: 2, title: "서버 점검 안내 (3월 10일 02:00 ~ 04:00)", status: "active", date: "2025.03.09", pinned: false },
  { id: 3, title: "개인정보처리방침 개정 안내", status: "active", date: "2025.03.01", pinned: false },
  { id: 4, title: "GraphNode 베타 서비스 시작", status: "inactive", date: "2024.03.01", pinned: false },
];

export default function Notices() {
  const navigate = useNavigate();
  const [notices] = useState(DUMMY_NOTICES);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">공지사항</h1>
          <p className="text-gray-400 text-sm mt-1">공지사항 목록 조회 및 등록</p>
        </div>
        <button
          onClick={() => navigate("/admin/notices/new")}
          className="flex items-center gap-2 bg-[#2b89f8] hover:bg-[#1a7ae8] text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          새 공지 등록
        </button>
      </div>

      {/* Table */}
      <div className="bg-[#2c2f33] rounded-xl border border-[#40444b]/50 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#40444b]/50">
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider w-12">
                #
              </th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                제목
              </th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider w-24">
                상태
              </th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider w-32">
                등록일
              </th>
              <th className="px-5 py-3.5 w-24" />
            </tr>
          </thead>
          <tbody className="divide-y divide-[#40444b]/30">
            {notices.map((notice) => (
              <tr key={notice.id} className="hover:bg-[#40444b]/20 transition-colors">
                <td className="px-5 py-3.5 text-gray-500">{notice.id}</td>
                <td className="px-5 py-3.5 text-white">
                  <div className="flex items-center gap-2">
                    {notice.pinned && (
                      <span className="text-[10px] px-1.5 py-0.5 bg-[#2b89f8]/20 text-[#2b89f8] rounded font-medium">
                        고정
                      </span>
                    )}
                    {notice.title}
                  </div>
                </td>
                <td className="px-5 py-3.5">
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      notice.status === "active"
                        ? "bg-emerald-400/15 text-emerald-400"
                        : "bg-gray-500/15 text-gray-400"
                    }`}
                  >
                    {notice.status === "active" ? "활성" : "비활성"}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-gray-400">{notice.date}</td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2 justify-end">
                    <button
                      onClick={() => navigate(`/admin/notices/${notice.id}/edit`)}
                      className="text-xs text-gray-400 hover:text-white transition-colors"
                    >
                      수정
                    </button>
                    <button
                      onClick={() => {/* TODO: delete */}}
                      className="text-xs text-gray-400 hover:text-red-400 transition-colors"
                    >
                      삭제
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
