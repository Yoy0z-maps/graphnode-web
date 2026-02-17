import { useState } from "react";
import { useTranslation } from "react-i18next";
import logo from "@/assets/icons/logo.svg";

export default function Header() {
  const [isDark, setIsDark] = useState(true);
  const { t } = useTranslation();

  return (
    <header className="h-14 bg-[#2c2f33] border-b border-gray-700 flex items-center justify-between px-4">
      <div className="flex items-center gap-3">
        <img src={logo} alt="logo" className="w-6 h-6" />
        <span className="font-semibold text-lg">{t("dev.header.title")}</span>
      </div>
      <button
        onClick={() => setIsDark(!isDark)}
        className="p-2 rounded hover:bg-gray-700 transition-colors"
        title={isDark ? t("dev.header.lightMode") : t("dev.header.darkMode")}
      >
        {isDark ? (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        ) : (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        )}
      </button>
    </header>
  );
}
