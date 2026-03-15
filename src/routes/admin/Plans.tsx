import { useState } from "react";

type Plan = {
  id: string;
  name: string;
  price: string;
  period: string;
  features: string[];
  badge?: string;
};

const DUMMY_PLANS: Plan[] = [
  {
    id: "free",
    name: "Free",
    price: "0",
    period: "월",
    features: ["AI 채팅 50회/월", "그래프 노드 100개", "노트 20개", "클라우드 동기화 1기기"],
  },
  {
    id: "pro",
    name: "Pro",
    price: "9,900",
    period: "월",
    badge: "인기",
    features: ["AI 채팅 무제한", "그래프 노드 무제한", "노트 무제한", "클라우드 동기화 5기기", "MCP 서버 연결", "우선 지원"],
  },
  {
    id: "team",
    name: "Team",
    price: "29,900",
    period: "월 (팀당)",
    features: ["Pro 기능 전체 포함", "팀원 최대 10명", "공유 그래프 공간", "관리자 대시보드", "전담 지원"],
  },
];

export default function Plans() {
  const [plans, setPlans] = useState<Plan[]>(DUMMY_PLANS);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Partial<Plan>>({});

  const startEdit = (plan: Plan) => {
    setEditingId(plan.id);
    setEditValues({ name: plan.name, price: plan.price, period: plan.period });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditValues({});
  };

  const saveEdit = (id: string) => {
    setPlans((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...editValues } : p))
    );
    setEditingId(null);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">요금제 관리</h1>
        <p className="text-gray-400 text-sm mt-1">요금제 이름·가격·혜택 수정</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {plans.map((plan) => {
          const isEditing = editingId === plan.id;
          return (
            <div key={plan.id} className="bg-[#2c2f33] rounded-xl border border-[#40444b]/50 p-5">
              {/* Plan header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  {isEditing ? (
                    <input
                      value={editValues.name ?? plan.name}
                      onChange={(e) => setEditValues((v) => ({ ...v, name: e.target.value }))}
                      className="bg-[#40444b]/40 border border-[#40444b] rounded px-2 py-1 text-sm text-white focus:outline-none focus:border-[#2b89f8] w-28"
                    />
                  ) : (
                    <h3 className="text-lg font-bold text-white">
                      {plan.name}
                      {plan.badge && (
                        <span className="ml-2 text-[10px] px-1.5 py-0.5 bg-[#2b89f8]/20 text-[#2b89f8] rounded font-medium">
                          {plan.badge}
                        </span>
                      )}
                    </h3>
                  )}
                </div>
              </div>

              {/* Price */}
              <div className="mb-4">
                {isEditing ? (
                  <div className="flex items-center gap-1">
                    <span className="text-gray-400 text-sm">₩</span>
                    <input
                      value={editValues.price ?? plan.price}
                      onChange={(e) => setEditValues((v) => ({ ...v, price: e.target.value }))}
                      className="bg-[#40444b]/40 border border-[#40444b] rounded px-2 py-1 text-sm text-white focus:outline-none focus:border-[#2b89f8] w-24"
                    />
                    <span className="text-gray-400 text-sm">/</span>
                    <input
                      value={editValues.period ?? plan.period}
                      onChange={(e) => setEditValues((v) => ({ ...v, period: e.target.value }))}
                      className="bg-[#40444b]/40 border border-[#40444b] rounded px-2 py-1 text-sm text-white focus:outline-none focus:border-[#2b89f8] w-24"
                    />
                  </div>
                ) : (
                  <p className="text-2xl font-bold text-white">
                    ₩{plan.price}
                    <span className="text-sm font-normal text-gray-400"> /{plan.period}</span>
                  </p>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-1.5 mb-5">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                    <svg className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              {/* Actions */}
              {isEditing ? (
                <div className="flex gap-2">
                  <button onClick={cancelEdit} className="flex-1 py-2 rounded-lg border border-[#40444b] text-xs text-gray-300 hover:text-white transition-colors">
                    취소
                  </button>
                  <button onClick={() => saveEdit(plan.id)} className="flex-1 py-2 rounded-lg bg-[#2b89f8] hover:bg-[#1a7ae8] text-xs text-white font-medium transition-colors">
                    저장
                  </button>
                </div>
              ) : (
                <button onClick={() => startEdit(plan)} className="w-full py-2 rounded-lg border border-[#40444b] text-xs text-gray-300 hover:text-white hover:bg-[#40444b]/40 transition-colors">
                  수정
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
