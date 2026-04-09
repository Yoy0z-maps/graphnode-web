import Header from "../components/Header";
import TeamSection from "../components/TeamSection";

export default function Team() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#07111f] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-12rem] top-[-8rem] h-[28rem] w-[28rem] rounded-full bg-cyan-500/16 blur-3xl" />
        <div className="absolute right-[-10rem] top-[10rem] h-[24rem] w-[24rem] rounded-full bg-fuchsia-500/12 blur-3xl" />
        <div className="absolute bottom-[-10rem] left-[18%] h-[24rem] w-[24rem] rounded-full bg-blue-500/12 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.06)_1px,transparent_1px)] bg-[size:88px_88px] [mask-image:radial-gradient(circle_at_center,black,transparent_82%)]" />
      </div>

      <Header currentPage="team" />

      <main className="relative flex-1 overflow-hidden">
        <TeamSection />
      </main>
    </div>
  );
}
