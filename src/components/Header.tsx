import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logo from "../assets/icons/logo.svg";

export default function Header({
  currentPage,
}: {
  currentPage?: "download" | "team" | "pricing";
}) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleLogin = () => {
    window.location.href = "/app";
  };

  const navItems = [
    {
      id: "download" as const,
      label: t("header.download"),
      onClick: () => navigate("/"),
      active: currentPage === "download",
    },
    {
      id: "team" as const,
      label: t("header.team"),
      onClick: () => navigate("/team"),
      active: currentPage === "team",
    },
    {
      id: "pricing" as const,
      label: t("header.pricing"),
      onClick: () => navigate("/pricing"),
      active: currentPage === "pricing",
    },
    {
      id: "developer" as const,
      label: t("header.developer"),
      onClick: () => navigate("/dev"),
      active: false,
    },
    {
      id: "feedback" as const,
      label: t("header.feedback"),
      onClick: () => navigate("/feedback"),
      active: false,
    },
  ];

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 md:px-6">
      <div className="mx-auto max-w-7xl rounded-[28px] border border-white/10 bg-slate-950/68 px-4 py-3 shadow-[0_12px_40px_rgba(2,6,23,0.26)] backdrop-blur-xl md:rounded-full md:px-6">
        <div className="flex items-center justify-between gap-3 lg:hidden">
          <button
            onClick={() => navigate("/")}
            className="flex min-w-0 items-center gap-3 rounded-full px-2 py-1 text-left transition hover:bg-white/5"
          >
            <div className="rounded-full border border-white/10 bg-white/8 p-2">
              <img src={logo} alt="logo" className="h-6 w-6" />
            </div>
            <div className="min-w-0">
              <p className="hidden text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-cyan-200/70 sm:block">
                {t("header.connectedThinking", { defaultValue: "Connected Thinking" })}
              </p>
              <span className="block truncate text-base font-bold text-white sm:text-lg">
                GraphNode
              </span>
            </div>
          </button>

          <button
            onClick={handleLogin}
            className="shrink-0 rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
          >
            {t("header.login")}
          </button>
        </div>

        <nav className="mt-3 flex gap-2 overflow-x-auto pb-1 lg:hidden">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={item.onClick}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
                item.active
                  ? "bg-white text-slate-950"
                  : "bg-white/6 text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="hidden items-center lg:grid lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:gap-4">
          <button
            onClick={() => navigate("/")}
            className="flex min-w-0 items-center gap-3 rounded-full px-2 py-1 text-left transition hover:bg-white/5 justify-self-start"
          >
            <div className="rounded-full border border-white/10 bg-white/8 p-2">
              <img src={logo} alt="logo" className="h-6 w-6" />
            </div>
            <div className="min-w-0">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-cyan-200/70">
                {t("header.connectedThinking", { defaultValue: "Connected Thinking" })}
              </p>
              <span className="block truncate text-lg font-bold text-white">
                GraphNode
              </span>
            </div>
          </button>

          <nav className="flex items-center justify-center gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={item.onClick}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  item.active
                    ? "bg-white text-slate-950"
                    : "text-slate-300 hover:bg-white/8 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="justify-self-end">
            <button
              onClick={handleLogin}
              className="rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
            >
              {t("header.login")}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
