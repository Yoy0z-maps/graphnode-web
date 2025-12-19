export default function Footer() {
  return (
    <footer className="bg-[#23272a] border-t border-[#40444b]/50 w-full">
      <div className="mx-auto px-6 text-center py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-3">
            <span className="text-gray-400">
              © 2025 TACO - GraphNode. All rights reserved.
            </span>
          </div>
          <div className="flex space-x-6 text-gray-400">
            <a href="#" className="hover:text-white transition-colors">
              개인정보처리방침
            </a>
            <a href="#" className="hover:text-white transition-colors">
              이용약관
            </a>
            <a href="#" className="hover:text-white transition-colors">
              문의하기
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
