import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createGraphNodeClient } from "@taco_tsinghua/graphnode-sdk";
import type { FeedbackDto } from "@taco_tsinghua/graphnode-sdk";

const client = createGraphNodeClient({});

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

export default function FeedbackDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState<FeedbackDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (!id) return;
    (async () => {
      const res = await client.feedback.getById(id);
      console.log(res);
      if (res.isSuccess) {
        let fb = res.data.feedback;
        if (fb.status === "UNREAD") {
          const updated = await client.feedback.updateStatus(id, {
            status: "READ",
          });
          if (updated.isSuccess) fb = updated.data.feedback;
        }
        setFeedback(fb);
      }
      setLoading(false);
    })();
  }, [id]);

  const updateStatus = async (status: "IN_PROGRESS" | "DONE") => {
    if (!id || updating) return;
    setUpdating(true);
    const res = await client.feedback.updateStatus(id, { status });
    if (res.isSuccess) setFeedback(res.data.feedback);
    setUpdating(false);
  };

  if (loading) {
    return <div className="p-8 text-gray-400 text-sm">불러오는 중...</div>;
  }

  if (!feedback) {
    return (
      <div className="p-8 text-gray-400 text-sm">
        피드백을 찾을 수 없습니다.
      </div>
    );
  }

  const s = STATUS_META[feedback.status] ?? {
    label: feedback.status,
    color: "text-gray-400",
    bg: "bg-gray-400/15",
  };

  return (
    <div className="p-8 max-w-3xl">
      {/* Back */}
      <button
        onClick={() => navigate("/admin/feedback")}
        className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors mb-6"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        피드백 목록
      </button>

      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">
            {feedback.title}
          </h1>
          <div className="flex items-center gap-3">
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-medium ${s.bg} ${s.color}`}
            >
              {s.label}
            </span>
            <span className="text-xs text-gray-500">{feedback.category}</span>
          </div>
        </div>

        {/* Status action buttons */}
        <div className="flex items-center gap-2 shrink-0">
          {feedback.status === "READ" && (
            <button
              onClick={() => updateStatus("IN_PROGRESS")}
              disabled={updating}
              className="px-3.5 py-1.5 text-sm rounded-lg bg-amber-400/15 text-amber-400 hover:bg-amber-400/25 transition-colors disabled:opacity-50 font-medium"
            >
              진행 중으로 변경
            </button>
          )}
          {feedback.status === "IN_PROGRESS" && (
            <button
              onClick={() => updateStatus("DONE")}
              disabled={updating}
              className="px-3.5 py-1.5 text-sm rounded-lg bg-emerald-400/15 text-emerald-400 hover:bg-emerald-400/25 transition-colors disabled:opacity-50 font-medium"
            >
              완료로 변경
            </button>
          )}
          {feedback.status === "DONE" && (
            <span className="text-sm text-emerald-400 flex items-center gap-1.5">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              처리 완료
            </span>
          )}
        </div>
      </div>

      {/* Meta */}
      <div className="bg-[#2c2f33] rounded-xl border border-[#40444b]/50 p-5 mb-5 grid grid-cols-2 gap-y-4 text-sm">
        <div>
          <p className="text-xs text-gray-500 mb-1">작성자</p>
          <p className="text-gray-300">{feedback.userName ?? "익명"}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">이메일</p>
          <p className="text-gray-300">{feedback.userEmail ?? "미제공"}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">제출일</p>
          <p className="text-gray-300">
            {new Date(feedback.createdAt).toLocaleString("ko-KR")}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">마지막 수정</p>
          <p className="text-gray-300">
            {new Date(feedback.updatedAt).toLocaleString("ko-KR")}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="bg-[#2c2f33] rounded-xl border border-[#40444b]/50 p-5 mb-5">
        <p className="text-xs text-gray-500 mb-3">내용</p>
        <p className="text-gray-200 text-sm whitespace-pre-wrap leading-relaxed">
          {feedback.content}
        </p>
      </div>

      {/* Attachments */}
      {feedback.attachments && feedback.attachments.length > 0 && (
        <div className="bg-[#2c2f33] rounded-xl border border-[#40444b]/50 p-5">
          <p className="text-xs text-gray-500 mb-3">첨부 이미지</p>
          <div className="flex flex-wrap gap-3">
            {feedback.attachments.map((att) => (
              <a
                key={att.url}
                href={att.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-24 h-24 rounded-lg overflow-hidden border border-[#40444b]/50 hover:border-primary/60 transition-colors"
              >
                {att.mimeType.startsWith("image/") ? (
                  <img
                    src={att.url}
                    alt={att.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 text-xs p-2 text-center gap-1">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <span className="break-all">{att.name}</span>
                  </div>
                )}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
