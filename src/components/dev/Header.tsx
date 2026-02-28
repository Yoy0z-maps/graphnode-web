import { useTranslation } from "react-i18next";
import { useTheme } from "@/contexts/ThemeContext";
import logo from "@/assets/icons/logo.svg";

export default function Header() {
  const { isDark, toggleTheme } = useTheme();
  const { t } = useTranslation();

  return (
    <header className="h-14 bg-white dark:bg-[#2c2f33] border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4">
      <div className="flex items-center gap-3">
        <img src={logo} alt="logo" className="w-6 h-6" />
        <span className="font-semibold text-lg text-gray-900 dark:text-white">
          {t("dev.header.title")}
        </span>
      </div>
      <button
        onClick={toggleTheme}
        className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-300"
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
