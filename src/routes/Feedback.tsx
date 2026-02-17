import { useState } from "react";
import { useTranslation } from "react-i18next";
import logo from "../assets/icons/logo_white.svg";

export default function Feedback() {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    category: "general",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null,
  );

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const categoryKo: Record<string, string> = {
      general: "일반",
      bug: "버그 리포트",
      feature: "기능 제안",
      improvement: "개선 사항",
      other: "기타",
    };

    const payload = {
      text: "*새로운 유저 피드백이 도착했습니다*",
      attachments: [
        {
          color: "#2B89F8",
          fields: [
            { title: "카테고리", value: categoryKo[formData.category] ?? formData.category, short: false },
            {
              title: "이름",
              value: formData.name.trim() || t("feedback.anonymousName"),
              short: true,
            },
            {
              title: "이메일",
              value: formData.email.trim() || t("feedback.privateEmail"),
              short: true,
            },
            {
              title: "제목",
              value: formData.subject,
              short: false,
            },
            {
              title: "내용",
              value: formData.message,
              short: false,
            },
          ],
        },
      ],
    };

    try {
      const url = import.meta.env.VITE_SLACK_WEBHOOK_URL;

      await fetch(url, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        category: "general",
      });
    } catch (error) {
      console.error(error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="bg-primary h-85 text-white flex items-center justify-center gap-8">
        <img src={logo} alt="logo" className="w-16 h-16" />
        <p className="text-6xl font-bold text-white">GraphNode</p>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{t("feedback.title")}</h1>
          <p className="text-gray-600 text-lg">{t("feedback.description")}</p>
        </div>

        {submitStatus === "success" && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
            {t("feedback.successMessage")}
          </div>
        )}

        {submitStatus === "error" && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
            {t("feedback.errorMessage")}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              {t("feedback.category")}
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            >
              <option value="general">
                {t("feedback.categories.general")}
              </option>
              <option value="bug">{t("feedback.categories.bug")}</option>
              <option value="feature">
                {t("feedback.categories.feature")}
              </option>
              <option value="improvement">
                {t("feedback.categories.improvement")}
              </option>
              <option value="other">{t("feedback.categories.other")}</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              {t("feedback.name")}{" "}
              <span className="text-gray-400 font-normal">
                {t("feedback.nameOptional")}
              </span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder={t("feedback.namePlaceholder")}
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              {t("feedback.email")}{" "}
              <span className="text-gray-400 font-normal">
                {t("feedback.emailOptional")}
              </span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="your.email@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              {t("feedback.subject")}{" "}
              <span className="text-red-500">{t("feedback.required")}</span>
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder={t("feedback.subjectPlaceholder")}
              required
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              {t("feedback.message")}{" "}
              <span className="text-red-500">{t("feedback.required")}</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={8}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              placeholder={t("feedback.messagePlaceholder")}
              required
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`px-8 py-3 bg-primary text-white rounded-lg font-medium transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                isSubmitting
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:shadow-lg"
              }`}
            >
              {isSubmitting ? t("feedback.submitting") : t("feedback.submit")}
            </button>
          </div>
        </form>

        <div className="mt-12 p-6 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">
            {t("feedback.guidelines.title")}
          </h2>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>{t("feedback.guidelines.bugReport")}</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>{t("feedback.guidelines.featureSuggestion")}</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>{t("feedback.guidelines.reviewNotice")}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
