import { useTranslation } from "react-i18next";
import TableOfContents, { type TocItem } from "@/components/dev/TableOfContents";

const tocItems: TocItem[] = [
  { id: "overview", titleKey: "dev.docs.introPage.overview.title", level: 2 },
  { id: "features", titleKey: "dev.docs.introPage.features.title", level: 2 },
  { id: "getting-started", titleKey: "dev.docs.introPage.gettingStarted.title", level: 2 },
  { id: "architecture", titleKey: "dev.docs.introPage.architecture.title", level: 2 },
  { id: "support", titleKey: "dev.docs.introPage.support.title", level: 2 },
];

export default function Intro() {
  const { t } = useTranslation();

  return (
    <div className="flex gap-24">
      {/* Main Content */}
      <div className="flex-1 max-w-3xl">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
          {t("dev.docs.introPage.title")}
        </h1>

        <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">
          {t("dev.docs.introPage.description")}
        </p>

        {/* Overview */}
        <section id="overview" className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            {t("dev.docs.introPage.overview.title")}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {t("dev.docs.introPage.overview.description")}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="p-4 bg-gray-100 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="text-blue-600 dark:text-blue-400 text-2xl font-bold mb-2">4+</div>
              <div className="text-gray-500 dark:text-gray-400 text-sm">
                {t("dev.docs.introPage.overview.aiModels")}
              </div>
            </div>
            <div className="p-4 bg-gray-100 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="text-green-600 dark:text-green-400 text-2xl font-bold mb-2">
                {t("dev.docs.introPage.overview.realtime")}
              </div>
              <div className="text-gray-500 dark:text-gray-400 text-sm">
                {t("dev.docs.introPage.overview.graphSync")}
              </div>
            </div>
            <div className="p-4 bg-gray-100 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="text-purple-600 dark:text-purple-400 text-2xl font-bold mb-2">MCP</div>
              <div className="text-gray-500 dark:text-gray-400 text-sm">
                {t("dev.docs.introPage.overview.mcpExtension")}
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            {t("dev.docs.introPage.features.title")}
          </h2>

          <div className="space-y-4">
            <div className="p-4 bg-gray-100 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {t("dev.docs.introPage.features.aiChat.title")}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {t("dev.docs.introPage.features.aiChat.description")}
              </p>
            </div>

            <div className="p-4 bg-gray-100 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {t("dev.docs.introPage.features.knowledgeGraph.title")}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {t("dev.docs.introPage.features.knowledgeGraph.description")}
              </p>
            </div>

            <div className="p-4 bg-gray-100 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {t("dev.docs.introPage.features.mcpExtension.title")}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {t("dev.docs.introPage.features.mcpExtension.description")}
              </p>
            </div>

            <div className="p-4 bg-gray-100 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {t("dev.docs.introPage.features.noteManagement.title")}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {t("dev.docs.introPage.features.noteManagement.description")}
              </p>
            </div>

            <div className="p-4 bg-gray-100 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {t("dev.docs.introPage.features.realtimeSync.title")}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {t("dev.docs.introPage.features.realtimeSync.description")}
              </p>
            </div>
          </div>
        </section>

        {/* Getting Started */}
        <section id="getting-started" className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            {t("dev.docs.introPage.gettingStarted.title")}
          </h2>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center font-semibold">
                1
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  {t("dev.docs.introPage.gettingStarted.step1.title")}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {t("dev.docs.introPage.gettingStarted.step1.description")}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center font-semibold">
                2
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  {t("dev.docs.introPage.gettingStarted.step2.title")}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {t("dev.docs.introPage.gettingStarted.step2.description")}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center font-semibold">
                3
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  {t("dev.docs.introPage.gettingStarted.step3.title")}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {t("dev.docs.introPage.gettingStarted.step3.description")}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center font-semibold">
                4
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  {t("dev.docs.introPage.gettingStarted.step4.title")}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {t("dev.docs.introPage.gettingStarted.step4.description")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Architecture */}
        <section id="architecture" className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            {t("dev.docs.introPage.architecture.title")}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {t("dev.docs.introPage.architecture.description")}
          </p>

          <div className="p-6 bg-gray-100 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {t("dev.docs.introPage.architecture.client")}
                </h3>
                <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"></span>
                    {t("dev.docs.introPage.architecture.electron")}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"></span>
                    {t("dev.docs.introPage.architecture.reactTs")}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"></span>
                    {t("dev.docs.introPage.architecture.zustandState")}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"></span>
                    {t("dev.docs.introPage.architecture.threejsD3")}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"></span>
                    {t("dev.docs.introPage.architecture.indexedDb")}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"></span>
                    {t("dev.docs.introPage.architecture.tiptapEditor")}
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {t("dev.docs.introPage.architecture.server")}
                </h3>
                <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full"></span>
                    {t("dev.docs.introPage.architecture.nodeExpress")}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full"></span>
                    {t("dev.docs.introPage.architecture.postgresPrisma")}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full"></span>
                    {t("dev.docs.introPage.architecture.mongoDb")}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full"></span>
                    {t("dev.docs.introPage.architecture.chromaDb")}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full"></span>
                    {t("dev.docs.introPage.architecture.redisEvents")}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full"></span>
                    {t("dev.docs.introPage.architecture.awsS3Sqs")}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Support */}
        <section id="support" className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            {t("dev.docs.introPage.support.title")}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {t("dev.docs.introPage.support.description")}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="https://github.com/TACO-FOR-ALL/GraphNode_BE/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-gray-100 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700/50 transition-colors"
            >
              <div className="flex items-center gap-3 mb-2">
                <svg
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {t("dev.docs.introPage.support.githubIssues")}
                </span>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {t("dev.docs.introPage.support.githubIssuesDesc")}
              </p>
            </a>

            <a
              href="mailto:taco.programmers@gmail.com"
              className="p-4 bg-gray-100 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700/50 transition-colors"
            >
              <div className="flex items-center gap-3 mb-2">
                <svg
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {t("dev.docs.introPage.support.email")}
                </span>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                taco.programmers@gmail.com
              </p>
            </a>
          </div>
        </section>
      </div>

      {/* Table of Contents - Right Sidebar */}
      <TableOfContents items={tocItems} titleKey="dev.docs.introPage.toc" />
    </div>
  );
}
