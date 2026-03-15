import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-[#23272a] border-t border-[#40444b]/50 w-full">
      <div className="mx-auto px-6 text-center py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-3">
            <span className="text-gray-400">
              {t("footer.copyright")}
            </span>
          </div>
          <div className="flex space-x-6 text-gray-400">
            <Link to="/privacy" className="hover:text-white transition-colors">
              {t("footer.privacy")}
            </Link>
            <Link to="/terms" className="hover:text-white transition-colors">
              {t("footer.terms")}
            </Link>
            <a href="#" className="hover:text-white transition-colors">
              {t("footer.contact")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
