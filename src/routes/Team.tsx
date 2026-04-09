import Header from "../components/Header";
import TeamSection from "../components/TeamSection";

export default function Team() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#07111f] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-48 -top-32 h-112 w-md rounded-full bg-cyan-500/16 blur-3xl" />
        <div className="absolute -right-40 top-40 h-96 w-96 rounded-full bg-fuchsia-500/12 blur-3xl" />
        <div className="absolute -bottom-40 left-[18%] h-96 w-96 rounded-full bg-blue-500/12 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.06)_1px,transparent_1px)] bg-size-[88px_88px] mask-[radial-gradient(circle_at_center,black,transparent_82%)]" />
      </div>

      <Header currentPage="team" />

      <main className="relative flex-1 overflow-hidden">
        <TeamSection />
      </main>
    </div>
  );
}
