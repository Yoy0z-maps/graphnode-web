import { useState } from "react";
import { useTranslation } from "react-i18next";
import CodeBlock from "@/components/dev/CodeBlock";
import TableOfContents, { type TocItem } from "@/components/dev/TableOfContents";

interface VersionInfo {
  version: string;
  date: string;
  current?: boolean;
}

const versions: VersionInfo[] = [
  { version: "0.1.46", date: "2026-02-25", current: true },
  { version: "0.1.45", date: "2026-02-20" },
  { version: "0.1.44", date: "2026-02-15" },
  { version: "0.1.43", date: "2026-02-10" },
  { version: "0.1.42", date: "2026-02-05" },
  { version: "0.1.41", date: "2026-01-30" },
  { version: "0.1.40", date: "2026-01-25" },
  { version: "0.1.39", date: "2026-01-20" },
  { version: "0.1.38", date: "2026-01-15" },
  { version: "0.1.37", date: "2026-01-10" },
];

const tocItems: TocItem[] = [
  { id: "installation", titleKey: "dev.docs.api.installation", level: 2 },
  { id: "client-init", titleKey: "dev.docs.api.clientInit", level: 2 },
  { id: "sdk-modules", titleKey: "dev.docs.api.sdkModules", level: 2 },
  { id: "module-me", titleKey: "dev.docs.api.modules.me.title", level: 3 },
  { id: "module-ai", titleKey: "dev.docs.api.modules.ai.title", level: 3 },
  { id: "module-conversations", titleKey: "dev.docs.api.modules.conversations.title", level: 3 },
  { id: "module-graph", titleKey: "dev.docs.api.modules.graph.title", level: 3 },
  { id: "module-notes", titleKey: "dev.docs.api.modules.notes.title", level: 3 },
  { id: "module-sync", titleKey: "dev.docs.api.modules.sync.title", level: 3 },
  { id: "rest-api", titleKey: "dev.docs.api.restApi.title", level: 2 },
  { id: "api-auth", titleKey: "dev.docs.api.restApi.auth", level: 3 },
  { id: "api-user", titleKey: "dev.docs.api.restApi.userNotifications", level: 3 },
  { id: "api-conversations", titleKey: "dev.docs.api.restApi.conversations", level: 3 },
  { id: "api-messages", titleKey: "dev.docs.api.restApi.messages", level: 3 },
  { id: "api-nodes", titleKey: "dev.docs.api.restApi.graphNodes", level: 3 },
  { id: "api-edges", titleKey: "dev.docs.api.restApi.graphEdges", level: 3 },
  { id: "api-clusters", titleKey: "dev.docs.api.restApi.clusters", level: 3 },
  { id: "api-notes", titleKey: "dev.docs.api.restApi.notesFolders", level: 3 },
  { id: "api-sync", titleKey: "dev.docs.api.restApi.sync", level: 3 },
];

