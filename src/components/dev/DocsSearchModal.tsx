import { useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo, useCallback } from "react";
import { useTranslation } from "react-i18next";

interface SearchItem {
  labelKey: string;
  path: string;
  sectionKey?: string;
  keywords?: string[];
}

const searchItems: SearchItem[] = [
    // Introduction
    {
      labelKey: "dev.docs.search.introduction",
      path: "/dev/docs/intro",
      keywords: ["intro", "start", "overview", "graphnode"],
    },
    {
      labelKey: "dev.docs.search.overview",
      path: "/dev/docs/intro#overview",
      sectionKey: "dev.docs.search.introduction",
      keywords: ["overview"],
    },
    {
      labelKey: "dev.docs.search.features",
      path: "/dev/docs/intro#features",
      sectionKey: "dev.docs.search.introduction",
      keywords: ["features"],
    },
    {
      labelKey: "dev.docs.search.gettingStarted",
      path: "/dev/docs/intro#getting-started",
      sectionKey: "dev.docs.search.introduction",
      keywords: ["getting started", "start"],
    },
    {
      labelKey: "dev.docs.search.architecture",
      path: "/dev/docs/intro#architecture",
      sectionKey: "dev.docs.search.introduction",
      keywords: ["architecture"],
    },

    // Change Log
    {
      labelKey: "dev.docs.search.changeLog",
      path: "/dev/docs/change-log",
      keywords: ["change", "update", "changelog", "release"],
    },

    // API Reference
    {
      labelKey: "dev.docs.search.apiReference",
      path: "/dev/docs/api-reference",
      keywords: ["api", "sdk", "reference"],
    },
    {
      labelKey: "dev.docs.search.installation",
      path: "/dev/docs/api-reference#installation",
      sectionKey: "dev.docs.search.apiReference",
      keywords: ["install", "npm", "yarn"],
    },
    {
      labelKey: "dev.docs.search.clientInit",
      path: "/dev/docs/api-reference#client-init",
      sectionKey: "dev.docs.search.apiReference",
      keywords: ["client", "init"],
    },
    {
      labelKey: "dev.docs.search.sdkModules",
      path: "/dev/docs/api-reference#sdk-modules",
      sectionKey: "dev.docs.search.apiReference",
      keywords: ["module"],
    },
    {
      labelKey: "dev.docs.search.userModule",
      path: "/dev/docs/api-reference#module-me",
      sectionKey: "dev.docs.search.apiReference",
      keywords: ["me", "user", "profile"],
    },
    {
      labelKey: "dev.docs.search.aiChat",
      path: "/dev/docs/api-reference#module-ai",
      sectionKey: "dev.docs.search.apiReference",
      keywords: ["ai", "chat"],
    },
    {
      labelKey: "dev.docs.search.conversations",
      path: "/dev/docs/api-reference#module-conversations",
      sectionKey: "dev.docs.search.apiReference",
      keywords: ["conversation"],
    },
    {
      labelKey: "dev.docs.search.graph",
      path: "/dev/docs/api-reference#module-graph",
      sectionKey: "dev.docs.search.apiReference",
      keywords: ["graph", "node", "edge"],
    },
    {
      labelKey: "dev.docs.search.notes",
      path: "/dev/docs/api-reference#module-notes",
      sectionKey: "dev.docs.search.apiReference",
      keywords: ["notes", "folder"],
    },
    {
      labelKey: "dev.docs.search.sync",
      path: "/dev/docs/api-reference#module-sync",
      sectionKey: "dev.docs.search.apiReference",
      keywords: ["sync", "pull", "push"],
    },
    {
      labelKey: "dev.docs.search.restApi",
      path: "/dev/docs/api-reference#rest-api",
      sectionKey: "dev.docs.search.apiReference",
      keywords: ["rest", "endpoint", "http"],
    },

    // MCP
    {
      labelKey: "dev.docs.search.mcp",
      path: "/dev/docs/mcp",
      keywords: ["mcp", "model context protocol", "server", "extension"],
    },
    {
      labelKey: "dev.docs.search.customMcp",
      path: "/dev/docs/mcp#custom-mcp",
      sectionKey: "dev.docs.search.mcp",
      keywords: ["custom", "create", "develop"],
    },
    {
      labelKey: "dev.docs.search.addMcp",
      path: "/dev/docs/mcp#add-method",
      sectionKey: "dev.docs.search.mcp",
      keywords: ["add", "settings"],
    },
    {
      labelKey: "dev.docs.search.githubMcp",
      path: "/dev/docs/mcp#example-github",
      sectionKey: "dev.docs.search.mcp",
      keywords: ["github"],
    },
    {
      labelKey: "dev.docs.search.sqliteMcp",
      path: "/dev/docs/mcp#example-sqlite",
      sectionKey: "dev.docs.search.mcp",
      keywords: ["sqlite", "database", "db"],
    },
    {
      labelKey: "dev.docs.search.puppeteerMcp",
      path: "/dev/docs/mcp#example-puppeteer",
      sectionKey: "dev.docs.search.mcp",
      keywords: ["puppeteer", "browser", "web"],
    },
    {
      labelKey: "dev.docs.search.mcpServerList",
      path: "/dev/docs/mcp#server-list",
      sectionKey: "dev.docs.search.mcp",
      keywords: ["list", "official"],
    },

  // Interactions
  {
    labelKey: "dev.docs.search.interactionsOverview",
    path: "/dev/docs/interactions/overview",
    keywords: ["interaction"],
  },
];

