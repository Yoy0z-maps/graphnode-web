import { useNavigate } from "react-router-dom";
import logo from "../assets/icons/logo.svg";

export default function Header({
  activeTab,
  setActiveTab,
}: {
  activeTab: "download" | "team";
  setActiveTab: (tab: "download" | "team") => void;
}) {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-[#23272a]/95 backdrop-blur-md border-b border-[#40444b]/50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src={logo} alt="logo" className="w-7 h-7" />
            <span className="text-xl font-bold">GraphNode</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => setActiveTab("download")}
              className={`px-4 py-2 rounded-lg transition-all font-medium ${
                activeTab === "download"
                  ? "text-[#5865f2]"
                  : "text-gray-300 hover:text-white hover:bg-[#40444b]"
              }`}
            >
              다운로드
            </button>
            <button
              onClick={() => setActiveTab("team")}
              className={`px-4 py-2 rounded-lg transition-all font-medium ${
                activeTab === "team"
                  ? "text-[#5865f2]"
                  : "text-gray-300 hover:text-white hover:bg-[#40444b]"
              }`}
            >
              팀 소개
            </button>
            <button
              onClick={() => navigate("/feedback")}
              className={`px-4 py-2 rounded-lg transition-all font-medium text-gray-300 hover:text-white hover:bg-[#40444b]`}
            >
              피드백
            </button>
            <button
              onClick={() => navigate("/status")}
              className={`px-4 py-2 rounded-lg transition-all font-medium text-gray-300 hover:text-white hover:bg-[#40444b]`}
            >
              서버 상태
            </button>
          </nav>
          <div className="flex items-center space-x-3 opacity-0">
            <img src={logo} alt="logo" className="w-7 h-7" />
            <span className="text-xl font-bold">GraphNode</span>
          </div>
        </div>
      </div>
    </header>
  );
}