export default function ApiReference() {
  const [selectedVersion, setSelectedVersion] = useState<string>("0.1.46");
  const [versionDropdownOpen, setVersionDropdownOpen] = useState(false);
  const { t } = useTranslation();

  const selectedVersionInfo = versions.find(
    (v) => v.version === selectedVersion,
  );

  const installCode = `# npm
npm install @taco_tsinghua/graphnode-sdk

# yarn
yarn add @taco_tsinghua/graphnode-sdk

# pnpm
pnpm add @taco_tsinghua/graphnode-sdk`;

  const clientInitCode = `import { createGraphNodeClient } from '@taco_tsinghua/graphnode-sdk';

const client = createGraphNodeClient({
  baseUrl: 'https://api.graphnode.com',
  credentials: 'include',
});`;

  const meModuleCode = `// Get current user info
const user = await client.me.get();

// API key management
const keys = await client.me.apiKeys.list();
await client.me.apiKeys.create({ name: 'my-key' });

// Language settings
await client.me.updateLanguage('ko');`;

  const aiModuleCode = `// AI chat (streaming)
const stream = await client.ai.chat({
  conversationId: 'conv-123',
  model: 'openai', // 'openai' | 'claude' | 'gemini' | 'deepseek'
  message: 'Hello!',
  files: []
});

for await (const chunk of stream) {
  console.log(chunk.content);
}`;

  const conversationsModuleCode = `// List conversations
const conversations = await client.conversations.list({
  limit: 20,
  cursor: 'next-cursor'
});

// Create conversation
const conv = await client.conversations.create({
  id: 'conv-uuid',
  title: 'New conversation',
  messages: []
});

// Update conversation
await client.conversations.update('conv-id', { title: 'Updated title' });

// Delete conversation (soft delete)
await client.conversations.delete('conv-id');

// Restore conversation
await client.conversations.restore('conv-id');

// Permanently delete conversation
await client.conversations.delete('conv-id', { permanent: true });`;

  const graphModuleCode = `// Node CRUD
const nodes = await client.graph.nodes.list();
await client.graph.nodes.create({
  id: 'node-uuid',
  clusterId: 'cluster-1',
  clusterName: 'Topic Cluster',
  timestamp: Date.now(),
  numMessages: 5
});

// Edge management
await client.graph.edges.create({
  id: 'edge-uuid',
  source: 'node-1',
  target: 'node-2',
  weight: 0.8,
  type: 'hard', // 'hard' | 'insight'
  intraCluster: true
});

// Cluster management
const clusters = await client.graph.clusters.list();

// Graph snapshot
const snapshot = await client.graph.snapshot.get();
await client.graph.snapshot.save();

// Graph stats
const stats = await client.graph.stats.get();`;

  const notesModuleCode = `// Note CRUD
const notes = await client.notes.list({ folderId: 'folder-1' });
await client.notes.create({
  id: 'note-uuid',
  title: 'New Note',
  content: 'Note content...',
  folderId: 'folder-1'
});

// Folder management
const folders = await client.folders.list();
await client.folders.create({
  id: 'folder-uuid',
  name: 'New Folder',
  parentId: null
});`;

  const syncModuleCode = `// Pull server changes
const changes = await client.sync.pull({
  since: '2026-01-01T00:00:00Z'
});

// Push client changes
await client.sync.push({
  changes: [...],
  idempotencyKey: 'unique-key-123'
});`;

  return (
    <div className="flex gap-24">
      {/* Main Content */}
      <div className="flex-1 max-w-3xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t("dev.docs.api.title")}
          </h1>

          {/* Version Selector */}
          <div className="relative">
            <button
              onClick={() => setVersionDropdownOpen(!versionDropdownOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {t("dev.docs.api.version")}
              </span>
              <span className="font-mono text-blue-600 dark:text-blue-400">{selectedVersion}</span>
              {selectedVersionInfo?.current && (
                <span className="px-1.5 py-0.5 text-xs bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 rounded">
                  {t("dev.docs.api.latest")}
                </span>
              )}
              <svg
                className={`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform ${
                  versionDropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {versionDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setVersionDropdownOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-20 max-h-64 overflow-y-auto">
                  {versions.map((v) => (
                    <button
                      key={v.version}
                      onClick={() => {
                        setSelectedVersion(v.version);
                        setVersionDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                        selectedVersion === v.version ? "bg-gray-100 dark:bg-gray-700" : ""
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm text-gray-900 dark:text-white">{v.version}</span>
                        {v.current && (
                          <span className="px-1.5 py-0.5 text-xs bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 rounded">
                            {t("dev.docs.api.latest")}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-gray-400 dark:text-gray-500">{v.date}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <p className="text-gray-600 dark:text-gray-300 mb-8">
          {t("dev.docs.api.description")}
        </p>

        <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <svg
              className="w-5 h-5 text-blue-600 dark:text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="font-semibold text-blue-600 dark:text-blue-400">
              {t("dev.docs.api.packageInfo")}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500 dark:text-gray-400">{t("dev.docs.api.package")}</span>{" "}
              <code className="text-green-600 dark:text-green-400">
                @taco_tsinghua/graphnode-sdk
              </code>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400">{t("dev.docs.api.version")}</span>{" "}
              <code className="text-yellow-600 dark:text-yellow-400">{selectedVersion}</code>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400">{t("dev.docs.api.license")}</span>{" "}
              <span className="text-gray-700 dark:text-gray-300">MIT</span>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400">{t("dev.docs.api.nodeRequirement")}</span>{" "}
              <span className="text-gray-700 dark:text-gray-300">&gt;=18</span>
            </div>
          </div>
        </div>

        {/* Installation */}
        <section id="installation" className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            {t("dev.docs.api.installation")}
          </h2>
          <CodeBlock code={installCode} language="bash" />
        </section>

        {/* Client Initialization */}
        <section id="client-init" className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            {t("dev.docs.api.clientInit")}
          </h2>
          <CodeBlock code={clientInitCode} language="typescript" />
        </section>

        {/* SDK Modules */}
        <section id="sdk-modules" className="mb-4">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            {t("dev.docs.api.sdkModules")}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {t("dev.docs.api.sdkModulesDesc")}
          </p>
        </section>

        {/* User Module */}
        <section
          id="module-me"
          className="mb-10 p-6 bg-gray-100 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
            {t("dev.docs.api.modules.me.title")}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {t("dev.docs.api.modules.me.description")}
          </p>
          <CodeBlock code={meModuleCode} language="typescript" />
        </section>

        {/* AI Chat Module */}
        <section
          id="module-ai"
          className="mb-10 p-6 bg-gray-100 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
            {t("dev.docs.api.modules.ai.title")}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {t("dev.docs.api.modules.ai.description")}
          </p>
          <CodeBlock code={aiModuleCode} language="typescript" />
          <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            <p className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
              {t("dev.docs.api.modules.ai.supportedModels")}
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                <code className="text-blue-600 dark:text-blue-400">openai</code> - {t("dev.docs.api.modules.ai.openai")}
              </li>
              <li>
                <code className="text-blue-600 dark:text-blue-400">claude</code> - {t("dev.docs.api.modules.ai.claude")}
              </li>
              <li>
                <code className="text-blue-600 dark:text-blue-400">gemini</code> - {t("dev.docs.api.modules.ai.gemini")}
              </li>
              <li>
                <code className="text-blue-600 dark:text-blue-400">deepseek</code> - {t("dev.docs.api.modules.ai.deepseek")}
              </li>
            </ul>
          </div>
        </section>

        {/* Conversations Module */}
        <section
          id="module-conversations"
          className="mb-10 p-6 bg-gray-100 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
            {t("dev.docs.api.modules.conversations.title")}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {t("dev.docs.api.modules.conversations.description")}
          </p>
          <CodeBlock code={conversationsModuleCode} language="typescript" />
        </section>

        {/* Graph Module */}
        <section
          id="module-graph"
          className="mb-10 p-6 bg-gray-100 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
            {t("dev.docs.api.modules.graph.title")}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {t("dev.docs.api.modules.graph.description")}
          </p>
          <CodeBlock code={graphModuleCode} language="typescript" />
        </section>

        {/* Notes Module */}
        <section
          id="module-notes"
          className="mb-10 p-6 bg-gray-100 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
            {t("dev.docs.api.modules.notes.title")}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {t("dev.docs.api.modules.notes.description")}
          </p>
          <CodeBlock code={notesModuleCode} language="typescript" />
        </section>

        {/* Sync Module */}
        <section
          id="module-sync"
          className="mb-10 p-6 bg-gray-100 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
            {t("dev.docs.api.modules.sync.title")}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {t("dev.docs.api.modules.sync.description")}
          </p>
          <CodeBlock code={syncModuleCode} language="typescript" />
        </section>

        {/* REST API Endpoints */}
        <section id="rest-api" className="mb-4">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            {t("dev.docs.api.restApi.title")}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {t("dev.docs.api.restApi.description")}{" "}
            <code className="text-blue-600 dark:text-blue-400">https://api.graphnode.com</code>
          </p>
        </section>

        {/* Auth API */}
        <section id="api-auth" className="mb-10">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            {t("dev.docs.api.restApi.auth")}
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-2 px-3 text-gray-700 dark:text-gray-300 font-semibold w-24">
                    {t("dev.docs.api.restApi.method")}
                  </th>
                  <th className="text-left py-2 px-3 text-gray-700 dark:text-gray-300 font-semibold">
                    {t("dev.docs.api.restApi.endpoint")}
                  </th>
                  <th className="text-left py-2 px-3 text-gray-700 dark:text-gray-300 font-semibold">
                    {t("dev.docs.api.restApi.descriptionCol")}
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-500 dark:text-gray-400">
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-2 px-3">
                    <span className="px-2 py-0.5 bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 rounded text-xs">
                      GET
                    </span>
                  </td>
                  <td className="py-2 px-3 font-mono text-xs">/healthz</td>
                  <td className="py-2 px-3">{t("dev.docs.api.restApi.healthCheck")}</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-2 px-3">
                    <span className="px-2 py-0.5 bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 rounded text-xs">
                      GET
                    </span>
                  </td>
                  <td className="py-2 px-3 font-mono text-xs">/auth/google/start</td>
                  <td className="py-2 px-3">{t("dev.docs.api.restApi.googleOAuthStart")}</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-2 px-3">
                    <span className="px-2 py-0.5 bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 rounded text-xs">
                      GET
                    </span>
                  </td>
                  <td className="py-2 px-3 font-mono text-xs">/auth/google/callback</td>
                  <td className="py-2 px-3">{t("dev.docs.api.restApi.oauthCallback")}</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-2 px-3">
                    <span className="px-2 py-0.5 bg-yellow-100 dark:bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 rounded text-xs">
                      POST
                    </span>
                  </td>
                  <td className="py-2 px-3 font-mono text-xs">/auth/logout</td>
                  <td className="py-2 px-3">{t("dev.docs.api.restApi.logout")}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* User & Notifications API */}
        <section id="api-user" className="mb-10">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            {t("dev.docs.api.restApi.userNotifications")}
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-2 px-3 text-gray-700 dark:text-gray-300 font-semibold w-24">
                    {t("dev.docs.api.restApi.method")}
                  </th>
                  <th className="text-left py-2 px-3 text-gray-700 dark:text-gray-300 font-semibold">
                    {t("dev.docs.api.restApi.endpoint")}
                  </th>
                  <th className="text-left py-2 px-3 text-gray-700 dark:text-gray-300 font-semibold">
                    {t("dev.docs.api.restApi.descriptionCol")}
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-500 dark:text-gray-400">
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-2 px-3">
                    <span className="px-2 py-0.5 bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 rounded text-xs">
                      GET
                    </span>
                  </td>
                  <td className="py-2 px-3 font-mono text-xs">/v1/me</td>
                  <td className="py-2 px-3">{t("dev.docs.api.restApi.loginStatus")}</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-2 px-3">
                    <span className="px-2 py-0.5 bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 rounded text-xs">
                      GET
                    </span>
                  </td>
                  <td className="py-2 px-3 font-mono text-xs">/v1/notifications/stream</td>
                  <td className="py-2 px-3">{t("dev.docs.api.restApi.sseNotificationStream")}</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-2 px-3">
                    <span className="px-2 py-0.5 bg-yellow-100 dark:bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 rounded text-xs">
                      POST
                    </span>
                  </td>
                  <td className="py-2 px-3 font-mono text-xs">/v1/notifications/device-token</td>
                  <td className="py-2 px-3">{t("dev.docs.api.restApi.fcmTokenRegister")}</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-2 px-3">
                    <span className="px-2 py-0.5 bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 rounded text-xs">
                      DELETE
                    </span>
                  </td>
                  <td className="py-2 px-3 font-mono text-xs">/v1/notifications/device-token</td>
                  <td className="py-2 px-3">{t("dev.docs.api.restApi.fcmTokenUnregister")}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Conversations API */}
        <section id="api-conversations" className="mb-10">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            {t("dev.docs.api.restApi.conversations")}
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-2 px-3 text-gray-700 dark:text-gray-300 font-semibold w-24">
                    {t("dev.docs.api.restApi.method")}
                  </th>
                  <th className="text-left py-2 px-3 text-gray-700 dark:text-gray-300 font-semibold">
                    {t("dev.docs.api.restApi.endpoint")}
                  </th>
                  <th className="text-left py-2 px-3 text-gray-700 dark:text-gray-300 font-semibold">
                    {t("dev.docs.api.restApi.descriptionCol")}
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-500 dark:text-gray-400">
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-2 px-3">
                    <span className="px-2 py-0.5 bg-yellow-100 dark:bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 rounded text-xs">
                      POST
                    </span>
                  </td>
                  <td className="py-2 px-3 font-mono text-xs">/v1/ai/conversations</td>
                  <td className="py-2 px-3">{t("dev.docs.api.restApi.createConversation")}</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-2 px-3">
                    <span className="px-2 py-0.5 bg-yellow-100 dark:bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 rounded text-xs">
                      POST
                    </span>
                  </td>
                  <td className="py-2 px-3 font-mono text-xs">/v1/ai/conversations/bulk</td>
                  <td className="py-2 px-3">{t("dev.docs.api.restApi.bulkCreateConversation")}</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-2 px-3">
                    <span className="px-2 py-0.5 bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 rounded text-xs">
                      GET
                    </span>
                  </td>
                  <td className="py-2 px-3 font-mono text-xs">/v1/ai/conversations</td>
                  <td className="py-2 px-3">{t("dev.docs.api.restApi.listConversations")}</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-2 px-3">
                    <span className="px-2 py-0.5 bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 rounded text-xs">
                      GET
                    </span>
                  </td>
                  <td className="py-2 px-3 font-mono text-xs">/v1/ai/conversations/:id</td>
                  <td className="py-2 px-3">{t("dev.docs.api.restApi.getConversation")}</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-2 px-3">
                    <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded text-xs">
                      PATCH
                    </span>
                  </td>
                  <td className="py-2 px-3 font-mono text-xs">/v1/ai/conversations/:id</td>
                  <td className="py-2 px-3">{t("dev.docs.api.restApi.updateConversation")}</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-2 px-3">
                    <span className="px-2 py-0.5 bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 rounded text-xs">
                      DELETE
                    </span>
                  </td>
                  <td className="py-2 px-3 font-mono text-xs">/v1/ai/conversations/:id</td>
                  <td className="py-2 px-3">{t("dev.docs.api.restApi.deleteConversation")}</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-2 px-3">
                    <span className="px-2 py-0.5 bg-yellow-100 dark:bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 rounded text-xs">
                      POST
                    </span>
                  </td>
                  <td className="py-2 px-3 font-mono text-xs">/v1/ai/conversations/:id/restore</td>
                  <td className="py-2 px-3">{t("dev.docs.api.restApi.restoreConversation")}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Messages API */}
        <section id="api-messages" className="mb-10">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            {t("dev.docs.api.restApi.messages")}
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-2 px-3 text-gray-700 dark:text-gray-300 font-semibold w-24">
                    {t("dev.docs.api.restApi.method")}
                  </th>
                  <th className="text-left py-2 px-3 text-gray-700 dark:text-gray-300 font-semibold">
                    {t("dev.docs.api.restApi.endpoint")}
                  </th>
                  <th className="text-left py-2 px-3 text-gray-700 dark:text-gray-300 font-semibold">
                    {t("dev.docs.api.restApi.descriptionCol")}
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-500 dark:text-gray-400">
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-2 px-3">
                    <span className="px-2 py-0.5 bg-yellow-100 dark:bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 rounded text-xs">
                      POST
                    </span>
                  </td>
                  <td className="py-2 px-3 font-mono text-xs">/v1/ai/conversations/:id/messages</td>
                  <td className="py-2 px-3">{t("dev.docs.api.restApi.createMessage")}</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-2 px-3">
                    <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded text-xs">
                      PATCH
                    </span>
                  </td>
                  <td className="py-2 px-3 font-mono text-xs">/v1/ai/conversations/:id/messages/:msgId</td>
                  <td className="py-2 px-3">{t("dev.docs.api.restApi.updateMessage")}</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-2 px-3">
                    <span className="px-2 py-0.5 bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 rounded text-xs">
                      DELETE
                    </span>
                  </td>
                  <td className="py-2 px-3 font-mono text-xs">/v1/ai/conversations/:id/messages/:msgId</td>
                  <td className="py-2 px-3">{t("dev.docs.api.restApi.deleteMessage")}</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-2 px-3">
                    <span className="px-2 py-0.5 bg-yellow-100 dark:bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 rounded text-xs">
                      POST
                    </span>
                  </td>
                  <td className="py-2 px-3 font-mono text-xs">/v1/ai/conversations/:id/chat</td>
                  <td className="py-2 px-3">{t("dev.docs.api.restApi.aiChatStreaming")}</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-2 px-3">
                    <span className="px-2 py-0.5 bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 rounded text-xs">
                      GET
                    </span>
                  </td>
                  <td className="py-2 px-3 font-mono text-xs">/v1/ai/files/:key</td>
                  <td className="py-2 px-3">{t("dev.docs.api.restApi.downloadAiFile")}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Graph Nodes API */}
        <section id="api-nodes" className="mb-10">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            {t("dev.docs.api.restApi.graphNodes")}
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-2 px-3 text-gray-700 dark:text-gray-300 font-semibold w-24">
                    {t("dev.docs.api.restApi.method")}
                  </th>
                  <th className="text-left py-2 px-3 text-gray-700 dark:text-gray-300 font-semibold">
                    {t("dev.docs.api.restApi.endpoint")}
                  </th>
                  <th className="text-left py-2 px-3 text-gray-700 dark:text-gray-300 font-semibold">
                    {t("dev.docs.api.restApi.descriptionCol")}
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-500 dark:text-gray-400">
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-2 px-3">
                    <span className="px-2 py-0.5 bg-yellow-100 dark:bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 rounded text-xs">
                      POST
                    </span>
                  </td>
                  <td className="py-2 px-3 font-mono text-xs">/v1/graph/nodes</td>
                  <td className="py-2 px-3">{t("dev.docs.api.restApi.createUpdateNode")}</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-2 px-3">
                    <span className="px-2 py-0.5 bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 rounded text-xs">
                      GET
                    </span>
                  </td>
                  <td className="py-2 px-3 font-mono text-xs">/v1/graph/nodes</td>
                  <td className="py-2 px-3">{t("dev.docs.api.restApi.getAllNodes")}</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-2 px-3">
                    <span className="px-2 py-0.5 bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 rounded text-xs">
                      GET
                    </span>
                  </td>
                  <td className="py-2 px-3 font-mono text-xs">/v1/graph/nodes/:id</td>
                  <td className="py-2 px-3">{t("dev.docs.api.restApi.getNode")}</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-2 px-3">
                    <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded text-xs">
                      PATCH
                    </span>
                  </td>
                  <td className="py-2 px-3 font-mono text-xs">/v1/graph/nodes/:id</td>
                  <td className="py-2 px-3">{t("dev.docs.api.restApi.updateNode")}</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-2 px-3">
                    <span className="px-2 py-0.5 bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 rounded text-xs">
                      DELETE
                    </span>
                  </td>
                  <td className="py-2 px-3 font-mono text-xs">/v1/graph/nodes/:id</td>
                  <td className="py-2 px-3">{t("dev.docs.api.restApi.deleteNode")}</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-2 px-3">
                    <span className="px-2 py-0.5 bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 rounded text-xs">
                      DELETE
                    </span>
                  </td>
                  <td className="py-2 px-3 font-mono text-xs">/v1/graph/nodes/:id/cascade</td>
                  <td className="py-2 px-3">{t("dev.docs.api.restApi.deleteNodeCascade")}</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-2 px-3">
                    <span className="px-2 py-0.5 bg-yellow-100 dark:bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 rounded text-xs">
                      POST
                    </span>
                  </td>
                  <td className="py-2 px-3 font-mono text-xs">/v1/graph/nodes/:id/restore</td>
                  <td className="py-2 px-3">{t("dev.docs.api.restApi.restoreNode")}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Graph Edges API */}
        <section id="api-edges" className="mb-10">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            {t("dev.docs.api.restApi.graphEdges")}
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-2 px-3 text-gray-700 dark:text-gray-300 font-semibold w-24">
                    {t("dev.docs.api.restApi.method")}
                  </th>
                  <th className="text-left py-2 px-3 text-gray-700 dark:text-gray-300 font-semibold">
                    {t("dev.docs.api.restApi.endpoint")}
                  </th>
                  <th className="text-left py-2 px-3 text-gray-700 dark:text-gray-300 font-semibold">
                    {t("dev.docs.api.restApi.descriptionCol")}
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-500 dark:text-gray-400">
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-2 px-3">
                    <span className="px-2 py-0.5 bg-yellow-100 dark:bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 rounded text-xs">
                      POST
                    </span>
                  </td>
                  <td className="py-2 px-3 font-mono text-xs">/v1/graph/edges</td>
                  <td className="py-2 px-3">{t("dev.docs.api.restApi.createUpdateEdge")}</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-2 px-3">
                    <span className="px-2 py-0.5 bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 rounded text-xs">
                      GET
                    </span>
                  </td>
                  <td className="py-2 px-3 font-mono text-xs">/v1/graph/edges</td>
                  <td className="py-2 px-3">{t("dev.docs.api.restApi.getAllEdges")}</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-2 px-3">
                    <span className="px-2 py-0.5 bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 rounded text-xs">
                      DELETE
                    </span>
                  </td>
                  <td className="py-2 px-3 font-mono text-xs">/v1/graph/edges/:id</td>
                  <td className="py-2 px-3">{t("dev.docs.api.restApi.deleteEdge")}</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-2 px-3">
                    <span className="px-2 py-0.5 bg-yellow-100 dark:bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 rounded text-xs">
                      POST
                    </span>
                  </td>
                  <td className="py-2 px-3 font-mono text-xs">/v1/graph/edges/:id/restore</td>
                  <td className="py-2 px-3">{t("dev.docs.api.restApi.restoreEdge")}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Clusters API */}
        <section id="api-clusters" className="mb-10">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            {t("dev.docs.api.restApi.clusters")}
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-2 px-3 text-gray-700 dark:text-gray-300 font-semibold w-24">
                    {t("dev.docs.api.restApi.method")}
                  </th>
                  <th className="text-left py-2 px-3 text-gray-700 dark:text-gray-300 font-semibold">
                    {t("dev.docs.api.restApi.endpoint")}
                  </th>
                  <th className="text-left py-2 px-3 text-gray-700 dark:text-gray-300 font-semibold">
                    {t("dev.docs.api.restApi.descriptionCol")}
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-500 dark:text-gray-400">
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-2 px-3">
                    <span className="px-2 py-0.5 bg-yellow-100 dark:bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 rounded text-xs">
                      POST
                    </span>
                  </td>
                  <td className="py-2 px-3 font-mono text-xs">/v1/graph/clusters</td>
                  <td className="py-2 px-3">{t("dev.docs.api.restApi.createUpdateCluster")}</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-2 px-3">
                    <span className="px-2 py-0.5 bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 rounded text-xs">
                      GET
                    </span>
                  </td>
                  <td className="py-2 px-3 font-mono text-xs">/v1/graph/clusters</td>
                  <td className="py-2 px-3">{t("dev.docs.api.restApi.getAllClusters")}</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-2 px-3">
                    <span className="px-2 py-0.5 bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 rounded text-xs">
                      GET
                    </span>
                  </td>
                  <td className="py-2 px-3 font-mono text-xs">/v1/graph/clusters/:id</td>
                  <td className="py-2 px-3">{t("dev.docs.api.restApi.getCluster")}</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-2 px-3">
                    <span className="px-2 py-0.5 bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 rounded text-xs">
                      DELETE
                    </span>
                  </td>
                  <td className="py-2 px-3 font-mono text-xs">/v1/graph/clusters/:id</td>
                  <td className="py-2 px-3">{t("dev.docs.api.restApi.deleteCluster")}</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-2 px-3">
                    <span className="px-2 py-0.5 bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 rounded text-xs">
                      DELETE
                    </span>
                  </td>
                  <td className="py-2 px-3 font-mono text-xs">/v1/graph/clusters/:id/cascade</td>
                  <td className="py-2 px-3">{t("dev.docs.api.restApi.deleteClusterCascade")}</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-2 px-3">
                    <span className="px-2 py-0.5 bg-yellow-100 dark:bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 rounded text-xs">
                      POST
                    </span>
                  </td>
                  <td className="py-2 px-3 font-mono text-xs">/v1/graph/clusters/:id/restore</td>
                  <td className="py-2 px-3">{t("dev.docs.api.restApi.restoreCluster")}</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-2 px-3">
                    <span className="px-2 py-0.5 bg-yellow-100 dark:bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 rounded text-xs">
                      POST
                    </span>
                  </td>
                  <td className="py-2 px-3 font-mono text-xs">/v1/graph/subclusters</td>
                  <td className="py-2 px-3">{t("dev.docs.api.restApi.createUpdateSubcluster")}</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-2 px-3">
                    <span className="px-2 py-0.5 bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 rounded text-xs">
                      GET
                    </span>
                  </td>
                  <td className="py-2 px-3 font-mono text-xs">/v1/graph/subclusters</td>
                  <td className="py-2 px-3">{t("dev.docs.api.restApi.getSubclusters")}</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-2 px-3">
                    <span className="px-2 py-0.5 bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 rounded text-xs">
                      GET
                    </span>
                  </td>
                  <td className="py-2 px-3 font-mono text-xs">/v1/graph/stats</td>
                  <td className="py-2 px-3">{t("dev.docs.api.restApi.graphStats")}</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-2 px-3">
                    <span className="px-2 py-0.5 bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 rounded text-xs">
                      GET
                    </span>
                  </td>
                  <td className="py-2 px-3 font-mono text-xs">/v1/graph/snapshot</td>
                  <td className="py-2 px-3">{t("dev.docs.api.restApi.getSnapshot")}</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-2 px-3">
                    <span className="px-2 py-0.5 bg-yellow-100 dark:bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 rounded text-xs">
                      POST
                    </span>
                  </td>
                  <td className="py-2 px-3 font-mono text-xs">/v1/graph/snapshot</td>
                  <td className="py-2 px-3">{t("dev.docs.api.restApi.saveSnapshot")}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Notes & Folders API */}
        <section id="api-notes" className="mb-10">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            {t("dev.docs.api.restApi.notesFolders")}
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-2 px-3 text-gray-700 dark:text-gray-300 font-semibold w-24">
                    {t("dev.docs.api.restApi.method")}
                  </th>
                  <th className="text-left py-2 px-3 text-gray-700 dark:text-gray-300 font-semibold">
                    {t("dev.docs.api.restApi.endpoint")}
                  </th>
                  <th className="text-left py-2 px-3 text-gray-700 dark:text-gray-300 font-semibold">
                    {t("dev.docs.api.restApi.descriptionCol")}
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-500 dark:text-gray-400">
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-2 px-3">
                    <span className="px-2 py-0.5 bg-yellow-100 dark:bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 rounded text-xs">
                      POST
                    </span>
                  </td>
                  <td className="py-2 px-3 font-mono text-xs">/v1/notes</td>
                  <td className="py-2 px-3">{t("dev.docs.api.restApi.createNote")}</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-2 px-3">
                    <span className="px-2 py-0.5 bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 rounded text-xs">
                      GET
                    </span>
                  </td>
                  <td className="py-2 px-3 font-mono text-xs">/v1/notes</td>
                  <td className="py-2 px-3">{t("dev.docs.api.restApi.listNotes")}</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-2 px-3">
                    <span className="px-2 py-0.5 bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 rounded text-xs">
                      GET
                    </span>
                  </td>
                  <td className="py-2 px-3 font-mono text-xs">/v1/notes/:id</td>
                  <td className="py-2 px-3">{t("dev.docs.api.restApi.getNote")}</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-2 px-3">
                    <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded text-xs">
                      PATCH
                    </span>
                  </td>
                  <td className="py-2 px-3 font-mono text-xs">/v1/notes/:id</td>
                  <td className="py-2 px-3">{t("dev.docs.api.restApi.updateNote")}</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-2 px-3">
                    <span className="px-2 py-0.5 bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 rounded text-xs">
                      DELETE
                    </span>
                  </td>
                  <td className="py-2 px-3 font-mono text-xs">/v1/notes/:id</td>
                  <td className="py-2 px-3">{t("dev.docs.api.restApi.deleteNote")}</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-2 px-3">
                    <span className="px-2 py-0.5 bg-yellow-100 dark:bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 rounded text-xs">
                      POST
                    </span>
                  </td>
                  <td className="py-2 px-3 font-mono text-xs">/v1/notes/:id/restore</td>
                  <td className="py-2 px-3">{t("dev.docs.api.restApi.restoreNote")}</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-2 px-3">
                    <span className="px-2 py-0.5 bg-yellow-100 dark:bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 rounded text-xs">
                      POST
                    </span>
                  </td>
                  <td className="py-2 px-3 font-mono text-xs">/v1/folders</td>
                  <td className="py-2 px-3">{t("dev.docs.api.restApi.createFolder")}</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-2 px-3">
                    <span className="px-2 py-0.5 bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 rounded text-xs">
                      GET
                    </span>
                  </td>
                  <td className="py-2 px-3 font-mono text-xs">/v1/folders</td>
                  <td className="py-2 px-3">{t("dev.docs.api.restApi.listFolders")}</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-2 px-3">
                    <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded text-xs">
                      PATCH
                    </span>
                  </td>
                  <td className="py-2 px-3 font-mono text-xs">/v1/folders/:id</td>
                  <td className="py-2 px-3">{t("dev.docs.api.restApi.updateFolder")}</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-2 px-3">
                    <span className="px-2 py-0.5 bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 rounded text-xs">
                      DELETE
                    </span>
                  </td>
                  <td className="py-2 px-3 font-mono text-xs">/v1/folders/:id</td>
                  <td className="py-2 px-3">{t("dev.docs.api.restApi.deleteFolder")}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Sync API */}
        <section id="api-sync" className="mb-10">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            {t("dev.docs.api.restApi.sync")}
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-2 px-3 text-gray-700 dark:text-gray-300 font-semibold w-24">
                    {t("dev.docs.api.restApi.method")}
                  </th>
                  <th className="text-left py-2 px-3 text-gray-700 dark:text-gray-300 font-semibold">
                    {t("dev.docs.api.restApi.endpoint")}
                  </th>
                  <th className="text-left py-2 px-3 text-gray-700 dark:text-gray-300 font-semibold">
                    {t("dev.docs.api.restApi.descriptionCol")}
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-500 dark:text-gray-400">
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-2 px-3">
                    <span className="px-2 py-0.5 bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 rounded text-xs">
                      GET
                    </span>
                  </td>
                  <td className="py-2 px-3 font-mono text-xs">/v1/sync/pull</td>
                  <td className="py-2 px-3">{t("dev.docs.api.restApi.pullChanges")}</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-2 px-3">
                    <span className="px-2 py-0.5 bg-yellow-100 dark:bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 rounded text-xs">
                      POST
                    </span>
                  </td>
                  <td className="py-2 px-3 font-mono text-xs">/v1/sync/push</td>
                  <td className="py-2 px-3">{t("dev.docs.api.restApi.pushChanges")}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* External Resources */}
        <section className="mb-10 p-4 bg-gray-100 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
            {t("dev.docs.api.externalResources")}
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="https://www.npmjs.com/package/@taco_tsinghua/graphnode-sdk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M0 7.334v8h6.666v1.332H12v-1.332h12v-8H0zm6.666 6.664H5.334v-4H3.999v4H1.335V8.667h5.331v5.331zm4 0v1.336H8.001V8.667h5.334v5.332h-2.669v-.001zm12.001 0h-1.33v-4h-1.336v4h-1.335v-4h-1.33v4h-2.671V8.667h8.002v5.331z" />
                </svg>
                {t("dev.docs.api.npmPackage")}
              </a>
            </li>
            <li>
              <a
                href="https://github.com/TACO-FOR-ALL/GraphNode_BE"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                {t("dev.docs.api.githubRepo")}
              </a>
            </li>
            <li>
              <a
                href="https://taco-for-all.github.io/GraphNode_BE/api/openapi.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                {t("dev.docs.api.openApiDocs")}
              </a>
            </li>
          </ul>
        </section>
      </div>

      {/* Table of Contents - Right Sidebar */}
      <TableOfContents items={tocItems} titleKey="dev.docs.api.toc" scrollable />
    </div>
  );
}
