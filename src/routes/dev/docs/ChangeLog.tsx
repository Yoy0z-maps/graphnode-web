import { useTranslation } from "react-i18next";

export default function ChangeLog() {
  const { t } = useTranslation();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{t("dev.docs.changeLog.title")}</h1>
      <p className="text-gray-300">{t("dev.docs.changeLog.description")}</p>
    </div>
  );
}
