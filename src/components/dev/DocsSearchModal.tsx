import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function DocsSearchModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const searchItems = [
    { label: "Introduction", path: "/dev/docs/intro" },
    { label: "Change Log", path: "/dev/docs/change-log" },
    { label: "API Reference", path: "/dev/docs/api-reference" },
    { label: "Interactions Overview", path: "/dev/docs/interactions/overview" },
  ];

  // TODO: DB와 연동해야함
  const filteredItems = searchItems.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase()),
  );

  // ESC 키로 서치 모달 닫기
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-start justify-center pt-24 z-50"
      onClick={onClose}
    >
      <div
        className="bg-[#2c2f33] rounded-lg w-full max-w-lg shadow-xl border border-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 p-4 border-b border-gray-700">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search documentation..."
            className="flex-1 bg-transparent outline-none text-white placeholder-gray-500"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          <kbd className="px-2 py-1 text-xs bg-gray-700 rounded text-gray-400">
            ESC
          </kbd>
        </div>
        <div className="p-2 max-h-80 overflow-y-auto">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <button
                key={item.path}
                className="w-full text-left px-4 py-3 rounded hover:bg-gray-700 text-gray-300 hover:text-white transition-colors"
                onClick={() => {
                  navigate(item.path);
                  onClose();
                }}
              >
                {item.label}
              </button>
            ))
          ) : (
            <p className="px-4 py-3 text-gray-500">No results found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
