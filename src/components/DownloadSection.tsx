import Footer from "./Footer";
import appleIcon from "../assets/images/apple.png";
import windowsIcon from "../assets/images/windows.png";
import linuxIcon from "../assets/images/linux.png";
import { motion } from "motion/react";

export default function DownloadSection() {
  const downloadLinks = {
    mac: {
      arm: "https://github.com/TACO-FOR-ALL/GhraphNode_WEB/releases/download/Beta2.0.0/GraphNode-2.0.0-arm64-mac.zip",
      intel:
        "https://github.com/TACO-FOR-ALL/GhraphNode_WEB/releases/download/Beta2.0.0/GraphNode-2.0.0-mac.zip",
    },
    windows: "#",
    linux: "#",
  };

  return (
    <>
      <section className="relative overflow-hidden py-20 px-6 h-screen">
        <div className="absolute inset-0 bg-linear-to-r from-[#5865f2]/20 via-transparent to-[#5865f2]/20"></div>
        <div className="max-w-7xl mx-auto relative z-10 h-full">
          <div className="relative text-center max-w-4xl mx-auto h-full flex flex-col justify-center items-center">
            <div className="absolute top-5 left-0 right-0">
              <motion.p
                variants={{
                  hidden: { x: -100, opacity: 0 },
                  visible: {
                    x: 0,
                    opacity: 1,
                    transition: { delay: 0, duration: 1 },
                  },
                }}
                initial="hidden"
                animate="visible"
                className="bg-linear-to-r text-transparent from-gray-400 via-white to-gray-400 bg-clip-text text-4xl mb-6 font-bold"
              >
                시각화를 통한 강력한 지식 관리
              </motion.p>
              <motion.p
                variants={{
                  hidden: { x: 100, opacity: 0 },
                  visible: {
                    x: 0,
                    opacity: 1,
                    transition: { delay: 0, duration: 1 },
                  },
                }}
                initial="hidden"
                animate="visible"
                className="bg-linear-to-r text-transparent from-gray-400 via-white to-gray-400 bg-clip-text text-4xl mb-16 font-bold"
              >
                더 나은 학습과 생산성을 위해 더욱 치밀하게
              </motion.p>
            </div>
            <p className="text-6xl md:text-7xl font-bold mb-3 bg-linear-to-r from-[#5865f2] via-white to-[#5865f2] bg-clip-text text-transparent">
              GraphNode
            </p>
            <p className="text-xl md:text-xl font-bold mb-8 bg-linear-to-r from-white via-[#5865f2] to-white bg-clip-text text-transparent">
              Beta 1.0.0
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={downloadLinks.mac.arm}
                className="px-8 py-4 bg-[#5865f2] hover:bg-[#4752c4] rounded-lg text-lg font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                macOS 다운로드
              </a>
              <a
                href={downloadLinks.windows}
                className="px-8 py-4 bg-[#40444b] hover:bg-[#5865f2] rounded-lg text-lg font-semibold transition-all transform hover:scale-105"
              >
                Windows 다운로드
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-[#2c2f33]/50 h-screen">
        <div className="max-w-7xl mx-auto mt-12">
          <motion.h2
            variants={{
              hidden: { y: 50, opacity: 0 },
              visible: {
                y: 0,
                opacity: 1,
                transition: { delay: 0, duration: 1 },
              },
            }}
            initial="hidden"
            animate="visible"
            className="text-4xl font-bold text-center mb-32"
          >
            강력한 기능들
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "📝",
                title: "마크다운 노트",
                description:
                  "강력한 마크다운 에디터로 아이디어를 기록하고 정리하세요",
              },
              {
                icon: "💬",
                title: "AI 채팅",
                description:
                  "OpenAI와 DeepSeek을 활용한 지능형 AI 어시스턴트와 대화하세요",
              },
              {
                icon: "🕸️",
                title: "그래프 시각화",
                description:
                  "노트와 채팅을 연결하여 지식 그래프를 2D/3D로 시각화하세요",
              },
              {
                icon: "🔍",
                title: "스마트 검색",
                description:
                  "전체 노트와 채팅을 빠르게 검색하고 원하는 정보를 찾으세요",
              },
              {
                icon: "💻",
                title: "에이전트",
                description: "AI 어시스턴트를 통해 각종 작업을 자동화해보세요",
              },
              {
                icon: "☁️",
                title: "동기화",
                description:
                  "클라우드 동기화로 여러 기기에서 작업을 이어가세요",
              },
            ].map((feature, index) => (
              <motion.div
                whileInView={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                key={index}
                className="bg-[#40444b]/50 p-6 rounded-xl hover:bg-[#40444b] transition-all transform hover:scale-105 border border-[#40444b]"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Download Options */}
      <section className="px-6 h-screen flex flex-col items-center justify-between">
        <div className="opacity-0">
          <Footer />
        </div>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-20">
            플랫폼별 다운로드
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                name: "macOS",
                icon: appleIcon,
                versions: [
                  {
                    label: "Apple Silicon",
                    link: downloadLinks.mac.arm,
                  },
                  { label: "Intel", link: downloadLinks.mac.intel },
                ],
              },
              {
                name: "Windows",
                icon: windowsIcon,
                versions: [
                  { label: "Windows 10/11", link: downloadLinks.windows },
                ],
              },
              {
                name: "Linux",
                icon: linuxIcon,
                versions: [
                  { label: "추후 지원 예정", link: downloadLinks.linux },
                ],
              },
            ].map((platform, index) => (
              <div
                key={index}
                className="bg-[#40444b]/50 p-6 min-w-[270px] rounded-xl border border-[#40444b] hover:border-[#5865f2] transition-all duration-500 cursor-pointer hover:scale-110"
                // onMouseEnter={() => setHoveredPlatform(platform.name)}
                // onMouseLeave={() => setHoveredPlatform(null)}
              >
                <div className="flex justify-center items-center">
                  <img
                    src={platform.icon}
                    alt={platform.name}
                    className="w-10 h-10 mb-4 object-contain"
                  />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-center">
                  {platform.name}
                </h3>
                <div className="space-y-2">
                  {platform.versions.map((version, vIndex) => (
                    <a
                      key={vIndex}
                      href={version.link}
                      className="block w-full px-4 py-3 bg-[#5865f2] hover:bg-[#4752c4] rounded-lg text-center transition-colors"
                    >
                      {version.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </section>
    </>
  );
}
