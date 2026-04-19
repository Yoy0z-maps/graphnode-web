import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createGraphNodeClient } from "@taco_tsinghua/graphnode-sdk";
import type { FeedbackDto } from "@taco_tsinghua/graphnode-sdk";

const client = createGraphNodeClient({});

type StatusFilter = "ALL" | "UNREAD" | "READ" | "IN_PROGRESS" | "DONE";

const STATUS_META: Record<
  string,
  { label: string; color: string; bg: string }
> = {
  UNREAD: { label: "미확인", color: "text-red-400", bg: "bg-red-400/15" },
  READ: { label: "확인", color: "text-blue-400", bg: "bg-blue-400/15" },
  IN_PROGRESS: {
    label: "진행중",
    color: "text-amber-400",
    bg: "bg-amber-400/15",
  },
  DONE: { label: "완료", color: "text-emerald-400", bg: "bg-emerald-400/15" },
};

const FILTER_TABS: { key: StatusFilter; label: string }[] = [
  { key: "ALL", label: "전체" },
  { key: "UNREAD", label: "미확인" },
  { key: "READ", label: "확인" },
  { key: "IN_PROGRESS", label: "진행중" },
  { key: "DONE", label: "완료" },
];

export default function FeedbackList() {
  const navigate = useNavigate();
  const [feedbacks, setFeedbacks] = useState<FeedbackDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [filter, setFilter] = useState<StatusFilter>("ALL");
  const [showDone, setShowDone] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await client.feedback.list({ limit: 50 });
      if (res.isSuccess) {
        setFeedbacks(res.data.feedbacks);
        setNextCursor(res.data.nextCursor);
      }
      setLoading(false);
    })();
  }, []);

  const handleLoadMore = async () => {
    if (!nextCursor) return;
    setLoadingMore(true);
    const res = await client.feedback.list({ limit: 50, cursor: nextCursor });
    if (res.isSuccess) {
      setFeedbacks((prev) => [...prev, ...res.data.feedbacks]);
      setNextCursor(res.data.nextCursor);
    }
    setLoadingMore(false);
  };

  const filtered = feedbacks.filter((f) => {
    if (!showDone && f.status === "DONE") return false;
    if (filter === "ALL") return true;
    return f.status === filter;
  });

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">피드백 관리</h1>
        <p className="text-gray-400 text-sm mt-1">
          사용자 피드백 목록 조회 및 처리
        </p>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-1 mb-5 bg-[#2c2f33] rounded-lg p-1 w-fit border border-[#40444b]/50">
        {FILTER_TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`px-3.5 py-1.5 rounded-md text-sm font-medium transition-all ${
              filter === tab.key
                ? "bg-[#40444b] text-white"
                : "text-gray-400 hover:text-gray-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-[#2c2f33] rounded-xl border border-[#40444b]/50 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#40444b]/50">
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider w-28">
                카테고리
              </th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                제목
              </th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider w-24">
                상태
              </th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider w-32">
                작성자
              </th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider w-36">
                제출일
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#40444b]/30">
            {loading ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-5 py-12 text-center text-gray-500"
                >
                  불러오는 중...
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-5 py-12 text-center text-gray-500"
                >
                  피드백이 없습니다.
                </td>
              </tr>
            ) : (
              filtered.map((fb) => {
                const s = STATUS_META[fb.status] ?? {
                  label: fb.status,
                  color: "text-gray-400",
                  bg: "bg-gray-400/15",
                };
                const isDone = fb.status === "DONE";
                return (
                  <tr
                    key={fb.id}
                    onClick={() => navigate(`/admin/feedback/${fb.id}`)}
                    className="hover:bg-[#40444b]/20 transition-colors cursor-pointer"
                  >
                    <td className="px-5 py-3.5 text-gray-400 text-xs">
                      {fb.category}
                    </td>
                    <td className="px-5 py-3.5 text-white">
                      <span
                        className={isDone ? "line-through text-gray-500" : ""}
                      >
                        {fb.title}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${s.bg} ${s.color}`}
                      >
                        {s.label}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-gray-400 text-xs">
                      {fb.userName ?? "익명"}
                    </td>
                    <td className="px-5 py-3.5 text-gray-500 text-xs">
                      {new Date(fb.createdAt).toLocaleDateString("ko-KR")}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between">
        <button
          onClick={() => setShowDone((v) => !v)}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
        >
          <span
            className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
              showDone ? "bg-primary border-primary" : "border-[#40444b]"
            }`}
          >
            {showDone && (
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path
                  d="M1.5 5L4 7.5L8.5 2.5"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </span>
          완료된 작업도 보기
        </button>

        {nextCursor && (
          <button
            onClick={handleLoadMore}
            disabled={loadingMore}
            className="text-sm text-primary hover:text-white transition-colors disabled:opacity-50"
          >
            {loadingMore ? "불러오는 중..." : "더 보기"}
          </button>
        )}
      </div>
    </div>
  );
}
