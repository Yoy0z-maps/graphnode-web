import { useState } from "react";

import DownloadSection from "../components/DownloadSection";
import TeamSection from "../components/TeamSection";
import Header from "../components/Header";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"download" | "team">("download");

  return (
    <div className="min-h-screen bg-linear-to-b from-[#23272a] via-[#2c2f33] to-[#23272a] text-white">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {activeTab === "download" ? <DownloadSection /> : <TeamSection />}
      </main>
    </div>
  );
}
