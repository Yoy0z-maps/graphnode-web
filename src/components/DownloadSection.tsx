import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { motion, useInView } from "motion/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Lottie from "lottie-react";
import Footer from "./Footer";
import appleIcon from "../assets/images/apple.png";
import androidIcon from "../assets/images/android.svg";
import windowsIcon from "../assets/images/windows.png";
import linuxIcon from "../assets/images/linux.png";
import logo from "../assets/icons/logo.svg";
import welcomeLottie from "../assets/lottie/welcome.json";

const featureKeys = [
  {
    key: "markdownNote",
    icon: "Notebook",
    accent: "from-cyan-400/30 to-sky-500/10",
  },
  {
    key: "aiChat",
    icon: "AI Layer",
    accent: "from-fuchsia-400/30 to-violet-500/10",
  },
  {
    key: "graphVisualization",
    icon: "Graph View",
    accent: "from-blue-400/30 to-indigo-500/10",
  },
  {
    key: "smartSearch",
    icon: "Smart Find",
    accent: "from-emerald-400/30 to-teal-500/10",
  },
  {
    key: "agent",
    icon: "Agent Flow",
    accent: "from-amber-300/30 to-orange-500/10",
  },
  { key: "sync", icon: "Live Sync", accent: "from-pink-300/30 to-rose-500/10" },
] as const;

const productSpotlights = [
  {
    id: "visualize",
    accent: "from-cyan-400/20 via-sky-500/10 to-transparent",
  },
  {
    id: "microscope",
    accent: "from-fuchsia-400/20 via-violet-500/10 to-transparent",
  },
  {
    id: "agent",
    accent: "from-amber-300/20 via-orange-500/10 to-transparent",
  },
  {
    id: "search-sync",
    accent: "from-emerald-400/20 via-teal-500/10 to-transparent",
  },
] as const;

type SpotlightId = (typeof productSpotlights)[number]["id"];
type PreviewTab = "home" | "chat" | "notes" | "visualize";

const previewNavItems = [
  { id: "chat" as const, label: "Chat" },
  { id: "notes" as const, label: "Notes" },
  { id: "visualize" as const, label: "Graph" },
] as const;

const orbitingIcons = [
  {
    id: "brand",
    kind: "logo" as const,
    symbol: "",
    className: "left-4 top-8 sm:left-4 sm:top-10",
  },
  {
    id: "spark",
    kind: "symbol" as const,
    symbol: "✦",
    className: "right-2 top-12 sm:right-0 sm:top-16",
  },
  {
    id: "link",
    kind: "symbol" as const,
    symbol: "⌘",
    className: "left-0 bottom-24 sm:left-0 sm:bottom-28",
  },
  {
    id: "agent",
    kind: "symbol" as const,
    symbol: "◈",
    className: "right-6 bottom-18 sm:right-8 sm:bottom-20",
  },
  {
    id: "graph",
    kind: "symbol" as const,
    symbol: "◎",
    className: "left-18 -top-2 sm:left-20 sm:-top-3",
  },
  {
    id: "node",
    kind: "symbol" as const,
    symbol: "✳",
    className: "right-14 -bottom-2 sm:right-16 sm:-bottom-4",
  },
] as const;

// Scatter positions (inside the app frame) that orbiting icons start from before flying to their positions
const orbitingIconScatter = [
  { dx: 340, dy: 90, initR: -22, floatY: -14, floatR: -18, delay: 0.05 },
  { dx: -330, dy: 80, initR: 20, floatY: 16, floatR: 22, delay: 0.12 },
  { dx: 340, dy: -95, initR: 28, floatY: -12, floatR: -20, delay: 0.19 },
  { dx: -310, dy: -90, initR: -24, floatY: 14, floatR: 18, delay: 0.26 },
  { dx: 270, dy: 160, initR: 16, floatY: -16, floatR: -14, delay: 0.08 },
  { dx: -270, dy: -130, initR: -18, floatY: 18, floatR: 16, delay: 0.15 },
] as const;

