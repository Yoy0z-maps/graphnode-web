import { useState } from "react";
import { useNavigate } from "react-router-dom";

const VERSION_LIST = [
  { version: "v3", label: "v3 · 2025년 3월 1일", active: true },
  { version: "v2", label: "v2 · 2024년 9월 1일", active: false },
  { version: "v1", label: "v1 · 2024년 3월 1일", active: false },
];

export default function AdminPrivacy() {
  const navigate = useNavigate();
  const [selectedVersion, setSelectedVersion] = useState("v3");

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">개인정보처리방침</h1>
          <p className="text-gray-400 text-sm mt-1">버전별 내용 조회 및 수정, 새 버전 등록</p>
        </div>
        <button
          onClick={() => navigate("/admin/privacy/new")}
          className="flex items-center gap-2 bg-[#2b89f8] hover:bg-[#1a7ae8] text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          새 버전 등록
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Version list */}
        <div className="lg:w-56 shrink-0">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">버전 목록</p>
          <div className="space-y-1">
            {VERSION_LIST.map((v) => (
              <button
                key={v.version}
                onClick={() => setSelectedVersion(v.version)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all ${
                  selectedVersion === v.version
                    ? "bg-[#2b89f8]/15 text-[#2b89f8] font-medium"
                    : "text-gray-400 hover:text-white hover:bg-[#40444b]/30"
                }`}
              >
                <div>{v.label}</div>
                {v.active && (
                  <span className="inline-block mt-0.5 text-[10px] px-1.5 py-0.5 bg-emerald-400/15 text-emerald-400 rounded">
                    현재 적용
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Content preview + actions */}
        <div className="flex-1">
          <div className="bg-[#2c2f33] rounded-xl border border-[#40444b]/50 p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-base font-semibold text-white">
                  {VERSION_LIST.find((v) => v.version === selectedVersion)?.label}
                </h2>
                {VERSION_LIST.find((v) => v.version === selectedVersion)?.active && (
                  <span className="text-xs text-emerald-400">현재 적용 중인 버전</span>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => navigate(`/admin/privacy/${selectedVersion}/edit`)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#40444b] text-xs text-gray-300 hover:text-white hover:bg-[#40444b]/40 transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  수정
                </button>
              </div>
            </div>

            {/* Placeholder content preview */}
            <div className="space-y-3 text-sm text-gray-400">
              {["1. 수집하는 개인정보 항목", "2. 개인정보의 수집 및 이용 목적", "3. 개인정보의 보유 및 이용 기간", "4. 개인정보의 제3자 제공", "5. 개인정보 처리의 위탁", "6. 이용자의 권리", "7. 개인정보 보호책임자", "8. 개인정보처리방침 변경"].map(
                (section, i) => (
                  <div key={i} className="flex items-center gap-3 py-2 border-b border-[#40444b]/20 last:border-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#40444b] shrink-0" />
                    <span>{section}</span>
                  </div>
                )
              )}
            </div>

            <div className="mt-5 pt-4 border-t border-[#40444b]/30">
              <button
                onClick={() => navigate("/privacy")}
                className="text-xs text-[#2b89f8] hover:underline"
              >
                공개 페이지에서 미리보기 →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
