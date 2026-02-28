import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export interface TocItem {
  id: string;
  titleKey: string;
  level: number;
}

interface TableOfContentsProps {
  items: TocItem[];
  titleKey: string;
  scrollable?: boolean;
}

export default function TableOfContents({ items, titleKey, scrollable = false }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const { t } = useTranslation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -80% 0px" }
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [items]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <aside className="hidden xl:block w-56 shrink-0">
      <div className="sticky top-8">
        <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
          {t(titleKey)}
        </h4>
        <nav className={`flex flex-col gap-1 ${scrollable ? "max-h-[calc(100vh-120px)] overflow-y-auto" : ""}`}>
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`text-left text-sm py-1 transition-colors ${
                item.level === 3 ? "pl-4" : ""
              } ${
                activeId === item.id
                  ? "text-blue-600 dark:text-blue-400 font-medium"
                  : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              {t(item.titleKey)}
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
}