function PreviewNavIcon({ id, active }: { id: PreviewTab; active: boolean }) {
  const stroke = active ? "#dff7ff" : "#6b7280";

  if (id === "home") {
    return (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M2.6665 6.66732L7.52842 2.61572C7.80694 2.38362 8.19339 2.38362 8.47192 2.61572L13.3338 6.66732V12.6673C13.3338 13.4037 12.7369 14.0007 12.0005 14.0007H4.00049C3.26411 14.0007 2.6665 13.4037 2.6665 12.6673V6.66732Z"
          stroke={stroke}
          strokeWidth="1.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.3335 14.0007V9.33398H9.66683V14.0007"
          stroke={stroke}
          strokeWidth="1.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (id === "chat") {
    return (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M3.3335 8.00065H12.6668M8.00016 3.33398V12.6673"
          stroke={stroke}
          strokeWidth="1.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (id === "notes") {
    return (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M8.33317 14.6673H11.9998C12.3535 14.6673 12.6926 14.5268 12.9426 14.2768C13.1927 14.0267 13.3332 13.6876 13.3332 13.334V4.66732L9.99984 1.33398H3.99984C3.64622 1.33398 3.30708 1.47446 3.05703 1.72451C2.80698 1.97456 2.6665 2.3137 2.6665 2.66732V9.00065"
          stroke={stroke}
          strokeWidth="1.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.33317 1.33398V4.00065C9.33317 4.35427 9.47365 4.69341 9.7237 4.94346C9.97374 5.19351 10.3129 5.33398 10.6665 5.33398H13.3332"
          stroke={stroke}
          strokeWidth="1.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5.72673 9.00732L10.2801 11.6607M10.2734 4.34066L5.72673 6.99399M14 3.33398C14 4.43855 13.1046 5.33398 12 5.33398C10.8954 5.33398 10 4.43855 10 3.33398C10 2.22941 10.8954 1.33398 12 1.33398C13.1046 1.33398 14 2.22941 14 3.33398ZM6 8.00065C6 9.10522 5.10457 10.0007 4 10.0007C2.89543 10.0007 2 9.10522 2 8.00065C2 6.89608 2.89543 6.00065 4 6.00065C5.10457 6.00065 6 6.89608 6 8.00065ZM14 12.6673C14 13.7719 13.1046 14.6673 12 14.6673C10.8954 14.6673 10 13.7719 10 12.6673C10 11.5627 10.8954 10.6673 12 10.6673C13.1046 10.6673 14 11.5627 14 12.6673Z"
        stroke={stroke}
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M8 3.33398V12.6673M3.3335 8.00065H12.6668"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Scatter offsets for sidebar icons before they fly into position
// Relative to each icon's natural position in the 45px sidebar
// Values stay within the preview frame (~900px wide, 620px tall)
const sidebarIconScatter = [
  { id: "home", x: 360, y: 200, rotate: 12, scale: 2.4, delay: 0 },
  { id: "chat", x: 500, y: 80, rotate: -8, scale: 2.2, delay: 0.1 },
  { id: "notes", x: 290, y: 310, rotate: 15, scale: 2.6, delay: 0.18 },
  { id: "graph", x: 460, y: 230, rotate: -12, scale: 2.3, delay: 0.26 },
] as const;

export default function DownloadSection() {
  const { t } = useTranslation();
  // Trigger fires when ≥50% of the preview outer container is visible
  const triggerRef = useRef<HTMLDivElement>(null);
  const isPreviewInView = useInView(triggerRef, { once: true, amount: 0 });
  const [selectedSpotlight, setSelectedSpotlight] = useState<SpotlightId>(
    productSpotlights[0].id,
  );
  const [previewTab, setPreviewTab] = useState<PreviewTab>("home");
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [expandedFolderIds, setExpandedFolderIds] = useState<string[]>([
    "ideas",
    "references",
    "books",
    "philosophy",
    "tools",
    "research",
    "product",
  ]);

  const workflowCards = [
    {
      id: "capture",
      title: t("download.workflow.capture.title", { defaultValue: "Capture" }),
      text: t("download.workflow.capture.text", {
        defaultValue:
          "Ideas, notes, references, and AI conversations stay in one graph instead of scattering across apps.",
      }),
    },
    {
      id: "connect",
      title: t("download.workflow.connect.title", { defaultValue: "Connect" }),
      text: t("download.workflow.connect.text", {
        defaultValue:
          "Link documents and conversations into a visible structure so relationships become easier to explore.",
      }),
    },
    {
      id: "execute",
      title: t("download.workflow.execute.title", { defaultValue: "Execute" }),
      text: t("download.workflow.execute.text", {
        defaultValue:
          "Turn context into actions with AI agents, fast retrieval, and a workspace that feels alive while you use it.",
      }),
    },
  ];

  const spotlightContent: Record<
    SpotlightId,
    { label: string; title: string; description: string; points: string[] }
  > = {
    visualize: {
      label: t("download.productProof.spotlights.visualize.label", {
        defaultValue: "Visualize",
      }),
      title: t("download.productProof.spotlights.visualize.title", {
        defaultValue: "2D/3D graph view with summary-aware exploration",
      }),
      description: t("download.productProof.spotlights.visualize.description", {
        defaultValue:
          "The desktop app already has a dedicated visualize route that loads graph snapshots, graph summaries, focus states, and expandable subclusters.",
      }),
      points: [
        t("download.productProof.spotlights.visualize.points.0", {
          defaultValue: "Graph snapshot + AI summary fetched together",
        }),
        t("download.productProof.spotlights.visualize.points.1", {
          defaultValue: "Node focus and expandable subcluster flow",
        }),
        t("download.productProof.spotlights.visualize.points.2", {
          defaultValue: "Sidebar-guided exploration for larger maps",
        }),
      ],
    },
    microscope: {
      label: t("download.productProof.spotlights.microscope.label", {
        defaultValue: "Microscope",
      }),
      title: t("download.productProof.spotlights.microscope.title", {
        defaultValue:
          "Workspace-based deep analysis for notes and conversations",
      }),
      description: t(
        "download.productProof.spotlights.microscope.description",
        {
          defaultValue:
            "Microscope creates analysis workspaces from nodes, groups generated results by source, and lets users route selected nodes into the agent toolbox.",
        },
      ),
      points: [
        t("download.productProof.spotlights.microscope.points.0", {
          defaultValue: "Node-based ingest pipeline for note or conversation",
        }),
        t("download.productProof.spotlights.microscope.points.1", {
          defaultValue: "Workspace history grouped and browsable",
        }),
        t("download.productProof.spotlights.microscope.points.2", {
          defaultValue: "Selected microscope nodes can be handed to the agent",
        }),
      ],
    },
    agent: {
      label: t("download.productProof.spotlights.agent.label", {
        defaultValue: "Agent",
      }),
      title: t("download.productProof.spotlights.agent.title", {
        defaultValue: "Source-aware AI actions instead of isolated prompting",
      }),
      description: t("download.productProof.spotlights.agent.description", {
        defaultValue:
          "The app includes an AI agent chat box with note, conversation, and microscope source selection plus quick actions like summary and note creation.",
      }),
      points: [
        t("download.productProof.spotlights.agent.points.0", {
          defaultValue: "Session-based agent chat UI",
        }),
        t("download.productProof.spotlights.agent.points.1", {
          defaultValue: "Source chips for nodes and other context",
        }),
        t("download.productProof.spotlights.agent.points.2", {
          defaultValue:
            "Quick actions for summary, notes, relation, and importance",
        }),
      ],
    },
    "search-sync": {
      label: t("download.productProof.spotlights.searchSync.label", {
        defaultValue: "Search + Sync",
      }),
      title: t("download.productProof.spotlights.searchSync.title", {
        defaultValue:
          "Fast local search backed by sync logic that respects recency",
      }),
      description: t(
        "download.productProof.spotlights.searchSync.description",
        {
          defaultValue:
            "The front-end exposes note/thread search and the backend sync service merges conversations, messages, notes, and folders using LWW semantics.",
        },
      ),
      points: [
        t("download.productProof.spotlights.searchSync.points.0", {
          defaultValue: "Debounced search across notes and chat threads",
        }),
        t("download.productProof.spotlights.searchSync.points.1", {
          defaultValue: "Shortcut-driven command surface feel",
        }),
        t("download.productProof.spotlights.searchSync.points.2", {
          defaultValue: "Last-write-wins pull and push synchronization",
        }),
      ],
    },
  };

  const backendPipeline = [
    {
      step: "01",
      title: t("download.pipeline.collect.title", { defaultValue: "Collect" }),
      text: t("download.pipeline.collect.text", {
        defaultValue:
          "Conversation data and markdown notes are gathered, streamed, and prepared as graph-generation input.",
      }),
    },
    {
      step: "02",
      title: t("download.pipeline.queue.title", { defaultValue: "Queue" }),
      text: t("download.pipeline.queue.text", {
        defaultValue:
          "Graph generation, graph summary, and microscope ingest are orchestrated through SQS-backed background jobs.",
      }),
    },
    {
      step: "03",
      title: t("download.pipeline.enrich.title", { defaultValue: "Enrich" }),
      text: t("download.pipeline.enrich.text", {
        defaultValue:
          "Semantic search, graph stats, clusters, subclusters, and agent tools turn raw content into navigable structure.",
      }),
    },
    {
      step: "04",
      title: t("download.pipeline.sync.title", { defaultValue: "Sync" }),
      text: t("download.pipeline.sync.text", {
        defaultValue:
          "Notes, folders, conversations, and messages are synchronized with transaction-aware LWW conflict handling.",
      }),
    },
  ];

  const downloadLinks = {
    mac: {
      arm: "https://github.com/TACO-FOR-ALL/GraphNode_Front/releases/download/v1.0.0/GraphNode-1.0.0-arm64.dmg",
      intel:
        "https://github.com/TACO-FOR-ALL/GraphNode_Front/releases/download/v1.0.0/GraphNode-1.0.0.dmg",
    },
    windows:
      "https://github.com/TACO-FOR-ALL/GraphNode_Front/releases/download/v1.0.0/GraphNode.Setup.1.0.0.exe",
    linux: "#",
    ios: "#",
    android: "#",
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
      description: t("download.platforms.macosDescription", {
        defaultValue:
          "Optimized for Apple Silicon and Intel with a native desktop feel.",
      }),
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
      description: t("download.platforms.windowsDescription", {
        defaultValue:
          "Fast install, polished interface, and smooth graph interaction on Windows.",
      }),
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
      description: t("download.platforms.linuxDescription", {
        defaultValue:
          "Linux support is on the roadmap and will arrive with a dedicated release.",
      }),
    },
    {
      name: t("download.platforms.mobile", { defaultValue: "Mobile" }),
      icon: androidIcon,
      versions: [
        {
          label: t("download.platforms.iosComingSoon", {
            defaultValue: "iOS Coming Soon",
          }),
          link: downloadLinks.ios,
        },
        {
          label: t("download.platforms.androidComingSoon", {
            defaultValue: "Android Coming Soon",
          }),
          link: downloadLinks.android,
        },
      ],
      description: t("download.platforms.mobileDescription", {
        defaultValue:
          "A dedicated mobile experience is planned so you can browse and continue your graph anywhere.",
      }),
    },
  ];

  const activeSpotlight =
    productSpotlights.find((item) => item.id === selectedSpotlight) ??
    productSpotlights[0];
  const activeSpotlightContent = spotlightContent[activeSpotlight.id];
  const chatRooms = [
    { id: "research-sync", title: "Research sync" },
    { id: "graph-generation-sprint", title: "Graph generation sprint" },
    { id: "microscope-workspace-review", title: "Microscope workspace review" },
    { id: "agent-flow-improvements", title: "Agent flow improvements" },
    { id: "weekly-shipping-notes", title: "Weekly shipping notes" },
    { id: "growth-loop-brainstorm", title: "Growth loop brainstorm" },
    { id: "semantic-search-tests", title: "Semantic search tests" },
    { id: "meeting-notes-apr-9", title: "Meeting notes Apr 9" },
    { id: "support-triage", title: "Support triage" },
    { id: "team-retrospective", title: "Team retrospective" },
    { id: "graph-ui-polish", title: "Graph UI polish" },
    { id: "desktop-beta-feedback", title: "Desktop beta feedback" },
    { id: "weekly-roadmap-planning", title: "Weekly roadmap planning" },
    { id: "launch-copy-review", title: "Launch copy review" },
    { id: "user-interview-clips", title: "User interview clips" },
    { id: "knowledge-base-cleanup", title: "Knowledge base cleanup" },
    { id: "onboarding-flow", title: "Onboarding flow" },
    { id: "pricing-page-notes", title: "Pricing page notes" },
    { id: "design-critique", title: "Design critique" },
    { id: "search-ranking-ideas", title: "Search ranking ideas" },
    { id: "team-sync-friday", title: "Team sync Friday" },
    { id: "mobile-roadmap", title: "Mobile roadmap" },
  ];
  const previewChatConversation = [
    {
      role: "user" as const,
      text: "이번 주 워크스페이스에서 반복되는 핵심 테마를 정리해줘.",
    },
    {
      role: "assistant" as const,
      text: "이번 주에는 세 가지 흐름이 반복됩니다.\n\n- 노트와 그래프를 더 자연스럽게 연결하는 경험\n- 에이전트 결과에 출처와 맥락을 더 분명하게 남기는 방식\n- 첫 진입 사용자가 구조를 빠르게 이해하도록 돕는 온보딩 개선",
    },
    {
      role: "user" as const,
      text: "그걸 제품 관점의 액션 아이템으로 바꿔줘.",
    },
    {
      role: "assistant" as const,
      text: "좋아요. 우선순위는 다음과 같습니다.\n\n1. 첫 노트를 그래프로 확장하는 진입점 정리\n2. 채팅 응답마다 연결된 노트와 소스 표시\n3. 홈 화면에서 노트, 채팅, 그래프의 역할을 더 명확히 설명",
    },
  ];
  const previewNotes = [
    {
      title: "GraphNode Landing Refresh",
      excerpt:
        "Hero redesign, animated device preview, and tighter product story.",
    },
    {
      title: "Microscope UX Ideas",
      excerpt:
        "Workspace grouping, node context handoff, and graph zoom feedback.",
    },
    {
      title: "Search + Sync Summary",
      excerpt:
        "LWW sync, local-first notes, and command-surface style retrieval.",
    },
    {
      title: "Writing is telepathy",
      excerpt:
        "Ideas can travel through time and space without being uttered out loud.",
    },
  ];
  const previewNodes = [
    { x: "16%", y: "22%", label: "Notes" },
    { x: "47%", y: "16%", label: "Agents" },
    { x: "76%", y: "29%", label: "Context" },
    { x: "28%", y: "67%", label: "Search" },
    { x: "61%", y: "74%", label: "Memory" },
  ];
  const graphCollections = [
    "Knowledge Graph",
    "Product cluster",
    "Agent workflows",
    "Microscope context",
    "Semantic links",
  ];
  const noteTree = [
    { id: "clippings", name: "Clippings", type: "folder" as const, depth: 0 },
    { id: "daily", name: "Daily", type: "folder" as const, depth: 0 },
    { id: "ideas", name: "Ideas", type: "folder" as const, depth: 0 },
    {
      id: "writing-is-telepathy",
      name: "Writing is telepathy",
      type: "note" as const,
      depth: 1,
      parentId: "ideas",
    },
    {
      id: "calmness-is-a-superpower",
      name: "Calmness is a superpower",
      type: "note" as const,
      depth: 1,
      parentId: "ideas",
    },
    { id: "meta", name: "Meta", type: "folder" as const, depth: 0 },
    { id: "projects", name: "Projects", type: "folder" as const, depth: 0 },
    { id: "references", name: "References", type: "folder" as const, depth: 0 },
    {
      id: "specialization-is-for-insects",
      name: "Specialization is for insects",
      type: "note" as const,
      depth: 1,
      parentId: "references",
    },
    {
      id: "first-principles",
      name: "First principles",
      type: "note" as const,
      depth: 1,
      parentId: "references",
    },
    { id: "books", name: "Books", type: "folder" as const, depth: 0 },
    {
      id: "on-writing",
      name: "On Writing",
      type: "note" as const,
      depth: 1,
      parentId: "books",
    },
    { id: "philosophy", name: "Philosophy", type: "folder" as const, depth: 0 },
    {
      id: "what-if-it-were-easy",
      name: "What if it were easy",
      type: "note" as const,
      depth: 1,
      parentId: "philosophy",
    },
    { id: "tools", name: "Tools", type: "folder" as const, depth: 0 },
    {
      id: "creativity-is-combinatorial",
      name: "Creativity is combinatorial",
      type: "note" as const,
      depth: 1,
      parentId: "tools",
    },
    { id: "research", name: "Research", type: "folder" as const, depth: 0 },
    {
      id: "graph-ranking-notes",
      name: "Graph ranking notes",
      type: "note" as const,
      depth: 1,
      parentId: "research",
    },
    {
      id: "semantic-retrieval",
      name: "Semantic retrieval",
      type: "note" as const,
      depth: 1,
      parentId: "research",
    },
    { id: "product", name: "Product", type: "folder" as const, depth: 0 },
    {
      id: "launch-checklist",
      name: "Launch checklist",
      type: "note" as const,
      depth: 1,
      parentId: "product",
    },
    {
      id: "beta-feedback",
      name: "Beta feedback",
      type: "note" as const,
      depth: 1,
      parentId: "product",
    },
  ];
  const noteDocuments: Record<
    string,
    {
      title: string;
      tag?: string;
      source?: string;
      content: string[];
    }
  > = {
    "writing-is-telepathy": {
      title: "Writing is telepathy",
      tag: "#evergreen",
      source: "On Writing",
      content: [
        "## Ideas can travel through time and space",
        "Ideas can travel through time and space without being uttered out loud. The process of telepathy requires two places:",
        "- **A sending place**, a transmission place where the writer sends ideas, such as a desk",
        "- **A receiving place**, where the reader receives the ideas or imagery such as a couch, a comfortable chair, in bed",
        "## Quote",
        "Look, here's a table covered with red cloth. On it is a cage the size of a small fish aquarium. In the cage is a white rabbit with a pink nose and pink-rimmed eyes. On its back, clearly marked in blue ink, is the numeral 8.",
      ],
    },
    "calmness-is-a-superpower": {
      title: "Calmness is a superpower",
      tag: "#mindset",
      source: "Weekly Review",
      content: [
        "## Calm creates leverage",
        "Calmness makes it easier to notice what matters, ignore noise, and keep the graph of work coherent over time.",
        "- Fewer reactive decisions",
        "- Better context retention",
        "- Clearer communication",
      ],
    },
    "specialization-is-for-insects": {
      title: "Specialization is for insects",
      tag: "#reference",
      source: "Collected Quotes",
      content: [
        "## Breadth matters",
        "A durable knowledge system should let one person think across product, design, engineering, and writing without losing the links between them.",
        "Graph thinking helps preserve those bridges.",
      ],
    },
    "first-principles": {
      title: "First principles",
      tag: "#thinking",
      source: "Research Lab",
      content: [
        "## Strip things down",
        "When a workflow feels complicated, reduce it to inputs, transformations, and outputs. Then rebuild only what is necessary.",
        "GraphNode is strongest when each connection has a reason to exist.",
      ],
    },
    "on-writing": {
      title: "On Writing",
      tag: "#book",
      source: "Bookshelf",
      content: [
        "## Useful passages",
        "Strong writing tends to feel direct, visual, and grounded in lived detail.",
        "- Keep sentences active",
        "- Prefer concrete images",
        "- Cut what does not move the thought forward",
      ],
    },
    "what-if-it-were-easy": {
      title: "What if it were easy",
      tag: "#prompt",
      source: "Philosophy",
      content: [
        "## Reframing complexity",
        "A lot of product friction survives because teams start from constraints instead of outcomes.",
        "Try asking what the obvious version would look like if the path were clear.",
      ],
    },
    "creativity-is-combinatorial": {
      title: "Creativity is combinatorial",
      tag: "#idea",
      source: "Tools",
      content: [
        "## New things are often recombinations",
        "Novel work comes from mixing existing ideas across domains, then keeping the connections visible enough to revisit later.",
        "- Store sources clearly",
        "- Preserve relationships",
        "- Revisit clusters over time",
      ],
    },
    "graph-ranking-notes": {
      title: "Graph ranking notes",
      tag: "#research",
      source: "Research",
      content: [
        "## Ranking signals",
        "Connected notes should rank higher when semantic similarity and explicit links agree.",
      ],
    },
    "semantic-retrieval": {
      title: "Semantic retrieval",
      tag: "#retrieval",
      source: "Research",
      content: [
        "## Retrieval behavior",
        "Search should feel fast, but the result order should still expose why a note appeared.",
      ],
    },
    "launch-checklist": {
      title: "Launch checklist",
      tag: "#product",
      source: "Product",
      content: [
        "## Before launch",
        "- Finalize copy",
        "- Review onboarding",
        "- Validate pricing",
        "- Check downloads",
      ],
    },
    "beta-feedback": {
      title: "Beta feedback",
      tag: "#product",
      source: "Product",
      content: [
        "## Repeating themes",
        "People like the concept, but want stronger first-run clarity and more obvious note-to-graph relationships.",
      ],
    },
  };
  const visibleNoteTree = noteTree.filter((item) => {
    if (!item.parentId) return true;
    return expandedFolderIds.includes(item.parentId);
  });
  const selectedNoteDocument = selectedNoteId
    ? (noteDocuments[selectedNoteId] ?? null)
    : null;

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute left-0 top-[12%] z-0 -translate-x-1/3 opacity-[0.05]">
        <img src={logo} alt="" className="h-60 w-60" />
      </div>
      <div className="pointer-events-none absolute left-0 top-[62%] z-0 -translate-x-1/3 opacity-[0.05]">
        <img src={logo} alt="" className="h-70 w-70" />
      </div>
      {/* Decorative large logo - top right, partially clipped */}
      <div className="pointer-events-none absolute right-0 top-1/3 z-0 translate-x-1/3 opacity-[0.07]">
        <img src={logo} alt="" className="h-85 w-85" />
      </div>

      <section className="relative px-4 pb-18 pt-8 md:px-8 md:pb-32 md:pt-16">
        <div className="mx-auto max-w-7xl">
          <div className="relative flex flex-col gap-12 md:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: "easeOut" }}
              className="relative z-10"
            >
              <motion.p
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="mb-4 text-[11px] font-semibold uppercase tracking-[0.26em] text-cyan-200/80 sm:text-sm sm:tracking-[0.32em]"
              >
                {t("download.hero.eyebrow", {
                  defaultValue:
                    "A more alive way to think, write, and connect ideas",
                })}
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.8 }}
                className="max-w-4xl text-4xl font-black leading-[1.08] tracking-[-0.02em] text-white sm:text-5xl md:text-6xl"
              >
                {t("download.hero.tagline1")}
                <span className="block bg-linear-to-r from-cyan-300 via-white to-violet-300 bg-clip-text text-transparent">
                  {t("download.hero.tagline2")}
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.7 }}
                className="mt-10 max-w-2xl text-base leading-8 text-slate-300 sm:mt-12 sm:text-lg sm:leading-9 md:mt-14 md:text-xl"
              >
                {t("download.hero.description", {
                  defaultValue:
                    "GraphNode brings markdown notes, AI chat, and graph visualization into one cinematic workspace so your ideas stay connected instead of buried.",
                })}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.7 }}
                className="mt-12 flex flex-col gap-3 sm:mt-16 sm:flex-row sm:gap-4"
              >
                <a
                  href={downloadLinks.mac.arm}
                  className="group inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3.5 text-sm font-semibold text-slate-950 transition duration-300 hover:-translate-y-1 hover:bg-cyan-100 sm:px-7 sm:py-4 sm:text-base"
                >
                  {t("download.hero.macDownload")}
                  <span className="ml-2 transition group-hover:translate-x-1">
                    →
                  </span>
                </a>
                <a
                  href={downloadLinks.windows}
                  className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/8 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-cyan-300/50 hover:bg-white/14 sm:px-7 sm:py-4 sm:text-base"
                >
                  {t("download.hero.windowsDownload")}
                </a>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="relative flex justify-center"
            >
              <div className="absolute left-10 top-8 h-32 w-32 rounded-full bg-cyan-400/20 blur-3xl" />
              <div className="absolute bottom-8 right-2 h-40 w-40 rounded-full bg-fuchsia-500/20 blur-3xl" />

              {orbitingIcons.map((item, index) => {
                const scatter = orbitingIconScatter[index];
                return (
                  <motion.div
                    key={item.id}
                    initial={{
                      x: scatter.dx,
                      y: scatter.dy,
                      rotate: scatter.initR,
                      opacity: 0,
                    }}
                    animate={
                      isPreviewInView
                        ? { x: 0, y: 0, rotate: 0, opacity: 1 }
                        : {
                            x: scatter.dx,
                            y: scatter.dy,
                            rotate: scatter.initR,
                            opacity: 0,
                          }
                    }
                    transition={{
                      type: "spring",
                      stiffness: 55,
                      damping: 14,
                      delay: scatter.delay,
                      opacity: { duration: 0.3, delay: scatter.delay },
                    }}
                    className={`absolute z-20 hidden md:block ${item.className}`}
                  >
                    <motion.div
                      animate={
                        isPreviewInView
                          ? {
                              y: [0, scatter.floatY, 0],
                              rotate: [
                                0,
                                scatter.floatR,
                                scatter.floatR * -0.4,
                                0,
                              ],
                            }
                          : {}
                      }
                      transition={{
                        duration: 4 + index * 0.5,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                        delay: scatter.delay + 1.4,
                      }}
                      className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/14 bg-slate-950/70 text-white shadow-[0_12px_40px_rgba(2,6,23,0.28)] backdrop-blur"
                    >
                      {item.kind === "logo" ? (
                        <img src={logo} alt="GraphNode" className="h-6 w-6" />
                      ) : (
                        <span className="text-lg font-bold text-cyan-100">
                          {item.symbol}
                        </span>
                      )}
                    </motion.div>
                  </motion.div>
                );
              })}

              <div className="relative w-full max-w-295 overflow-x-hidden rounded-3xl border border-white/12 bg-slate-950/60 p-3 shadow-[0_30px_120px_rgba(2,6,23,0.55)] backdrop-blur-xl sm:rounded-4xl sm:p-4">
                <div className="rounded-3xl border border-white/8 bg-[radial-gradient(circle_at_top,#172554_0%,#0f172a_55%,#020617_100%)] p-4 sm:rounded-[26px] sm:p-5">
                  <div
                    className="overflow-hidden rounded-3xl border border-[#303036] bg-[#191919]"
                    style={{
                      fontFamily:
                        '"Noto Sans KR","Apple SD Gothic Neo","Malgun Gothic",sans-serif',
                    }}
                  >
                    <div className="flex items-center justify-between border-b border-[#35353a] bg-[#232324] px-4 py-2.25">
                      <div className="flex items-center gap-1.75">
                        <span className="h-2.75 w-2.75 rounded-full bg-[#ff5f57]" />
                        <span className="h-2.75 w-2.75 rounded-full bg-[#febc2e]" />
                        <span className="h-2.75 w-2.75 rounded-full bg-[#28c840]" />
                      </div>
                      <p className="text-xs font-medium text-[#8b8b91]">
                        {previewTab === "home"
                          ? "graphnode.app / home"
                          : previewTab === "chat"
                            ? "graphnode.app / chat"
                            : previewTab === "visualize"
                              ? "graphnode.app / visualize"
                              : "graphnode.app / notes"}
                      </p>
                    </div>

                    <div className="relative grid h-155 w-full overflow-hidden grid-cols-[45px_minmax(0,1fr)]">
                      {/* Invisible center trigger for animation */}
                      <div
                        ref={triggerRef}
                        className="pointer-events-none absolute bottom-0 left-1/2 h-1 w-1 -translate-x-1/2 opacity-0"
                        aria-hidden="true"
                      />

                      <div className="relative z-10 flex flex-col justify-between border-r border-[#2d2d32] bg-[#1f1f20] px-2 py-2.5">
                        <div className="flex flex-col items-center gap-2">
                          {/* Home icon */}
                          <motion.div
                            initial={{
                              x: sidebarIconScatter[0].x,
                              y: sidebarIconScatter[0].y,
                              rotate: sidebarIconScatter[0].rotate,
                              scale: sidebarIconScatter[0].scale,
                              opacity: 0.9,
                            }}
                            animate={
                              isPreviewInView
                                ? {
                                    x: 0,
                                    y: 0,
                                    rotate: 0,
                                    scale: 1,
                                    opacity: 1,
                                  }
                                : {
                                    x: sidebarIconScatter[0].x,
                                    y: sidebarIconScatter[0].y,
                                    rotate: sidebarIconScatter[0].rotate,
                                    scale: sidebarIconScatter[0].scale,
                                    opacity: 0.9,
                                  }
                            }
                            transition={{
                              type: "spring",
                              stiffness: 70,
                              damping: 14,
                              delay: sidebarIconScatter[0].delay,
                            }}
                          >
                            <button
                              onClick={() => setPreviewTab("home")}
                              className={`flex h-7 w-7 items-center justify-center rounded-md transition ${
                                previewTab === "home"
                                  ? "bg-[#7ab5fb]"
                                  : "bg-transparent hover:bg-[#1e3a5f]"
                              }`}
                              aria-label="Home"
                            >
                              <img
                                src={logo}
                                alt="GraphNode"
                                className="h-4 w-4"
                              />
                            </button>
                          </motion.div>

                          {/* Nav icons (chat, notes, graph) */}
                          {previewNavItems.map((item, index) => {
                            const active = previewTab === item.id;
                            const scatter = sidebarIconScatter[index + 1];
                            return (
                              <motion.div
                                key={item.id}
                                initial={{
                                  x: scatter.x,
                                  y: scatter.y,
                                  rotate: scatter.rotate,
                                  scale: scatter.scale,
                                  opacity: 0.9,
                                }}
                                animate={
                                  isPreviewInView
                                    ? {
                                        x: 0,
                                        y: 0,
                                        rotate: 0,
                                        scale: 1,
                                        opacity: 1,
                                      }
                                    : {
                                        x: scatter.x,
                                        y: scatter.y,
                                        rotate: scatter.rotate,
                                        scale: scatter.scale,
                                        opacity: 0.9,
                                      }
                                }
                                transition={{
                                  type: "spring",
                                  stiffness: 70,
                                  damping: 14,
                                  delay: scatter.delay,
                                }}
                              >
                                <button
                                  onClick={() => setPreviewTab(item.id)}
                                  className={`flex h-7 w-7 items-center justify-center rounded-md text-sm font-semibold transition ${
                                    active
                                      ? "bg-[#7ab5fb] text-white"
                                      : "bg-transparent text-text-secondary hover:bg-[#1e3a5f] hover:text-white"
                                  }`}
                                  aria-label={item.label}
                                >
                                  <PreviewNavIcon
                                    id={item.id}
                                    active={active}
                                  />
                                </button>
                              </motion.div>
                            );
                          })}
                        </div>

                        <div className="flex flex-col items-center gap-2">
                          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#d4d4d8] text-[11px] font-semibold text-black">
                            A
                          </div>
                        </div>
                      </div>

                      <div
                        className={`grid h-full min-h-0 bg-[#1d1d1f] ${
                          previewTab === "home"
                            ? "grid-cols-[0px_minmax(0,1fr)]"
                            : "grid-cols-[228px_minmax(0,1fr)]"
                        }`}
                      >
                        <div
                          className={`border-r border-[#2d2d32] bg-[#262627] pl-3 pr-1 py-4 ${
                            previewTab === "home"
                              ? "invisible overflow-hidden"
                              : "flex min-h-0 h-155 flex-col overflow-hidden"
                          }`}
                        >
                          <div className="app-preview-scrollbar h-full min-h-0 flex-1 overflow-y-auto pr-0">
                            <div className="space-y-2">
                              {previewTab === "chat" && (
                                <>
                                  <button className="mb-2 flex h-8 w-full items-center gap-1.5 rounded-md px-1.5 text-left text-sm text-[#d1d1d6] transition hover:bg-[#303034] hover:text-[#7ab5fb]">
                                    <PlusIcon />
                                    <span>New Chat</span>
                                  </button>
                                  {chatRooms.map((thread) => (
                                    <button
                                      key={thread.id}
                                      onClick={() =>
                                        setSelectedChatId(thread.id)
                                      }
                                      className={`block h-8 w-full rounded-md border px-1.5 py-[5.5px] text-left transition ${
                                        selectedChatId === thread.id
                                          ? "border-transparent bg-[#474748] text-white"
                                          : "border-transparent bg-transparent text-[#d1d1d6] hover:bg-[#303034]"
                                      }`}
                                    >
                                      <p className="truncate text-sm">
                                        {thread.title}
                                      </p>
                                    </button>
                                  ))}
                                </>
                              )}
                              {previewTab === "notes" && (
                                <>
                                  <button className="mb-2 flex h-8 w-full items-center gap-1.5 rounded-md px-1.5 text-left text-sm text-[#d1d1d6] transition hover:bg-[#303034] hover:text-[#7ab5fb]">
                                    <PreviewNavIcon id="notes" active={false} />
                                    <span>New Note</span>
                                  </button>
                                  <p className="mb-1.5 mt-2 text-xs font-normal text-[#a1a1aa]">
                                    Workspace
                                  </p>
                                  {visibleNoteTree.map((item) => (
                                    <button
                                      key={item.id}
                                      onClick={() => {
                                        if (item.type === "folder") {
                                          setExpandedFolderIds((current) =>
                                            current.includes(item.id)
                                              ? current.filter(
                                                  (folderId) =>
                                                    folderId !== item.id,
                                                )
                                              : [...current, item.id],
                                          );
                                        } else {
                                          setSelectedNoteId(item.id);
                                        }
                                      }}
                                      className={`flex h-8 w-full items-center gap-1 rounded-md px-1.5 text-left text-sm transition ${
                                        item.type === "note" &&
                                        selectedNoteId === item.id
                                          ? "bg-[#474748] text-white"
                                          : "text-[#d1d1d6] hover:bg-[#303034]"
                                      }`}
                                      style={{
                                        paddingLeft: item.depth === 1 ? 22 : 6,
                                      }}
                                    >
                                      <span
                                        className={`w-3 text-[11px] ${item.type === "note" ? "text-transparent" : "text-[#8f8f95]"}`}
                                      >
                                        {item.type === "folder"
                                          ? expandedFolderIds.includes(item.id)
                                            ? "⌄"
                                            : "›"
                                          : "›"}
                                      </span>
                                      <span className="truncate">
                                        {item.name}
                                      </span>
                                    </button>
                                  ))}
                                </>
                              )}
                              {previewTab === "visualize" &&
                                graphCollections.map((item, index) => (
                                  <button
                                    key={item}
                                    className={`block h-8 w-full rounded-md border px-1.5 py-[5.5px] text-left transition ${
                                      index === 0
                                        ? "border-transparent bg-[#474748] text-white"
                                        : "border-transparent bg-transparent text-[#d1d1d6] hover:bg-[#303034]"
                                    }`}
                                  >
                                    <p className="truncate text-sm">{item}</p>
                                  </button>
                                ))}
                            </div>
                          </div>
                        </div>

                        <div className="min-w-0 overflow-hidden bg-[#1d1d1f] p-0">
                          {previewTab === "home" && (
                            <div className="relative h-155 overflow-hidden bg-[#1f1f1f]">
                              {/* Background radial glow */}
                              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(90,141,246,0.10),transparent)]" />

                              {/* Lottie — visible initially, fades out on trigger */}
                              <motion.div
                                className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center"
                                initial={{ opacity: 1 }}
                                animate={
                                  isPreviewInView
                                    ? { opacity: 0 }
                                    : { opacity: 1 }
                                }
                                transition={{
                                  duration: 0.8,
                                  ease: "easeInOut",
                                }}
                              >
                                <Lottie
                                  animationData={welcomeLottie}
                                  loop
                                  className="w-105 opacity-90"
                                />
                              </motion.div>

                              {/* Home content — hidden initially, fades in on trigger */}
                              <motion.div
                                className="app-preview-scrollbar relative h-full overflow-y-auto overflow-x-hidden"
                                initial={{ opacity: 0 }}
                                animate={
                                  isPreviewInView
                                    ? { opacity: 1 }
                                    : { opacity: 0 }
                                }
                                transition={{
                                  duration: 0.8,
                                  ease: "easeOut",
                                  delay: 0.3,
                                }}
                              >
                                <div className="flex w-full flex-col items-center pt-12">
                                  <div className="flex flex-col items-center gap-2 text-white">
                                    <p className="text-2xl font-semibold">
                                      {t("preview.home.title")}
                                    </p>
                                    <p className="text-lg text-[#9090a5]">
                                      {t("preview.home.subtitle")}
                                    </p>
                                  </div>

                                  <div className="mx-auto mt-8 w-140 rounded-[14px] border border-white/10 bg-[#111317] px-4 py-4 shadow-[0_2px_20px_0_rgba(186,218,255,0.10)]">
                                    <div className="min-h-9 text-[13px] text-[#6f7682]">
                                      {t("preview.home.placeholder")}
                                    </div>
                                    <div className="mt-3 flex items-center justify-between">
                                      <div className="rounded-md border border-white/8 bg-[#1f2329] px-3 py-1.5 text-xs text-slate-300">
                                        GPT-5.4
                                      </div>
                                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#5a8df6] text-white">
                                        →
                                      </div>
                                    </div>
                                  </div>

                                  <div className="mx-auto mt-10 w-full max-w-170 px-4 pb-8">
                                    <p className="mb-5 text-center text-xl font-medium text-white">
                                      {t("preview.home.recentNotes")}
                                    </p>
                                    <div className="grid grid-cols-3 gap-3">
                                      <div className="flex h-40 items-center justify-center rounded-xl border border-dashed border-white/12 bg-[#242427] text-[28px] text-white/30">
                                        +
                                      </div>
                                      {previewNotes.slice(0, 2).map((note) => (
                                        <div
                                          key={note.title}
                                          className="h-40 rounded-xl border border-white/8 bg-[#26272b] px-4 py-4"
                                        >
                                          <p className="line-clamp-2 text-sm font-medium text-white">
                                            {note.title}
                                          </p>
                                          <p className="mt-2 line-clamp-4 text-[11px] leading-5 text-[#a3a3aa]">
                                            {note.excerpt}
                                          </p>
                                          <p className="mt-auto pt-6 text-[10px] text-[#7f7f85]">
                                            Apr 09, 2026
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            </div>
                          )}

                          {previewTab === "chat" && (
                            <div className="flex h-full flex-col bg-[#1f1f1f]">
                              <div className="flex min-h-0 flex-1 flex-col overflow-hidden px-5 py-5">
                                <div className="app-preview-scrollbar min-h-0 flex-1 overflow-y-scroll pr-0.5">
                                  <div className="space-y-6 pt-1">
                                    {selectedChatId &&
                                      previewChatConversation.map(
                                        (message, index) => (
                                          <div
                                            key={`preview-chat-${selectedChatId}-${index}`}
                                            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} items-start`}
                                          >
                                            {message.role === "user" ? (
                                              <div className="ml-20 max-w-full rounded-2xl rounded-tr-sm bg-[#2a2f39] px-4 py-3 text-sm leading-6 text-[#eef2ff]">
                                                {message.text}
                                              </div>
                                            ) : (
                                              <div className="w-full">
                                                <div className="flex items-start gap-3 rounded-2xl border border-white/8 bg-transparent p-5 text-[#d0d0d5] shadow-[0_2px_4px_0_rgba(25,33,61,0.08)]">
                                                  <img
                                                    src={logo}
                                                    alt="GraphNode"
                                                    className="h-6 w-6 shrink-0 pt-1"
                                                  />
                                                  <div className="min-w-0 whitespace-pre-line text-sm leading-7">
                                                    {message.text}
                                                  </div>
                                                </div>
                                                <div className="ml-1.5 mt-2 flex items-center gap-2.5 text-[#8c8c91]">
                                                  <span className="rounded p-1 hover:bg-[#2a2a2b]">
                                                    ⧉
                                                  </span>
                                                  <span className="rounded p-1 hover:bg-[#2a2a2b]">
                                                    ↻
                                                  </span>
                                                </div>
                                              </div>
                                            )}
                                          </div>
                                        ),
                                      )}
                                  </div>
                                </div>

                                <div className="mt-5 rounded-xl border border-[rgba(255,255,255,0.1)] bg-[#111317] px-3 py-3 shadow-[0_2px_20px_0_rgba(186,218,255,0.16)]">
                                  <div className="min-h-9 text-sm text-slate-500">
                                    {t("preview.chat.placeholder")}
                                  </div>
                                  <div className="mt-3 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                      <div className="rounded-md border border-white/8 bg-[#1f2329] px-3 py-1.5 text-xs text-slate-300">
                                        GPT-5.4
                                      </div>
                                      <div className="flex h-8 w-8 items-center justify-center rounded-md border border-white/8 bg-[#1f2329] text-slate-300">
                                        +
                                      </div>
                                    </div>
                                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#5a8df6] text-white">
                                      →
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {previewTab === "notes" && (
                            <div className="h-full overflow-hidden bg-[#1f1f1f]">
                              <div className="app-preview-scrollbar h-full overflow-y-scroll px-6 py-5">
                                {selectedNoteId && selectedNoteDocument ? (
                                  <div className="preview-markdown text-sm leading-7 text-[#d0d0d5]">
                                    <h2 className="mb-4 text-3xl font-bold leading-tight text-white">
                                      {selectedNoteDocument.title}
                                    </h2>
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                      {selectedNoteDocument.content.join(
                                        "\n\n",
                                      )}
                                    </ReactMarkdown>
                                  </div>
                                ) : (
                                  <div className="flex h-full items-center justify-center text-sm text-[#6f7682]">
                                    Select a note to view its content
                                  </div>
                                )}
                              </div>
                            </div>
                          )}

                          {previewTab === "visualize" && (
                            <div className="flex h-full flex-col items-start justify-start border-l border-[#2a2a2e] bg-[#1f1f1f] p-5">
                              <div className="mb-4 flex w-full items-center justify-between">
                                <div>
                                  <p className="text-xs text-slate-400">
                                    {t("download.hero.graphViewLabel", {
                                      defaultValue: "Graph View",
                                    })}
                                  </p>
                                  <p className="text-lg font-semibold text-white">
                                    {t("download.hero.previewTitle", {
                                      defaultValue: "Knowledge map in motion",
                                    })}
                                  </p>
                                </div>
                                <div className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-100">
                                  2D / 3D
                                </div>
                              </div>
                              <div className="grid h-full w-full gap-4 xl:grid-cols-[0.75fr_1.25fr]">
                                <div className="rounded-2xl border border-[#2a2a2e] bg-[#262626] p-4">
                                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                                    Graph Summary
                                  </p>
                                  <div className="space-y-3">
                                    {[
                                      "Product cluster",
                                      "Agent workflows",
                                      "Microscope context",
                                      "Knowledge search",
                                    ].map((item, index) => (
                                      <div
                                        key={item}
                                        className={`rounded-2xl border px-3 py-3 ${
                                          index === 0
                                            ? "border-cyan-300/18 bg-cyan-300/10"
                                            : "border-white/8 bg-[#1f1f1f]"
                                        }`}
                                      >
                                        <p className="truncate text-sm font-medium text-white">
                                          {item}
                                        </p>
                                        <p className="mt-1 text-xs text-slate-400">
                                          12 linked nodes
                                        </p>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                                <div className="relative h-full min-h-72.5 overflow-hidden rounded-[22px] border border-[#2a2a2e] bg-[#202020]">
                                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.18),transparent_45%)]" />
                                  {previewNodes.map((node, index) => (
                                    <motion.div
                                      key={node.label}
                                      animate={{
                                        y: [0, index % 2 === 0 ? -12 : 10, 0],
                                        x: [0, index % 2 === 0 ? 8 : -6, 0],
                                      }}
                                      transition={{
                                        duration: 3.5 + index * 0.4,
                                        repeat: Number.POSITIVE_INFINITY,
                                        ease: "easeInOut",
                                      }}
                                      className="absolute"
                                      style={{ left: node.x, top: node.y }}
                                    >
                                      <div className="h-3.5 w-3.5 rounded-full bg-white shadow-[0_0_0_4px_rgba(255,255,255,0.06)]" />
                                    </motion.div>
                                  ))}
                                  <svg
                                    className="absolute inset-0 h-full w-full"
                                    viewBox="0 0 100 100"
                                    preserveAspectRatio="none"
                                  >
                                    <path
                                      d="M18 26 C30 18, 40 17, 49 21"
                                      stroke="rgba(255,255,255,0.28)"
                                      strokeWidth="0.55"
                                      fill="none"
                                    />
                                    <path
                                      d="M49 21 C62 24, 71 25, 78 31"
                                      stroke="rgba(255,255,255,0.24)"
                                      strokeWidth="0.55"
                                      fill="none"
                                    />
                                    <path
                                      d="M22 67 C34 58, 44 45, 49 21"
                                      stroke="rgba(255,255,255,0.2)"
                                      strokeWidth="0.55"
                                      fill="none"
                                    />
                                    <path
                                      d="M22 67 C39 71, 51 72, 63 75"
                                      stroke="rgba(255,255,255,0.18)"
                                      strokeWidth="0.55"
                                      fill="none"
                                    />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="px-4 py-18 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
          >
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-cyan-200/75">
                {t("download.features.eyebrow", {
                  defaultValue: "Why it feels different",
                })}
              </p>
              <h2 className="max-w-3xl text-4xl font-black tracking-[-0.04em] text-white md:text-6xl">
                {t("download.features.title")}
              </h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-slate-300 md:text-lg">
              {t("download.features.description", {
                defaultValue:
                  "Instead of a flat utility page, each surface is designed to communicate momentum, structure, and clarity.",
              })}
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {featureKeys.map((feature, index) => (
              <motion.div
                key={feature.key}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.06, duration: 0.55 }}
                whileHover={{ y: -8, rotateX: 3, rotateY: -3 }}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/6 p-7 backdrop-blur-sm"
              >
                <div
                  className={`absolute inset-0 bg-linear-to-br ${feature.accent} opacity-0 transition duration-500 group-hover:opacity-100`}
                />
                <div className="relative">
                  <div className="inline-flex rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-2 text-sm font-semibold tracking-[0.16em] text-cyan-100 uppercase">
                    {feature.icon}
                  </div>
                  <h3 className="mt-6 text-2xl font-bold text-white">
                    {t(`download.features.${feature.key}.title`)}
                  </h3>
                  <p className="mt-4 text-base leading-7 text-slate-300">
                    {t(`download.features.${feature.key}.description`)}
                  </p>
                  <div className="mt-8 h-px w-full bg-linear-to-r from-transparent via-white/18 to-transparent" />
                  <p className="mt-5 text-sm text-slate-400">
                    {t(`download.features.${feature.key}.detail`, {
                      defaultValue:
                        "Built to keep discovery, organization, and execution inside the same visual workflow.",
                    })}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-18 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7 }}
            className="flex h-full flex-col rounded-4xl border border-white/10 bg-linear-to-br from-slate-900/90 via-slate-950/88 to-cyan-950/55 p-7 sm:p-9"
          >
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.28em] text-cyan-200/75">
              {t("download.workflow.eyebrow", {
                defaultValue: "From note to action",
              })}
            </p>
            <h2 className="text-4xl font-black tracking-[-0.04em] text-white md:text-5xl">
              {t("download.workflow.title", {
                defaultValue:
                  "A workflow where ideas stay visible, connected, and ready to act on",
              })}
            </h2>
            <p className="mt-7 max-w-xl text-base leading-7 text-slate-300">
              {t("download.workflow.description", {
                defaultValue:
                  "Each step is arranged as one continuous flow so ideas stay visible, connected, and ready to move into action.",
              })}
            </p>
          </motion.div>

          <div className="flex h-full flex-col gap-5">
            {workflowCards.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.08, duration: 0.55 }}
                className="flex-1 rounded-3xl border border-white/10 bg-white/6 p-6 backdrop-blur"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-400">
                      0{index + 1}
                    </p>
                    <h3 className="mt-2 text-2xl font-bold text-white">
                      {card.title}
                    </h3>
                  </div>
                  <div className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-medium text-cyan-100">
                    {t("download.workflow.signal", {
                      defaultValue: "Interactive surface",
                    })}
                  </div>
                </div>
                <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
                  {card.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-18 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65 }}
            className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
          >
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-cyan-200/75">
                {t("download.productProof.eyebrow", {
                  defaultValue: "Built from the actual app",
                })}
              </p>
              <h2 className="max-w-3xl text-4xl font-black tracking-[-0.04em] text-white md:text-6xl">
                {t("download.productProof.title", {
                  defaultValue:
                    "Real product capabilities, turned into an interactive story",
                })}
              </h2>
            </div>
          </motion.div>

          <div className="grid gap-6 lg:min-h-152 lg:grid-cols-[0.42fr_0.58fr] lg:items-stretch">
            <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-2 lg:mx-0 lg:grid lg:h-152 lg:grid-rows-4 lg:gap-4 lg:overflow-visible lg:px-0 lg:pb-0">
              {productSpotlights.map((item, index) => {
                const isActive = item.id === activeSpotlight.id;
                return (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -18 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ delay: index * 0.06, duration: 0.45 }}
                    onClick={() => setSelectedSpotlight(item.id)}
                    className={`min-w-70 rounded-[26px] border p-5 text-left transition duration-300 lg:h-full lg:min-h-0 lg:min-w-0 ${
                      isActive
                        ? "border-cyan-300/40 bg-cyan-300/10 shadow-[0_20px_70px_rgba(34,211,238,0.12)]"
                        : "border-white/10 bg-white/6 hover:border-white/18 hover:bg-white/8"
                    }`}
                  >
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-100/80">
                      {spotlightContent[item.id].label}
                    </p>
                    <h3 className="mt-2 text-xl font-bold text-white">
                      {spotlightContent[item.id].title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      {spotlightContent[item.id].description}
                    </p>
                  </motion.button>
                );
              })}
            </div>

            <motion.div
              key={activeSpotlight.id}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="relative overflow-hidden rounded-4xl border border-white/10 bg-slate-950/60 p-6 backdrop-blur-xl lg:h-152 md:p-8"
            >
              <div
                className={`absolute inset-0 bg-linear-to-br ${activeSpotlight.accent}`}
              />
              <div className="relative flex h-full flex-col">
                <div className="mb-6">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-400">
                      {activeSpotlightContent.label}
                    </p>
                    <h3 className="mt-2 text-3xl font-black tracking-[-0.04em] text-white">
                      {activeSpotlightContent.title}
                    </h3>
                  </div>
                </div>

                <p className="max-w-2xl text-sm leading-6 text-slate-300 md:text-base md:leading-7">
                  {activeSpotlightContent.description}
                </p>

                <div className="mt-6 grid gap-3 md:grid-cols-3">
                  {activeSpotlightContent.points.map((point, index) => (
                    <div
                      key={point}
                      className="min-h-26 rounded-3xl border border-white/10 bg-white/6 p-4"
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                        0{index + 1}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-white">
                        {point}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="app-preview-scrollbar mt-6 grow overflow-y-auto rounded-3xl border border-white/10 bg-slate-900/70 p-5">
                  {activeSpotlight.id === "visualize" && (
                    <div className="grid gap-4 lg:grid-cols-[1.08fr_0.92fr]">
                      <div className="relative overflow-hidden rounded-3xl border border-cyan-300/15 bg-[#081520] p-5">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(34,211,238,0.18),transparent_32%),radial-gradient(circle_at_78%_26%,rgba(96,165,250,0.16),transparent_28%),radial-gradient(circle_at_62%_72%,rgba(45,212,191,0.14),transparent_30%)]" />
                        <div className="relative h-55">
                          {[
                            {
                              left: "10%",
                              top: "24%",
                              size: "h-10 w-10",
                              label: "Notes",
                            },
                            {
                              left: "35%",
                              top: "16%",
                              size: "h-16 w-16",
                              label: "Focus",
                            },
                            {
                              left: "68%",
                              top: "20%",
                              size: "h-12 w-12",
                              label: "Cluster",
                            },
                            {
                              left: "22%",
                              top: "62%",
                              size: "h-12 w-12",
                              label: "Agent",
                            },
                            {
                              left: "53%",
                              top: "54%",
                              size: "h-20 w-20",
                              label: "Graph",
                            },
                            {
                              left: "80%",
                              top: "63%",
                              size: "h-10 w-10",
                              label: "Ideas",
                            },
                          ].map((node, index) => (
                            <div key={node.label}>
                              <div
                                className="absolute h-px origin-left bg-linear-to-r from-cyan-300/50 to-transparent"
                                style={{
                                  left: index % 2 === 0 ? "18%" : "38%",
                                  top: index < 3 ? "37%" : "65%",
                                  width: index % 2 === 0 ? "42%" : "24%",
                                  transform: `rotate(${index % 2 === 0 ? 16 : -12}deg)`,
                                }}
                              />
                              <div
                                className={`absolute ${node.size} rounded-full border border-cyan-200/40 bg-cyan-300/14 backdrop-blur-sm`}
                                style={{ left: node.left, top: node.top }}
                              >
                                <div className="flex h-full w-full items-center justify-center text-[11px] font-semibold text-cyan-50">
                                  {node.label}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="rounded-[22px] border border-white/10 bg-white/6 p-4">
                          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100/70">
                            Summary
                          </p>
                          <p className="mt-3 text-sm leading-6 text-white/90">
                            Move through the graph with nearby relations and
                            focus summaries still in view.
                          </p>
                        </div>
                        <div className="rounded-[22px] border border-white/10 bg-white/6 p-4">
                          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100/70">
                            Path
                          </p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {[
                              "Snapshot",
                              "Focus node",
                              "Relations",
                              "Subcluster",
                            ].map((item) => (
                              <span
                                key={item}
                                className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-xs text-white/80"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {activeSpotlight.id === "microscope" && (
                    <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
                      <div className="space-y-3">
                        {[
                          "Selected notes",
                          "Conversation slice",
                          "Workspace group",
                        ].map((item, index) => (
                          <div
                            key={item}
                            className="rounded-[20px] border border-white/10 bg-white/6 p-4"
                          >
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-fuchsia-100/70">
                              0{index + 1}
                            </p>
                            <p className="mt-2 text-sm text-white">{item}</p>
                          </div>
                        ))}
                      </div>
                      <div className="rounded-3xl border border-fuchsia-300/15 bg-[#140c1b] p-5">
                        <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-fuchsia-100/75">
                          <span className="rounded-full border border-fuchsia-300/20 bg-fuchsia-300/10 px-3 py-1.5">
                            Microscope run
                          </span>
                          <span>Grouped output</span>
                        </div>
                        <div className="mt-5 space-y-3">
                          {[
                            [
                              "Patterns",
                              "Recurring ideas are grouped into one analysis workspace.",
                            ],
                            [
                              "Signals",
                              "High-similarity nodes surface as follow-up paths.",
                            ],
                            [
                              "Next action",
                              "Selected findings can move directly into agent tools.",
                            ],
                          ].map(([title, body]) => (
                            <div
                              key={title}
                              className="rounded-[18px] border border-white/10 bg-white/6 p-4"
                            >
                              <p className="text-sm font-semibold text-white">
                                {title}
                              </p>
                              <p className="mt-2 text-sm leading-5 text-slate-300">
                                {body}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  {activeSpotlight.id === "agent" && (
                    <div className="grid gap-4 lg:grid-cols-[0.88fr_1.12fr]">
                      <div className="rounded-[22px] border border-amber-300/15 bg-[#171209] p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-100/70">
                          Context attached
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {[
                            "Linked note",
                            "Graph cluster",
                            "Microscope finding",
                            "2 sources",
                          ].map((chip) => (
                            <span
                              key={chip}
                              className="rounded-full border border-amber-300/15 bg-amber-300/10 px-3 py-1.5 text-xs text-amber-50"
                            >
                              {chip}
                            </span>
                          ))}
                        </div>
                        <div className="mt-4 grid gap-2">
                          {[
                            "Summarize",
                            "Extract actions",
                            "Create note",
                            "Map relations",
                          ].map((action) => (
                            <div
                              key={action}
                              className="rounded-[14px] border border-white/10 bg-white/6 px-3 py-2 text-sm text-white/85"
                            >
                              {action}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="ml-auto max-w-[85%] rounded-[20px] rounded-br-md border border-white/10 bg-white/8 px-4 py-3 text-sm leading-6 text-white">
                          Turn the selected materials into a brief and call out
                          missing links.
                        </div>
                        <div className="max-w-[92%] rounded-[20px] rounded-bl-md border border-amber-300/15 bg-amber-300/10 px-4 py-3 text-sm leading-6 text-amber-50">
                          I grouped the context into three themes and drafted a
                          note you can keep editing.
                        </div>
                        <div className="grid gap-2 md:grid-cols-2">
                          {["Source-aware answer", "Action result"].map(
                            (item) => (
                              <div
                                key={item}
                                className="rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-sm text-slate-200"
                              >
                                {item}
                              </div>
                            ),
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  {activeSpotlight.id === "search-sync" && (
                    <div className="grid h-full gap-4 lg:grid-cols-[1fr_0.92fr]">
                      <div className="rounded-3xl border border-emerald-300/15 bg-[#081712] p-4">
                        <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-slate-300">
                          Search notes, threads, and folders...
                        </div>
                        <div className="mt-4 space-y-2">
                          {[
                            ["Writing is telepathy", "Matched in notes"],
                            ["Agent graph summary thread", "Matched in chat"],
                            ["Microscope findings", "Matched in workspace"],
                          ].map(([title, meta]) => (
                            <div
                              key={title}
                              className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/6 px-4 py-3"
                            >
                              <div>
                                <p className="text-sm text-white">{title}</p>
                                <p className="mt-1 text-xs text-slate-400">
                                  {meta}
                                </p>
                              </div>
                              <span className="rounded-full bg-emerald-300/10 px-2.5 py-1 text-[11px] text-emerald-100">
                                Hit
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="rounded-3xl border border-white/10 bg-white/6 p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-100/70">
                          Sync state
                        </p>
                        <div className="mt-4 space-y-3">
                          {[
                            ["Local edit", "Saved to note cache", "done"],
                            ["Merge", "Resolved with latest write", "live"],
                            ["Push", "Synced to workspace", "done"],
                          ].map(([title, body, state]) => (
                            <div key={title} className="flex items-start gap-3">
                              <span
                                className={`mt-1 h-2.5 w-2.5 rounded-full ${state === "live" ? "bg-emerald-300 shadow-[0_0_14px_rgba(52,211,153,0.65)]" : "bg-slate-500"}`}
                              />
                              <div className="rounded-2xl border border-white/10 bg-black/15 px-4 py-3">
                                <p className="text-sm text-white">{title}</p>
                                <p className="mt-1 text-xs text-slate-400">
                                  {body}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="px-4 py-18 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl rounded-[34px] border border-white/10 bg-linear-to-br from-slate-900/85 via-slate-950/86 to-cyan-950/45 p-6 md:p-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65 }}
            className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between"
          >
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-cyan-200/75">
                {t("download.pipeline.eyebrow", {
                  defaultValue: "What powers the experience",
                })}
              </p>
              <h2 className="max-w-3xl text-4xl font-black tracking-[-0.04em] text-white md:text-5xl">
                {t("download.pipeline.title", {
                  defaultValue:
                    "A homepage section that now reflects the backend pipeline too",
                })}
              </h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-slate-300">
              {t("download.pipeline.description", {
                defaultValue:
                  "The backend already supports queued graph generation, summaries, microscope analysis, agent tools, and synchronization, so the landing page now tells that story clearly.",
              })}
            </p>
          </motion.div>

          <div className="grid gap-5 lg:grid-cols-4">
            {backendPipeline.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: index * 0.07, duration: 0.5 }}
                whileHover={{ y: -6 }}
                className="rounded-3xl border border-white/10 bg-white/6 p-5"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-100/80">
                  {item.step}
                </p>
                <h3 className="mt-4 text-2xl font-bold text-white">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-slate-300">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-18 pt-8 md:px-8 md:pb-24 md:pt-10">
        <div className="mx-auto max-w-7xl rounded-[36px] border border-white/10 bg-white/6 px-6 py-10 backdrop-blur md:px-10 md:py-12">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-cyan-200/75">
                {t("download.platforms.eyebrow", {
                  defaultValue: "Ready to install",
                })}
              </p>
              <h2 className="text-4xl font-black tracking-[-0.04em] text-white md:text-5xl">
                {t("download.platforms.title")}
              </h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-slate-300">
              {t("download.platforms.description", {
                defaultValue:
                  "Choose your platform and jump into a more animated, more visual GraphNode experience.",
              })}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {platforms.map((platform, index) => (
              <motion.div
                key={platform.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: index * 0.08, duration: 0.6 }}
                whileHover={{ y: -8 }}
                className="rounded-[30px] border border-white/10 bg-slate-950/55 p-5 shadow-[0_20px_80px_rgba(2,6,23,0.22)] sm:p-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="rounded-2xl border border-white/10 bg-white/6 p-3">
                      {platform.icon ? (
                        <img
                          src={platform.icon}
                          alt={platform.name}
                          className="h-10 w-10 object-contain"
                        />
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/8 text-xl">
                          {t("download.platforms.mobileEmoji", {
                            defaultValue: "📱",
                          })}
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white sm:text-2xl">
                        {platform.name}
                      </h3>
                      <p className="text-sm text-slate-400">Beta 2.0.0</p>
                    </div>
                  </div>
                </div>

                <p className="mt-5 min-h-18 text-sm leading-6 text-slate-300">
                  {platform.description}
                </p>

                <div className="mt-6 space-y-3">
                  {platform.versions.map((version) => (
                    <a
                      key={version.label}
                      href={version.link}
                      className={`block rounded-2xl px-4 py-3 text-center text-sm font-semibold transition duration-300 ${
                        version.link === "#"
                          ? "cursor-default border border-white/10 bg-white/6 text-slate-400"
                          : "bg-white text-slate-950 hover:-translate-y-0.5 hover:bg-cyan-100"
                      }`}
                    >
                      {version.label}
                    </a>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
