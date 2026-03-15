import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import privacyPolicyData from "../data/privacy-policy";
import logo from "../assets/icons/logo_white.svg";

function getLangKey(lang: string): string {
  if (lang.startsWith("zh")) return "zh";
  if (lang.startsWith("ja")) return "ja";
  if (lang.startsWith("ko")) return "ko";
  return "en";
}

function formatDate(dateStr: string, lang: string): string {
  const date = new Date(dateStr + "T00:00:00");
  const key = getLangKey(lang);
  if (key === "ko")
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
  if (key === "zh")
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  if (key === "ja")
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
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
    versionHistory: "개정 이력",
    current: "현재",
    superseded: "이전",
    changesFrom: "이번 개정 주요 변경사항",
    viewingOld: "이전 버전을 열람 중입니다. 현재 적용 중인 버전이 아닙니다.",
    present: "현재",
  },
  en: {
    backHome: "Home",
    effectiveDate: "Effective Date",
    versionHistory: "Version History",
    current: "Current",
    superseded: "Superseded",
    changesFrom: "Key Changes in This Version",
    viewingOld: "You are viewing a past version. This is not the currently active policy.",
    present: "Present",
  },
  zh: {
    backHome: "返回首页",
    effectiveDate: "生效日期",
    versionHistory: "修订历史",
    current: "当前",
    superseded: "旧版",
    changesFrom: "本次修订主要变更",
    viewingOld: "您正在查看旧版本，当前适用版本请查看最新版。",
    present: "至今",
  },
  ja: {
    backHome: "ホームへ",
    effectiveDate: "施行日",
    versionHistory: "改訂履歴",
    current: "現行",
    superseded: "旧版",
    changesFrom: "今回の改訂における主な変更点",
    viewingOld: "旧バージョンを閲覧中です。現在適用中のバージョンではありません。",
    present: "現在",
  },
};

/** 버전 타임라인 목록 (데스크톱 사이드바 / 모바일 드롭다운 공용) */
function VersionList({
  versions,
  selectedIdx,
  onSelect,
  langKey,
  ui,
}: {
  versions: ReturnType<typeof privacyPolicyData[string]["versions"][number]>[];
  selectedIdx: number;
  onSelect: (idx: number) => void;
  langKey: string;
  ui: Record<string, string>;
}) {
  return (
    <ol className="relative border-l border-[#40444b]">
      {versions.map((v, idx) => {
        const isActive = idx === selectedIdx;
        const isFirst = idx === 0;
        return (
          <li key={v.version} className="mb-1 ml-4">
            <span
              className={`absolute -left-[7px] w-3.5 h-3.5 rounded-full border-2 mt-2.5 transition-all ${
                isFirst
                  ? "bg-[#2b89f8] border-[#2b89f8]"
                  : "bg-[#23272a] border-[#40444b]"
              } ${isActive ? "ring-2 ring-[#2b89f8]/40" : ""}`}
            />
            <button
              onClick={() => onSelect(idx)}
              className={`w-full text-left px-3 py-2.5 rounded-lg transition-all text-sm ${
                isActive
                  ? "bg-[#2b89f8]/10 text-[#2b89f8] font-medium"
                  : "text-gray-400 hover:text-white hover:bg-[#40444b]/30"
              }`}
            >
              <div className="font-medium">{v.label}</div>
              <div className={`text-xs mt-0.5 ${isActive ? "text-[#2b89f8]/70" : "text-gray-500"}`}>
                {formatDate(v.effectiveDate, langKey)}
                {v.endDate
                  ? ` ~ ${formatDate(v.endDate, langKey)}`
                  : ` ~ ${ui.present}`}
              </div>
              {isFirst ? (
                <span className="inline-block mt-1 text-[10px] px-1.5 py-0.5 bg-[#2b89f8]/20 text-[#2b89f8] rounded font-medium">
                  {ui.current}
                </span>
              ) : (
                <span className="inline-block mt-1 text-[10px] px-1.5 py-0.5 bg-[#40444b]/50 text-gray-500 rounded">
                  {ui.superseded}
                </span>
              )}
            </button>
          </li>
        );
      })}
    </ol>
  );
}

