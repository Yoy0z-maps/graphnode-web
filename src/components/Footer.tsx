import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="w-full border-t border-white/10 bg-slate-950/60 backdrop-blur">
      <div className="mx-auto max-w-7xl px-6 py-6">
        <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-400">{t("footer.copyright")}</span>
          </div>
          <div className="flex flex-col items-center gap-4 md:flex-row md:gap-6">
            <div className="flex gap-6 text-sm text-slate-400">
              <Link to="/privacy" className="transition-colors hover:text-white">
                {t("footer.privacy")}
              </Link>
              <Link to="/terms" className="transition-colors hover:text-white">
                {t("footer.terms")}
              </Link>
            </div>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </footer>
  );
}
