import { useNavigate } from "react-router-dom";

const STAT_CARDS = [
  { label: "전체 공지사항", value: "12", sub: "활성 3건", color: "text-[#2b89f8]", bg: "bg-[#2b89f8]/10" },
  { label: "요금제 종류", value: "3", sub: "Free / Pro / Team", color: "text-emerald-400", bg: "bg-emerald-400/10" },
  { label: "개인정보처리방침", value: "v3", sub: "2025.03.01 시행", color: "text-violet-400", bg: "bg-violet-400/10" },
  { label: "이용약관", value: "v1", sub: "2025.03.01 시행", color: "text-amber-400", bg: "bg-amber-400/10" },
];

const QUICK_LINKS = [
  { label: "공지사항 등록", path: "/admin/notices/new", icon: "+" },
  { label: "요금제 수정", path: "/admin/plans", icon: "✎" },
  { label: "개인정보처리방침 수정", path: "/admin/privacy/edit", icon: "✎" },
  { label: "이용약관 수정", path: "/admin/terms/edit", icon: "✎" },
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">대시보드</h1>
        <p className="text-gray-400 text-sm mt-1">GraphNode 서비스 현황 및 빠른 관리</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-10">
        {STAT_CARDS.map((card) => (
          <div key={card.label} className={`${card.bg} border border-[#40444b]/30 rounded-xl p-5`}>
            <p className="text-xs text-gray-400 mb-2">{card.label}</p>
            <p className={`text-3xl font-bold ${card.color} mb-1`}>{card.value}</p>
            <p className="text-xs text-gray-500">{card.sub}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-10">
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
          빠른 작업
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {QUICK_LINKS.map((link) => (
            <button
              key={link.path}
              onClick={() => navigate(link.path)}
              className="flex items-center gap-3 bg-[#2c2f33] hover:bg-[#40444b]/60 border border-[#40444b]/50 rounded-xl px-5 py-4 text-sm text-gray-300 hover:text-white transition-all text-left"
            >
              <span className="w-7 h-7 rounded-lg bg-[#40444b] flex items-center justify-center text-gray-400 text-base font-medium shrink-0">
                {link.icon}
              </span>
              {link.label}
            </button>
          ))}
        </div>
      </div>

      {/* Recent Activity (placeholder) */}
      <div>
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
          최근 활동
        </h2>
        <div className="bg-[#2c2f33] rounded-xl border border-[#40444b]/50 divide-y divide-[#40444b]/30">
          {[
            { action: "공지사항 등록", detail: "v1.2.0 업데이트 안내", time: "2025.03.14" },
            { action: "개인정보처리방침 수정", detail: "v3 시행 (기기정보 수집 항목 추가)", time: "2025.03.01" },
            { action: "요금제 수정", detail: "Pro 플랜 가격 조정", time: "2025.02.15" },
            { action: "이용약관 최초 등록", detail: "v1 제정", time: "2025.03.01" },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between px-5 py-3.5">
              <div>
                <p className="text-sm text-white">{item.action}</p>
                <p className="text-xs text-gray-500 mt-0.5">{item.detail}</p>
              </div>
              <span className="text-xs text-gray-500 shrink-0 ml-4">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
