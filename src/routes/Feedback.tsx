import { useState } from "react";
import logo from "../assets/icons/logo_white.svg";
import { useNavigate } from "react-router-dom";

export default function Feedback() {
  const navigate = useNavigate();

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

    // TODO: 실제 API 호출로 대체
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
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
      navigate("/");
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
          <h1 className="text-4xl font-bold mb-4">피드백 보내기</h1>
          <p className="text-gray-600 text-lg">
            GraphNode에 대한 의견이나 제안사항을 보내주세요. 여러분의 피드백은
            서비스를 개선하는 데 큰 도움이 됩니다.
          </p>
        </div>

        {/* TODO: Success/Error Toast 추가 (여기말고 App수준에서 처리) */}
        {submitStatus === "success" && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
            피드백이 성공적으로 전송되었습니다. 감사합니다!
          </div>
        )}

        {submitStatus === "error" && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
            전송 중 오류가 발생했습니다. 다시 시도해주세요.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              카테고리
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            >
              <option value="general">일반</option>
              <option value="bug">버그 리포트</option>
              <option value="feature">기능 제안</option>
              <option value="improvement">개선 사항</option>
              <option value="other">기타</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              이름
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="이름을 입력하세요"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              이메일
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="your.email@example.com"
              required
            />
          </div>

          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              제목
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="피드백 제목을 입력하세요"
              required
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              내용
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={8}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              placeholder="피드백 내용을 자세히 입력해주세요..."
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
              {isSubmitting ? "전송 중..." : "피드백 보내기"}
            </button>
          </div>
        </form>

        <div className="mt-12 p-6 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">피드백 가이드라인</h2>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>
                버그 리포트의 경우, 재현 단계와 예상 동작을 포함해주세요.
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>
                기능 제안은 구체적인 사용 사례와 함께 설명해주시면 더 도움이
                됩니다.
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>모든 피드백은 검토 후 필요시 이메일로 답변드립니다.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