export default function PrivacyPolicy() {
  const { i18n } = useTranslation();
  const langKey = getLangKey(i18n.language);
  const data = privacyPolicyData[langKey] ?? privacyPolicyData["en"];
  const ui = UI_LABELS[langKey] ?? UI_LABELS["en"];

  const [selectedIdx, setSelectedIdx] = useState(0);
  const selected = data.versions[selectedIdx];
  const isLatest = selectedIdx === 0;

  return (
    <div className="min-h-screen bg-[#23272a] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#23272a]/90 backdrop-blur-md border-b border-[#40444b]/50">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 group">
            <img src={logo} alt="GraphNode" className="w-7 h-7" />
            <span className="font-semibold group-hover:text-[#2b89f8] transition-colors">
              GraphNode
            </span>
          </Link>
          <Link
            to="/"
            className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {ui.backHome}
          </Link>
        </div>
      </header>

      {/*
        레이아웃 전략:
        - 본문은 max-w-3xl 로 완전 중앙 정렬
        - 데스크톱(lg+): 본문 오른쪽에 사이드바를 절대 위치로 고정
        - 모바일: 사이드바 숨김, 제목 옆 토글 버튼으로 드롭다운 표시
      */}
      <div className="relative">
        {/* ── 본문: 완전 중앙 정렬 ── */}
        <main className="max-w-3xl mx-auto px-6 py-10">
          {/* Title row */}
          <div className="flex items-start justify-between gap-4 mb-2">
            <h1 className="text-2xl font-bold text-white">{data.title}</h1>

            {/* 모바일 드롭다운 select (xl 미만에서만 표시) */}
            <select
              value={selectedIdx}
              onChange={(e) => setSelectedIdx(Number(e.target.value))}
              className="xl:hidden shrink-0 bg-[#2c2f33] border border-[#40444b] rounded-lg px-3 py-1.5 text-xs text-gray-300 focus:outline-none focus:border-[#2b89f8] transition-colors cursor-pointer"
            >
              {data.versions.map((v, idx) => (
                <option key={v.version} value={idx}>
                  {v.label}
                </option>
              ))}
            </select>
          </div>

          {/* Effective date */}
          <div className="flex flex-wrap items-center gap-3 text-sm mb-4">
            <span className="flex items-center gap-1.5 text-[#2b89f8]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {ui.effectiveDate}: {formatDate(selected.effectiveDate, langKey)}
            </span>
            {selected.endDate && (
              <span className="text-gray-500">
                ~ {formatDate(selected.endDate, langKey)}
              </span>
            )}
          </div>

          {/* 이전 버전 경고 */}
          {!isLatest && (
            <div className="mb-6 flex items-start gap-2.5 px-4 py-3 bg-yellow-500/10 border border-yellow-500/30 rounded-xl text-yellow-400 text-sm">
              <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{ui.viewingOld}</span>
            </div>
          )}

          {/* 변경사항 요약 */}
          {selected.changesFrom && selected.changesFrom.length > 0 && (
            <div className="mb-6 p-4 bg-[#2c2f33] rounded-xl border border-[#40444b]/50">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                {ui.changesFrom}
              </p>
              <ul className="space-y-1.5">
                {selected.changesFrom.map((change, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                    <span className="text-[#2b89f8] mt-0.5 shrink-0">•</span>
                    <span>{change}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 소개 */}
          <p className="text-gray-300 text-sm leading-relaxed mb-8">{data.intro}</p>

          {/* 본문 섹션 */}
          <div className="space-y-7">
            {selected.sections.map((section, idx) => (
              <section key={idx} className="border-b border-[#40444b]/25 pb-7 last:border-0">
                <h2 className="text-base font-semibold text-white mb-2.5">{section.title}</h2>
                <div className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">
                  {section.body}
                </div>
              </section>
            ))}
          </div>
        </main>

        {/* ── 데스크톱 오른쪽 사이드바 (xl+에서만 표시, 절대 위치) ── */}
        <aside className="hidden xl:block absolute top-10 right-0 w-64 pr-10">
          <div className="sticky top-24">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
              {ui.versionHistory}
            </p>
            <VersionList
              versions={data.versions}
              selectedIdx={selectedIdx}
              onSelect={setSelectedIdx}
              langKey={langKey}
              ui={ui}
            />
          </div>
        </aside>
      </div>

      {/* Footer */}
      <footer className="border-t border-[#40444b]/50 mt-8">
        <div className="max-w-3xl mx-auto px-6 py-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-gray-400">
          <span>© 2025 TACO - GraphNode. All rights reserved.</span>
          <div className="flex gap-6">
            <span className="text-[#2b89f8]">{data.title}</span>
            <Link to="/terms" className="hover:text-white transition-colors">
              {langKey === "ko" ? "이용약관" : langKey === "zh" ? "服务条款" : langKey === "ja" ? "利用規約" : "Terms of Service"}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
