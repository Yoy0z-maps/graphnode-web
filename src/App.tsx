import { useState } from "react";

import "./App.css";
import DownloadSection from "./components/DownloadSection";
import TeamSection from "./components/TeamSection";

function App() {
  const [activeTab, setActiveTab] = useState<"download" | "team">("download");

  return (
    <div className="min-h-screen bg-linear-to-b from-[#23272a] via-[#2c2f33] to-[#23272a] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#23272a]/95 backdrop-blur-md border-b border-[#40444b]/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-linear-to-br from-[#5865f2] to-[#4752c4] rounded-lg flex items-center justify-center">
                  <span className="text-xl font-bold">G</span>
                </div>
                <span className="text-xl font-bold">GraphNode</span>
              </div>
              <nav className="hidden md:flex items-center space-x-6">
                <button
                  onClick={() => setActiveTab("download")}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    activeTab === "download"
                      ? "bg-[#5865f2] text-white"
                      : "text-gray-300 hover:text-white hover:bg-[#40444b]"
                  }`}
                >
                  다운로드
                </button>
                <button
                  onClick={() => setActiveTab("team")}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    activeTab === "team"
                      ? "bg-[#5865f2] text-white"
                      : "text-gray-300 hover:text-white hover:bg-[#40444b]"
                  }`}
                >
                  팀 소개
                </button>
              </nav>
            </div>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-[#40444b] hover:bg-[#5865f2] rounded-lg transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {activeTab === "download" ? <DownloadSection /> : <TeamSection />}
      </main>

      {/* Footer */}
      <footer className="bg-[#23272a] border-t border-[#40444b]/50 py-8 mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-linear-to-br from-[#5865f2] to-[#4752c4] rounded-lg flex items-center justify-center">
                <span className="text-lg font-bold">G</span>
              </div>
              <span className="text-gray-400">
                © 2024 GraphNode. All rights reserved.
              </span>
            </div>
            <div className="flex space-x-6 text-gray-400">
              <a href="#" className="hover:text-white transition-colors">
                개인정보처리방침
              </a>
              <a href="#" className="hover:text-white transition-colors">
                이용약관
              </a>
              <a href="#" className="hover:text-white transition-colors">
                문의하기
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
