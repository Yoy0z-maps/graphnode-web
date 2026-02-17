import { useTranslation } from "react-i18next";
import Footer from "./Footer";
import appleIcon from "../assets/images/apple.png";
import windowsIcon from "../assets/images/windows.png";
import linuxIcon from "../assets/images/linux.png";
import { motion } from "motion/react";

const featureKeys = [
  { key: "markdownNote", icon: "📝" },
  { key: "aiChat", icon: "💬" },
  { key: "graphVisualization", icon: "🕸️" },
  { key: "smartSearch", icon: "🔍" },
  { key: "agent", icon: "💻" },
  { key: "sync", icon: "☁️" },
] as const;

export default function DownloadSection() {
  const { t } = useTranslation();

  const downloadLinks = {
    mac: {
      arm: "https://github.com/TACO-FOR-ALL/GraphNode_Front/releases/download/Beta2.0.0/GraphNode-2.0.0-arm64.dmg",
      intel:
        "https://github.com/Yoy0z-maps/graphnode-web/releases/download/Beta2.0.0/GraphNode-2.0.0.dmg",
    },
    windows:
      "https://github.com/TACO-FOR-ALL/GraphNode_Front/releases/download/Beta2.0.0/GraphNode.Setup.2.0.0.exe",
    linux: "#",
  };

  const platforms = [
    {
      name: "macOS",
      icon: appleIcon,
      versions: [
        {
          label: t("download.platforms.appleSilicon"),
          link: downloadLinks.mac.arm,
        },
        { label: t("download.platforms.intel"), link: downloadLinks.mac.intel },
      ],
    },
    {
      name: "Windows",
      icon: windowsIcon,
      versions: [
        {
          label: t("download.platforms.windows1011"),
          link: downloadLinks.windows,
        },
      ],
    },
    {
      name: "Linux",
      icon: linuxIcon,
      versions: [
        {
          label: t("download.platforms.linuxComingSoon"),
          link: downloadLinks.linux,
        },
      ],
    },
  ];

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
                {t("download.hero.tagline1")}
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
                {t("download.hero.tagline2")}
              </motion.p>
            </div>
            <p className="text-6xl md:text-7xl font-bold mb-3 bg-linear-to-r from-[#5865f2] via-white to-[#5865f2] bg-clip-text text-transparent">
              GraphNode
            </p>
            <p className="text-xl md:text-xl font-bold mb-8 bg-linear-to-r from-white via-[#5865f2] to-white bg-clip-text text-transparent">
              Beta 2.0.0
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={downloadLinks.mac.arm}
                className="px-8 py-4 bg-[#5865f2] hover:bg-[#4752c4] rounded-lg text-lg font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                {t("download.hero.macDownload")}
              </a>
              <a
                href={downloadLinks.windows}
                className="px-8 py-4 bg-[#40444b] hover:bg-[#5865f2] rounded-lg text-lg font-semibold transition-all transform hover:scale-105"
              >
                {t("download.hero.windowsDownload")}
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
            {t("download.features.title")}
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {featureKeys.map((feature, index) => (
              <motion.div
                whileInView={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                key={index}
                className="bg-[#40444b]/50 p-6 rounded-xl hover:bg-[#40444b] transition-all transform hover:scale-105 border border-[#40444b]"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">
                  {t(`download.features.${feature.key}.title`)}
                </h3>
                <p className="text-gray-400">
                  {t(`download.features.${feature.key}.description`)}
                </p>
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
            {t("download.platforms.title")}
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {platforms.map((platform, index) => (
              <div
                key={index}
                className="bg-[#40444b]/50 p-6 min-w-67.5 rounded-xl border border-[#40444b] hover:border-[#5865f2] transition-all duration-500 cursor-pointer hover:scale-110"
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
