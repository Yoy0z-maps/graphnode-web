export default function DownloadSection() {
  const downloadLinks = {
    mac: {
      arm: "#",
      intel: "#",
    },
    windows: "#",
    linux: "#",
  };

  return (
    <>
      <section className="relative overflow-hidden py-20 px-6">
        <div className="absolute inset-0 bg-linear-to-r from-[#5865f2]/20 via-transparent to-[#5865f2]/20"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-linear-to-r from-white via-[#5865f2] to-white bg-clip-text text-transparent">
              GraphNode
            </h1>
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
      <section className="py-20 px-6 bg-[#2c2f33]/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            강력한 기능들
          </h2>
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
                icon: "📁",
                title: "폴더 관리",
                description:
                  "체계적인 폴더 구조로 노트를 관리하고 조직화하세요",
              },
              {
                icon: "☁️",
                title: "동기화",
                description:
                  "클라우드 동기화로 여러 기기에서 작업을 이어가세요",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-[#40444b]/50 p-6 rounded-xl hover:bg-[#40444b] transition-all transform hover:scale-105 border border-[#40444b]"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Download Options */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            플랫폼별 다운로드
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "macOS",
                icon: "🍎",
                versions: [
                  {
                    label: "Apple Silicon (M1/M2/M3)",
                    link: downloadLinks.mac.arm,
                  },
                  { label: "Intel", link: downloadLinks.mac.intel },
                ],
              },
              {
                name: "Windows",
                icon: "🪟",
                versions: [
                  { label: "Windows 10/11", link: downloadLinks.windows },
                ],
              },
              {
                name: "Linux",
                icon: "🐧",
                versions: [{ label: "Linux", link: downloadLinks.linux }],
              },
            ].map((platform, index) => (
              <div
                key={index}
                className="bg-[#40444b]/50 p-6 rounded-xl border border-[#40444b] hover:border-[#5865f2] transition-all cursor-pointer"
                // onMouseEnter={() => setHoveredPlatform(platform.name)}
                // onMouseLeave={() => setHoveredPlatform(null)}
              >
                <div className="text-5xl mb-4 text-center">{platform.icon}</div>
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
      </section>
    </>
  );
}
