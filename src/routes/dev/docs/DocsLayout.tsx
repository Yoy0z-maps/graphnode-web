import { useState, useEffect } from "react";
import { Outlet, NavLink, useLocation, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import DocsSearchModal from "@/components/dev/DocsSearchModal";
import Header from "@/components/dev/Header";

export default function DocsLayout() {
  const [searchOpen, setSearchOpen] = useState(false);
  const { t } = useTranslation();

  const location = useLocation();

  // cmd + k shortcut to open search modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Redirect /dev/docs to /dev/docs/intro
  if (location.pathname === "/dev/docs") {
    return <Navigate to="/dev/docs/intro" replace />;
  }

  // NavLink style definition
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `block px-3 py-2 rounded text-sm transition-colors ${
      isActive
        ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
        : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700/50"
    }`;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#23272a] text-gray-900 dark:text-white flex flex-col">
      {/* Header */}
      <Header />

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-white dark:bg-[#2c2f33] border-r border-gray-200 dark:border-gray-700 p-4 flex flex-col">
          {/* Top Navigation */}
          <nav className="flex flex-col gap-1">
            <NavLink to="/dev/docs/intro" className={navLinkClass}>
              {t("dev.docs.sidebar.docs")}
            </NavLink>
            <NavLink to="/dev/status" className={navLinkClass}>
              {t("dev.docs.sidebar.status")}
            </NavLink>
          </nav>

          {/* Divider */}
          <div className="border-t border-gray-200 dark:border-gray-700 my-4" />

          {/* Search Box */}
          <button
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-3 px-3 py-2 rounded bg-gray-100 dark:bg-gray-700/50 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-4"
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
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <span className="flex-1 text-left text-sm">{t("dev.docs.sidebar.search")}</span>
            <kbd className="flex items-center gap-1 px-1.5 py-0.5 text-xs bg-gray-200 dark:bg-gray-600 rounded">
              <span>⌘</span>
              <span>K</span>
            </kbd>
          </button>

          {/* Docs Navigation */}
          <nav className="flex flex-col gap-1">
            <NavLink to="/dev/docs/intro" className={navLinkClass}>
              {t("dev.docs.sidebar.introduction")}
            </NavLink>
            <NavLink to="/dev/docs/change-log" className={navLinkClass}>
              {t("dev.docs.sidebar.changeLog")}
            </NavLink>
            <NavLink to="/dev/docs/api-reference" className={navLinkClass}>
              {t("dev.docs.sidebar.apiReference")}
            </NavLink>
            <NavLink to="/dev/docs/mcp" className={navLinkClass}>
              MCP
            </NavLink>
          </nav>

          {/* Interactions Section */}
          <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mt-6 mb-2 px-3">
            {t("dev.docs.sidebar.interactions")}
          </h3>
          <nav className="flex flex-col gap-1">
            <NavLink
              to="/dev/docs/interactions/overview"
              className={navLinkClass}
            >
              {t("dev.docs.sidebar.overview")}
            </NavLink>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 flex justify-center">
          <div className="w-full max-w-6xl">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Search Modal */}
      <DocsSearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </div>
  );
}
