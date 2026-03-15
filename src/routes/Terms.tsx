import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import termsData from "../data/terms";
import logo from "../assets/icons/logo_white.svg";

function getLangKey(lang: string): string {
  if (lang.startsWith("zh")) return "zh";
  if (lang.startsWith("ja")) return "ja";
  if (lang.startsWith("ko")) return "ko";
  return "en";
}

function formatDate(dateStr: string, lang: string): string {
  const date = new Date(dateStr);
  const key = getLangKey(lang);
  if (key === "ko") {
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
  }
  if (key === "zh") {
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  }
  if (key === "ja") {
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  }
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const UI_LABELS: Record<string, Record<string, string>> = {
  ko: {
    backHome: "홈으로",
    effectiveDate: "시행일",
  },
  en: {
    backHome: "Home",
    effectiveDate: "Effective Date",
  },
  zh: {
    backHome: "返回首页",
    effectiveDate: "生效日期",
  },
  ja: {
    backHome: "ホームへ",
    effectiveDate: "施行日",
  },
};

export default function Terms() {
  const { i18n } = useTranslation();
  const langKey = getLangKey(i18n.language);
  const data = termsData[langKey] ?? termsData["en"];
  const ui = UI_LABELS[langKey] ?? UI_LABELS["en"];

  return (
    <div className="min-h-screen bg-[#23272a] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#23272a]/90 backdrop-blur-md border-b border-[#40444b]/50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 group">
            <img src={logo} alt="GraphNode" className="w-7 h-7" />
            <span className="font-semibold text-white group-hover:text-[#2b89f8] transition-colors">
              GraphNode
            </span>
          </Link>
          <Link
            to="/"
            className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1"
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
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            {ui.backHome}
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-3">{data.title}</h1>
          <div className="flex items-center gap-2 text-sm text-[#2b89f8] font-medium">
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
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            {ui.effectiveDate}: {formatDate(data.effectiveDate, langKey)}
          </div>
        </div>

        {/* Intro */}
        <p className="text-gray-300 leading-relaxed mb-8 text-sm">
          {data.intro}
        </p>

        {/* Sections */}
        <div className="space-y-8">
          {data.sections.map((section, idx) => (
            <section
              key={idx}
              className="border-b border-[#40444b]/30 pb-8 last:border-0"
            >
              <h2 className="text-lg font-semibold text-white mb-3">
                {section.title}
              </h2>
              <div className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">
                {section.body}
              </div>
            </section>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#40444b]/50 mt-16">
        <div className="max-w-4xl mx-auto px-6 py-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-gray-400">
          <span>© 2025 TACO - GraphNode. All rights reserved.</span>
          <div className="flex gap-6">
            <Link
              to="/privacy"
              className="hover:text-white transition-colors"
            >
              {langKey === "ko"
                ? "개인정보처리방침"
                : langKey === "zh"
                  ? "隐私政策"
                  : langKey === "ja"
                    ? "プライバシーポリシー"
                    : "Privacy Policy"}
            </Link>
            <span className="text-[#2b89f8]">{data.title}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
