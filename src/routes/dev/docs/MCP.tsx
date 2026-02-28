import { useTranslation } from "react-i18next";
import CodeBlock from "@/components/dev/CodeBlock";
import TableOfContents, { type TocItem } from "@/components/dev/TableOfContents";

const tocItems: TocItem[] = [
  { id: "custom-mcp", titleKey: "dev.docs.mcp.customMcp.title", level: 2 },
  { id: "add-method", titleKey: "dev.docs.mcp.addMethod.title", level: 2 },
  { id: "examples", titleKey: "dev.docs.mcp.examples.title", level: 2 },
  { id: "example-github", titleKey: "dev.docs.mcp.github.title", level: 3 },
  { id: "example-sqlite", titleKey: "dev.docs.mcp.sqlite.title", level: 3 },
  { id: "example-puppeteer", titleKey: "dev.docs.mcp.puppeteer.title", level: 3 },
  { id: "server-list", titleKey: "dev.docs.mcp.serverList.title", level: 2 },
];

export default function MCP() {
  const { t } = useTranslation();

  const setupCode = `mkdir my-mcp-server
cd my-mcp-server
npm init -y
npm install @modelcontextprotocol/sdk`;

  const indexJsCode = `#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new Server(
  { name: "my-custom-server", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

// Custom tool definition
server.setRequestHandler("tools/list", async () => ({
  tools: [
    {
      name: "greet",
      description: "Say hello to someone",
      inputSchema: {
        type: "object",
        properties: {
          name: { type: "string", description: "Name to greet" }
        },
        required: ["name"]
      }
    }
  ]
}));

// Tool execution handler
server.setRequestHandler("tools/call", async (request) => {
  if (request.params.name === "greet") {
    const name = request.params.arguments.name;
    return {
      content: [{ type: "text", text: \`Hello, \${name}! Nice to meet you.\` }]
    };
  }
  throw new Error("Unknown tool");
});

// Start server
const transport = new StdioServerTransport();
await server.connect(transport);`;

  const packageJsonCode = `{
  "name": "my-mcp-server",
  "version": "1.0.0",
  "type": "module",
  "bin": {
    "my-mcp-server": "./index.js"
  }
}`;

  const customServerRegisterCode = `{
  "mcp": [
    {
      "name": "My Custom Server",
      "command": "node",
      "args": "/absolute/path/my-mcp-server/index.js",
      "env": {}
    }
  ]
}`;

  const githubMcpCode = `{
  "mcp": [
    {
      "name": "GitHub",
      "command": "npx",
      "args": "-y @modelcontextprotocol/server-github",
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_xxxxxxxxxxxxxxxxxxxx"
      }
    }
  ]
}`;

  const sqliteMcpCode = `{
  "mcp": [
    {
      "name": "My Database",
      "command": "npx",
      "args": "-y @modelcontextprotocol/server-sqlite --db-path /path/to/mydata.db",
      "env": {}
    }
  ]
}`;

  const puppeteerMcpCode = `{
  "mcp": [
    {
      "name": "Puppeteer",
      "command": "npx",
      "args": "-y @modelcontextprotocol/server-puppeteer",
      "env": {}
    }
  ]
}`;

  return (
    <div className="flex gap-24">
      {/* Main Content */}
      <div className="flex-1 max-w-3xl">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
          {t("dev.docs.mcp.title")}
        </h1>

        <p className="text-gray-600 dark:text-gray-300 mb-8">
          {t("dev.docs.mcp.description")}
        </p>

        {/* Custom MCP Server */}
        <section id="custom-mcp" className="mb-10 p-6 bg-gray-100 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            {t("dev.docs.mcp.customMcp.title")}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {t("dev.docs.mcp.customMcp.description")}
          </p>

          <CodeBlock code={setupCode} language="bash" />

          <p className="text-gray-600 dark:text-gray-300 mb-2 mt-6 font-semibold">
            {t("dev.docs.mcp.customMcp.indexJs")}
          </p>
          <CodeBlock code={indexJsCode} language="javascript" />

          <p className="text-gray-600 dark:text-gray-300 mb-2 mt-6 font-semibold">
            {t("dev.docs.mcp.customMcp.packageJson")}
          </p>
          <CodeBlock code={packageJsonCode} language="json" />

          <p className="text-gray-600 dark:text-gray-300 mb-2 mt-6 font-semibold">
            {t("dev.docs.mcp.customMcp.register")}
          </p>
          <CodeBlock code={customServerRegisterCode} language="json" />
        </section>

        {/* Add Method */}
        <section id="add-method" className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            {t("dev.docs.mcp.addMethod.title")}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {t("dev.docs.mcp.addMethod.description")}
          </p>
        </section>

        {/* Examples */}
        <section id="examples" className="mb-4">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            {t("dev.docs.mcp.examples.title")}
          </h2>
        </section>

        {/* GitHub MCP */}
        <section id="example-github" className="mb-10 p-6 bg-gray-100 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
            {t("dev.docs.mcp.github.title")}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {t("dev.docs.mcp.github.description")}
          </p>

          <CodeBlock code={githubMcpCode} language="json" />

          <div className="text-gray-500 dark:text-gray-400 text-sm mt-4">
            <p className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
              {t("dev.docs.mcp.github.tokenTitle")}
            </p>
            <ol className="list-decimal list-inside space-y-1">
              <li>{t("dev.docs.mcp.github.step1")}</li>
              <li>{t("dev.docs.mcp.github.step2")}</li>
              <li>{t("dev.docs.mcp.github.step3")}</li>
            </ol>
          </div>
        </section>

        {/* SQLite MCP */}
        <section id="example-sqlite" className="mb-10 p-6 bg-gray-100 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
            {t("dev.docs.mcp.sqlite.title")}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {t("dev.docs.mcp.sqlite.description")}
          </p>

          <CodeBlock code={sqliteMcpCode} language="json" />
        </section>

        {/* Puppeteer MCP */}
        <section id="example-puppeteer" className="mb-10 p-6 bg-gray-100 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
            {t("dev.docs.mcp.puppeteer.title")}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {t("dev.docs.mcp.puppeteer.description")}
          </p>

          <CodeBlock code={puppeteerMcpCode} language="json" />
        </section>

        {/* Server List */}
        <section id="server-list" className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            {t("dev.docs.mcp.serverList.title")}
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 text-gray-700 dark:text-gray-300 font-semibold">
                    {t("dev.docs.mcp.serverList.server")}
                  </th>
                  <th className="text-left py-3 px-4 text-gray-700 dark:text-gray-300 font-semibold">
                    {t("dev.docs.mcp.serverList.package")}
                  </th>
                  <th className="text-left py-3 px-4 text-gray-700 dark:text-gray-300 font-semibold">
                    {t("dev.docs.mcp.serverList.descriptionCol")}
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-500 dark:text-gray-400">
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-3 px-4">Filesystem</td>
                  <td className="py-3 px-4 font-mono text-xs text-blue-600 dark:text-blue-400">@modelcontextprotocol/server-filesystem</td>
                  <td className="py-3 px-4">{t("dev.docs.mcp.serverList.filesystem")}</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-3 px-4">GitHub</td>
                  <td className="py-3 px-4 font-mono text-xs text-blue-600 dark:text-blue-400">@modelcontextprotocol/server-github</td>
                  <td className="py-3 px-4">{t("dev.docs.mcp.serverList.githubApi")}</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-3 px-4">GitLab</td>
                  <td className="py-3 px-4 font-mono text-xs text-blue-600 dark:text-blue-400">@modelcontextprotocol/server-gitlab</td>
                  <td className="py-3 px-4">{t("dev.docs.mcp.serverList.gitlabApi")}</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-3 px-4">Slack</td>
                  <td className="py-3 px-4 font-mono text-xs text-blue-600 dark:text-blue-400">@modelcontextprotocol/server-slack</td>
                  <td className="py-3 px-4">{t("dev.docs.mcp.serverList.slack")}</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-3 px-4">Google Drive</td>
                  <td className="py-3 px-4 font-mono text-xs text-blue-600 dark:text-blue-400">@modelcontextprotocol/server-gdrive</td>
                  <td className="py-3 px-4">{t("dev.docs.mcp.serverList.gdrive")}</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-3 px-4">PostgreSQL</td>
                  <td className="py-3 px-4 font-mono text-xs text-blue-600 dark:text-blue-400">@modelcontextprotocol/server-postgres</td>
                  <td className="py-3 px-4">{t("dev.docs.mcp.serverList.postgres")}</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-3 px-4">SQLite</td>
                  <td className="py-3 px-4 font-mono text-xs text-blue-600 dark:text-blue-400">@modelcontextprotocol/server-sqlite</td>
                  <td className="py-3 px-4">{t("dev.docs.mcp.serverList.sqliteDb")}</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-3 px-4">Memory</td>
                  <td className="py-3 px-4 font-mono text-xs text-blue-600 dark:text-blue-400">@modelcontextprotocol/server-memory</td>
                  <td className="py-3 px-4">{t("dev.docs.mcp.serverList.memory")}</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-3 px-4">Brave Search</td>
                  <td className="py-3 px-4 font-mono text-xs text-blue-600 dark:text-blue-400">@modelcontextprotocol/server-brave-search</td>
                  <td className="py-3 px-4">{t("dev.docs.mcp.serverList.braveSearch")}</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-3 px-4">Puppeteer</td>
                  <td className="py-3 px-4 font-mono text-xs text-blue-600 dark:text-blue-400">@modelcontextprotocol/server-puppeteer</td>
                  <td className="py-3 px-4">{t("dev.docs.mcp.serverList.puppeteerDesc")}</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-3 px-4">Fetch</td>
                  <td className="py-3 px-4 font-mono text-xs text-blue-600 dark:text-blue-400">@modelcontextprotocol/server-fetch</td>
                  <td className="py-3 px-4">{t("dev.docs.mcp.serverList.fetch")}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-gray-500 dark:text-gray-400 text-sm">
            {t("dev.docs.mcp.serverList.fullList")}{" "}
            <a
              href="https://github.com/modelcontextprotocol/servers"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              https://github.com/modelcontextprotocol/servers
            </a>
          </p>
        </section>
      </div>

      {/* Table of Contents - Right Sidebar */}
      <TableOfContents items={tocItems} titleKey="dev.docs.mcp.toc" />
    </div>
  );
}
