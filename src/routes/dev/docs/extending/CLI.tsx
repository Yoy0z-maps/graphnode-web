import { useTranslation } from "react-i18next";
import CodeBlock from "@/components/dev/CodeBlock";
import TableOfContents, { type TocItem } from "@/components/dev/TableOfContents";

const tocItems: TocItem[] = [
  { id: "overview", titleKey: "dev.docs.cli.overview.title", level: 2 },
  { id: "quickstart", titleKey: "dev.docs.cli.quickstart.title", level: 2 },
  { id: "install", titleKey: "dev.docs.cli.install.title", level: 2 },
  { id: "distribution", titleKey: "dev.docs.cli.distribution.title", level: 2 },
  { id: "commands", titleKey: "dev.docs.cli.commands.title", level: 2 },
  { id: "cmd-help", titleKey: "dev.docs.cli.commands.help", level: 3 },
  { id: "cmd-doctor", titleKey: "dev.docs.cli.commands.doctor", level: 3 },
  { id: "cmd-note", titleKey: "dev.docs.cli.commands.note", level: 3 },
  { id: "cmd-demo", titleKey: "dev.docs.cli.commands.demo", level: 3 },
];

export default function CLI() {
  const { t } = useTranslation();

  const quickstartCode = `cd /path/to/GraphNode_Front
npm run graphnode -- help
npm run graphnode -- doctor
npm run graphnode -- sqlite status
npm run graphnode -- sqlite notes
npm run graphnode -- note add "First note"
npm run graphnode -- note list
npm run graphnode -- note path "first"
npm run graphnode -- note search "first"
npm run graphnode -- note show "first"
npm run graphnode -- note open "first"
npm run graphnode -- note delete "first"
npm run graphnode -- file-note list`;

  const installCode = `cd /path/to/GraphNode_Front
npm link --workspace @graphnode/cli

graphnode help`;

  const distributionCode = `# npm package
npm install -g @graphnode/cli
graphnode help

# Before publish
cd /path/to/GraphNode_Front
npm run graphnode:release-check

# Homebrew
brew install graphnode
graphnode help`;

  const helpOutput = `GraphNode CLI v0.1.0

Usage:
  graphnode <command> [options]

Commands:
  help                 Show this help message
  version              Show CLI version
  doctor               Show local runtime information
  demo                 Run a small demo workflow
  sqlite status        Show SQLite bootstrap and note count
  sqlite notes         List notes stored in SQLite
  note add <title>     Create a SQLite-backed note
  note list            List SQLite notes
  note path <query>    Print the resolved SQLite note id
  note show <query>    Print a SQLite note by id/title/content match
  note search <query>  Search SQLite notes
  note open <query>    Open a temp markdown preview for a SQLite note
  note delete <query>  Soft-delete a SQLite note
  file-note list       List legacy file-backed CLI notes
  file-note show <q>   Print a legacy file-backed note

Examples:
  graphnode doctor
  graphnode sqlite status
  graphnode sqlite notes
  graphnode note add "First note"
  graphnode note path first-note
  graphnode note show first-note
  graphnode note search note
  graphnode note open first-note
  graphnode note delete first-note
  graphnode note list
  graphnode file-note list`;

  const doctorOutput = `GraphNode CLI doctor
Platform: darwin
Node: v20.11.0
Home: /Users/yourname
Working directory: /path/to/project
GraphNode home: /Users/yourname/.graphnode
Notes directory: /Users/yourname/.graphnode/cli/notes`;

  const noteAddCode = `# Create a new note
graphnode note add "My Research Notes"
# Output: Saved SQLite note: cli-1714978123456`;

  const noteListCode = `# List all notes
graphnode note list
# Output:
# 1. My Research Notes (cli-1714978123456)
# 2. Another Note (cli-1714978456789)`;

  const demoCode = `graphnode demo
# Output:
# GraphNode CLI demo
# 1. Create notes from terminal
# 2. Keep note files in a shared GraphNode home directory
# 3. Inspect SQLite startup sync state from the same CLI`;

  return (
    <div className="flex gap-24">
      {/* Main Content */}
      <div className="flex-1 max-w-3xl">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
          {t("dev.docs.cli.title")}
        </h1>

        <p className="text-gray-600 dark:text-gray-300 mb-8">
          {t("dev.docs.cli.description")}
        </p>

        {/* Overview */}
        <section id="overview" className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            {t("dev.docs.cli.overview.title")}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {t("dev.docs.cli.overview.description")}
          </p>
          <div className="grid grid-cols-2 gap-4">
            {(["feature1", "feature2", "feature3", "feature4"] as const).map((key) => (
              <div
                key={key}
                className="p-4 bg-gray-100 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700"
              >
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {t(`dev.docs.cli.overview.${key}`)}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Start */}
        <section id="quickstart" className="mb-10 p-6 bg-gray-100 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            {t("dev.docs.cli.quickstart.title")}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {t("dev.docs.cli.quickstart.description")}
          </p>
          <CodeBlock code={quickstartCode} language="bash" />
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
            {t("dev.docs.cli.quickstart.note")}
          </p>
        </section>

        {/* Global Install */}
        <section id="install" className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            {t("dev.docs.cli.install.title")}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {t("dev.docs.cli.install.description")}
          </p>
          <CodeBlock code={installCode} language="bash" />
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
            {t("dev.docs.cli.install.note")}
          </p>
        </section>

        <section id="distribution" className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            {t("dev.docs.cli.distribution.title")}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {t("dev.docs.cli.distribution.description")}
          </p>
          <CodeBlock code={distributionCode} language="bash" />
          <div className="mt-4 grid grid-cols-1 gap-3">
            {(["option1", "option2", "option3"] as const).map((key) => (
              <div
                key={key}
                className="p-4 bg-gray-100 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700"
              >
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {t(`dev.docs.cli.distribution.${key}`)}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Commands */}
        <section id="commands" className="mb-4">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            {t("dev.docs.cli.commands.title")}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {t("dev.docs.cli.commands.description")}
          </p>
        </section>

        {/* help */}
        <section id="cmd-help" className="mb-10 p-6 bg-gray-100 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white font-mono">
            graphnode help
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {t("dev.docs.cli.commands.helpDesc")}
          </p>
          <CodeBlock code={helpOutput} language="bash" />
        </section>

        {/* doctor */}
        <section id="cmd-doctor" className="mb-10 p-6 bg-gray-100 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white font-mono">
            graphnode doctor
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {t("dev.docs.cli.commands.doctorDesc")}
          </p>
          <CodeBlock code={doctorOutput} language="bash" />
        </section>

        {/* note */}
        <section id="cmd-note" className="mb-10 p-6 bg-gray-100 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white font-mono">
            graphnode note
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {t("dev.docs.cli.commands.noteDesc")}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            {t("dev.docs.cli.commands.noteQuery")}
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-2 font-semibold text-sm">
            {t("dev.docs.cli.commands.noteAdd")}
          </p>
          <CodeBlock code={noteAddCode} language="bash" />
          <p className="text-gray-600 dark:text-gray-300 mb-2 mt-6 font-semibold text-sm">
            {t("dev.docs.cli.commands.noteList")}
          </p>
          <CodeBlock code={noteListCode} language="bash" />
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            {t("dev.docs.cli.commands.noteStorage")}
          </p>
        </section>

        {/* demo */}
        <section id="cmd-demo" className="mb-10 p-6 bg-gray-100 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white font-mono">
            graphnode demo
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {t("dev.docs.cli.commands.demoDesc")}
          </p>
          <CodeBlock code={demoCode} language="bash" />
        </section>
      </div>

      {/* Table of Contents */}
      <TableOfContents items={tocItems} titleKey="dev.docs.cli.toc" />
    </div>
  );
}