export default function DocsSearchModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const filteredItems = useMemo(() => {
    if (!query.trim()) return searchItems.slice(0, 8);

    const lowerQuery = query.toLowerCase();
    return searchItems.filter((item) => {
      const labelMatch = t(item.labelKey).toLowerCase().includes(lowerQuery);
      const sectionMatch = item.sectionKey ? t(item.sectionKey).toLowerCase().includes(lowerQuery) : false;
      const keywordMatch = item.keywords?.some((kw) =>
        kw.toLowerCase().includes(lowerQuery),
      );
      return labelMatch || sectionMatch || keywordMatch;
    });
  }, [query, t]);

  // Clamp selectedIndex to valid range
  const clampedSelectedIndex = Math.min(selectedIndex, Math.max(0, filteredItems.length - 1));

  // Reset query when modal opens/closes
  const handleQueryChange = (newQuery: string) => {
    setQuery(newQuery);
    setSelectedIndex(0);
  };

  const handleNavigate = useCallback(
    (path: string) => {
      const [basePath, hash] = path.split("#");
      navigate(basePath);
      onClose();

      // Scroll to section after navigation
      if (hash) {
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 100);
      }
    },
    [navigate, onClose],
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          Math.min(prev + 1, filteredItems.length - 1),
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Enter" && filteredItems[clampedSelectedIndex]) {
        e.preventDefault();
        handleNavigate(filteredItems[clampedSelectedIndex].path);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, filteredItems, clampedSelectedIndex, handleNavigate]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-start justify-center pt-24 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-[#2c2f33] rounded-lg w-full max-w-lg shadow-xl border border-gray-200 dark:border-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 p-4 border-b border-gray-200 dark:border-gray-700">
          <svg
            className="w-5 h-5 text-gray-400"
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
          <input
            type="text"
            placeholder={t("dev.docs.sidebar.searchPlaceholder")}
            className="flex-1 bg-transparent outline-none text-gray-900 dark:text-white placeholder-gray-500"
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            autoFocus
          />
          <kbd className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded text-gray-500 dark:text-gray-400">
            ESC
          </kbd>
        </div>
        <div className="p-2 max-h-80 overflow-y-auto">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <button
                key={item.path}
                className={`w-full text-left px-4 py-3 rounded transition-colors flex items-center justify-between ${
                  index === clampedSelectedIndex
                    ? "bg-blue-50 dark:bg-blue-500/20 text-gray-900 dark:text-white"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                }`}
                onClick={() => handleNavigate(item.path)}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                <div>
                  <div className="flex items-center gap-2">
                    {item.sectionKey && (
                      <span className="text-xs text-gray-400 dark:text-gray-500">
                        {t(item.sectionKey)} /
                      </span>
                    )}
                    <span>{t(item.labelKey)}</span>
                  </div>
                </div>
                {index === clampedSelectedIndex && (
                  <kbd className="px-1.5 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 rounded text-gray-500 dark:text-gray-400">
                    Enter
                  </kbd>
                )}
              </button>
            ))
          ) : (
            <p className="px-4 py-3 text-gray-500">
              {t("dev.docs.sidebar.noResults")}
            </p>
          )}
        </div>
        <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500 flex items-center gap-4">
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded">
              ↑
            </kbd>
            <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded">
              ↓
            </kbd>
            {t("dev.docs.search.toNavigate")}
          </span>
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded">
              Enter
            </kbd>
            {t("dev.docs.search.toSelect")}
          </span>
        </div>
      </div>
    </div>
  );
}
