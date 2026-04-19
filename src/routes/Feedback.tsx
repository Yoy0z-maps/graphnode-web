import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import logo from "../assets/icons/logo_white.svg";

import { createGraphNodeClient } from "@taco_tsinghua/graphnode-sdk";
import type { CreateFeedbackRequestDto } from "@taco_tsinghua/graphnode-sdk";

const client = createGraphNodeClient({});

type FeedbackCategory = "general" | "bug" | "feature" | "improvement" | "other";

type FeedbackFormData = {
  name: string;
  email: string;
  title: string;
  content: string;
  category: FeedbackCategory;
};

const INITIAL_FORM_DATA: FeedbackFormData = {
  name: "",
  email: "",
  title: "",
  content: "",
  category: "general",
};

type AttachedImage = {
  id: string;
  file: File;
  previewUrl: string;
};

export default function Feedback() {
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [images, setImages] = useState<AttachedImage[]>([]);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
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

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    const newImages: AttachedImage[] = files.map((file) => ({
      id: `${Date.now()}-${Math.random()}`,
      file,
      previewUrl: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...newImages]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeImage = (id: string) => {
    setImages((prev) => {
      const removed = prev.find((img) => img.id === id);
      if (removed) URL.revokeObjectURL(removed.previewUrl);
      return prev.filter((img) => img.id !== id);
    });
    if (hoveredId === id) setHoveredId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    const payload: CreateFeedbackRequestDto = {
      category: formData.category,
      title: formData.title.trim(),
      content: formData.content.trim(),
      userName: formData.name.trim() || null,
      userEmail: formData.email.trim() || null,
    };

    if (!payload.title || !payload.content) {
      setSubmitStatus("error");
      setIsSubmitting(false);
      return;
    }

    try {
      const files = images.map((img) => img.file);
      const response = await client.feedback.create(
        payload,
        files.length > 0 ? files : undefined,
      );

      if (!response.isSuccess) {
        throw new Error(
          `Feedback request failed with ${response.error.statusCode}`,
        );
      }

      // Discord 웹훅은 관리자 알림용 — 결과에 영향 없음
      fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category: payload.category,
          title: payload.title,
          content: payload.content,
          name: payload.userName ?? "",
          email: payload.userEmail ?? "",
        }),
      }).catch((e) => console.error("Discord webhook failed:", e));

      setSubmitStatus("success");
      setFormData(INITIAL_FORM_DATA);
      images.forEach((img) => URL.revokeObjectURL(img.previewUrl));
      setImages([]);
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
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              {t("feedback.subject")}{" "}
              <span className="text-red-500">{t("feedback.required")}</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder={t("feedback.subjectPlaceholder")}
              required
            />
          </div>

          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              {t("feedback.message")}{" "}
              <span className="text-red-500">{t("feedback.required")}</span>
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={8}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              placeholder={t("feedback.messagePlaceholder")}
              required
            />
          </div>

          {/* Image attachment */}
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleImageSelect}
            />
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-400 hover:border-primary hover:text-primary transition-colors shrink-0"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                </svg>
                <span className="text-xs mt-1">{t("feedback.addPhoto")}</span>
              </button>

              {images.map((img) => (
                <div
                  key={img.id}
                  className="relative w-24 h-24 rounded-lg overflow-hidden shrink-0 cursor-pointer"
                  onMouseEnter={() => setHoveredId(img.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <img
                    src={img.previewUrl}
                    alt="첨부 이미지"
                    className="w-full h-full object-cover"
                  />
                  {hoveredId === img.id && (
                    <div className="absolute inset-0 bg-black/40 flex items-start justify-end p-1">
                      <button
                        type="button"
                        onClick={() => removeImage(img.id)}
                        className="w-5 h-5 bg-black/60 rounded-full flex items-center justify-center text-white hover:bg-black/80 transition-colors"
                        aria-label="이미지 삭제"
                      >
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 10 10"
                          fill="none"
                        >
                          <path
                            d="M1 1L9 9M9 1L1 9"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
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
