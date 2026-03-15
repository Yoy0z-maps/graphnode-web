import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/icons/logo_white.svg";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 실제 인증 로직으로 교체
    if (id.trim() && password.trim()) {
      sessionStorage.setItem("admin_auth", "true");
      navigate("/admin");
    } else {
      setError("아이디와 비밀번호를 입력하세요.");
    }
  };

  return (
    <div className="min-h-screen bg-[#23272a] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <img src={logo} alt="GraphNode" className="w-10 h-10 mb-3" />
          <h1 className="text-xl font-bold text-white">Admin</h1>
          <p className="text-sm text-gray-400 mt-1">GraphNode 관리자 페이지</p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#2c2f33] rounded-2xl border border-[#40444b]/50 p-6 space-y-4"
        >
          <div>
            <label className="block text-sm text-gray-300 mb-1.5">아이디</label>
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="admin"
              className="w-full bg-[#40444b]/40 border border-[#40444b] rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#2b89f8] transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1.5">비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#40444b]/40 border border-[#40444b] rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#2b89f8] transition-colors"
            />
          </div>

          {error && (
            <p className="text-red-400 text-xs">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-[#2b89f8] hover:bg-[#1a7ae8] text-white font-medium py-2.5 rounded-lg text-sm transition-colors"
          >
            로그인
          </button>
        </form>

        <p className="text-center text-xs text-gray-500 mt-4">
          GraphNode Admin · 관리자 전용
        </p>
      </div>
    </div>
  );
}
