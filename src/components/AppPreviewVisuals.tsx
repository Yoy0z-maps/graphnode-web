/* eslint-disable react-refresh/only-export-components */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type AccentTone = {
  solid: string;
  ring: string;
  surface: string;
  glow: string;
};

const GRAPH_ACCENTS: AccentTone[] = [
  {
    solid: "#22d3ee",
    ring: "rgba(34, 211, 238, 0.35)",
    surface: "rgba(34, 211, 238, 0.12)",
    glow: "rgba(34, 211, 238, 0.18)",
  },
  {
    solid: "#60a5fa",
    ring: "rgba(96, 165, 250, 0.34)",
    surface: "rgba(96, 165, 250, 0.12)",
    glow: "rgba(96, 165, 250, 0.18)",
  },
  {
    solid: "#f472b6",
    ring: "rgba(244, 114, 182, 0.34)",
    surface: "rgba(244, 114, 182, 0.12)",
    glow: "rgba(244, 114, 182, 0.18)",
  },
  {
    solid: "#fbbf24",
    ring: "rgba(251, 191, 36, 0.34)",
    surface: "rgba(251, 191, 36, 0.12)",
    glow: "rgba(251, 191, 36, 0.18)",
  },
];

type GraphClusterTemplate = {
  key: string;
  name: string;
  description: string;
  keywords: string[];
  nodeTitles: string[];
  sourceType: "chat" | "markdown" | "notion";
};

type GraphPreviewCluster = {
  id: string;
  name: string;
  description: string;
  topKeywords: string[];
  nodeCount: number;
  density: number;
  accent: AccentTone;
  center: { x: number; y: number; r: number };
};

export type GraphPreviewNode = {
  id: number;
  origId: string;
  nodeTitle: string;
  clusterId: string;
  clusterName: string;
  numMessages: number;
  sourceType: "chat" | "markdown" | "notion";
  x: number;
  y: number;
  edgeCount: number;
  size: number;
};

type GraphPreviewEdge = {
  id: string;
  source: number;
  target: number;
  weight: number;
  type: "hard" | "insight";
  intraCluster: boolean;
};

type GraphPreviewSubcluster = {
  id: string;
  clusterId: string;
  title: string;
  nodeIds: number[];
  size: number;
  density: number;
};

export type GraphPreviewCollection = {
  id: string;
  name: string;
  updatedAt: string;
  stats: {
    nodes: number;
    edges: number;
    clusters: number;
  };
  summary: string;
  patterns: string[];
  clusters: GraphPreviewCluster[];
  subclusters: GraphPreviewSubcluster[];
  nodes: GraphPreviewNode[];
  edges: GraphPreviewEdge[];
  focusNodeId: number;
};

type MicroscopeRawNode = {
  name: string;
  type: string;
  sourceChunkId: number;
  description: string;
};

type MicroscopeRawEdge = {
  start: string;
  target: string;
  type: string;
  sourceChunkId: number;
  description: string;
  confidence: number;
};

type MicroscopeInsightTone = "focus" | "bridge" | "action";

type MicroscopeWorkspaceGroup = {
  title: string;
  meta: string;
};

type MicroscopeInsight = {
  title: string;
  body: string;
  tone: MicroscopeInsightTone;
};

export type MicroscopePreviewWorkspace = {
  id: string;
  name: string;
  createdAt: string;
  summary: string;
  status: string;
  groups: MicroscopeWorkspaceGroup[];
  insights: MicroscopeInsight[];
  agentPrompt: string;
  focusNodeNames: string[];
  data: Array<{
    nodes: MicroscopeRawNode[];
    edges: MicroscopeRawEdge[];
  }>;
  layout: Record<string, { x: number; y: number }>;
  nodeCount: number;
  edgeCount: number;
};

type FlattenedMicroscopeNode = {
  id: string;
  name: string;
  type: string;
  description: string;
  x: number;
  y: number;
};

type FlattenedMicroscopeEdge = {
  id: string;
  source: string;
  target: string;
  type: string;
  description: string;
  confidence: number;
};

const GRAPH_CLUSTER_LIBRARY: GraphClusterTemplate[] = [
  {
    key: "product",
    name: "Product System",
    description: "Launch, onboarding, feedback, and pricing work stay linked.",
    keywords: ["launch", "feedback", "onboarding", "pricing"],
    nodeTitles: [
      "Launch checklist",
      "Beta feedback",
      "Onboarding flow",
      "Pricing notes",
      "Activation loop",
      "Support themes",
      "Retention cues",
      "Release blockers",
    ],
    sourceType: "chat",
  },
  {
    key: "knowledge",
    name: "Knowledge Ops",
    description: "Notes, retrieval, and ranking signals form one searchable layer.",
    keywords: ["notes", "search", "ranking", "retrieval"],
    nodeTitles: [
      "Semantic retrieval",
      "Graph ranking notes",
      "Search signals",
      "Linked note cache",
      "Reference folding",
      "Source chips",
      "Recall tests",
      "Context windows",
    ],
    sourceType: "markdown",
  },
  {
    key: "agents",
    name: "Agent Flow",
    description: "Agent context handoff and action routing connect across work.",
    keywords: ["handoff", "agent", "actions", "tools"],
    nodeTitles: [
      "Tool routing",
      "Context handoff",
      "Action queue",
      "Source-aware replies",
      "Follow-up tasks",
      "Workspace prompts",
      "Agent memory",
      "Task retries",
    ],
    sourceType: "chat",
  },
  {
    key: "microscope",
    name: "Microscope Signals",
    description: "Patterns and evidence can be promoted into focused analysis runs.",
    keywords: ["patterns", "evidence", "workspace", "signals"],
    nodeTitles: [
      "Pattern overlap",
      "Idea fragments",
      "Evidence trail",
      "Missing links",
      "Workspace groups",
      "Analysis outputs",
      "Signal ladder",
      "Review packet",
    ],
    sourceType: "markdown",
  },
];

const GRAPH_COLLECTION_CONFIGS = [
  {
    id: "knowledge-graph",
    name: "Knowledge Graph",
    updatedAt: "Updated 6m ago",
    summary:
      "Graph snapshot and summary agree on one thing: notes, agent output, and search behavior cluster around the same core topics.",
  },
  {
    id: "product-cluster",
    name: "Product cluster",
    updatedAt: "Synced 12m ago",
    summary:
      "Recent work concentrates around launch readiness, onboarding clarity, and first-run understanding for new users.",
  },
  {
    id: "agent-workflows",
    name: "Agent workflows",
    updatedAt: "Generated 18m ago",
    summary:
      "The strongest bridges in this view come from source chips, context handoff, and next-step automation inside the app.",
  },
  {
    id: "microscope-context",
    name: "Microscope context",
    updatedAt: "Generated 25m ago",
    summary:
      "Microscope findings are tightly connected to graph summaries, making it easier to move from exploration into action.",
  },
  {
    id: "semantic-links",
    name: "Semantic links",
    updatedAt: "Updated 41m ago",
    summary:
      "Cross-cluster links reveal where search, writing, and product thinking keep reinforcing each other over time.",
  },
] as const;

const MICROSCOPE_WORKSPACE_CONFIGS = [
  {
    id: "telepathy-workspace",
    name: "Telepathy workspace",
    createdAt: "Created 9m ago",
    status: "Generated",
    summary:
      "Writing, signal extraction, and note promotion are grouped into one workspace with clear evidence paths.",
    groups: [
      { title: "Writing signals", meta: "4 related notes" },
      { title: "Conversation fragments", meta: "3 selected chats" },
      { title: "Missing links", meta: "2 unresolved patterns" },
    ],
    insights: [
      {
        title: "Patterns",
        body: "Repeated metaphor language keeps linking writing notes, chat summaries, and graph bridges.",
        tone: "focus" as const,
      },
      {
        title: "Signals",
        body: "Source overlap suggests the same concept appears across notes, summaries, and graph paths.",
        tone: "bridge" as const,
      },
      {
        title: "Next actions",
        body: "Promote the strongest group into a reusable note, then hand the focused nodes to the agent.",
        tone: "action" as const,
      },
    ],
    agentPrompt:
      "Turn the strongest metaphor cluster into one note, one agent task, and one follow-up graph query.",
    focusNodeNames: [
      "Writing is telepathy",
      "Transmission image",
      "Reader context",
    ],
    nodeTemplates: [
      {
        name: "Writing is telepathy",
        type: "Paper",
        description: "Core source note anchoring the workspace.",
      },
      {
        name: "Transmission image",
        type: "Concept",
        description: "A repeated metaphor around sending meaning through writing.",
      },
      {
        name: "Reader context",
        type: "Signal",
        description: "Receiving place and reading conditions appear in multiple sources.",
      },
      {
        name: "Metaphor overlap",
        type: "Pattern",
        description: "The same phrasing recurs across note excerpts and summaries.",
      },
      {
        name: "Memory graph",
        type: "Concept",
        description: "The graph keeps the writing theme connected to surrounding notes.",
      },
      {
        name: "Source quotes",
        type: "Signal",
        description: "Quoted evidence reinforces why the cluster exists.",
      },
      {
        name: "Agent draft",
        type: "Action",
        description: "A handoff candidate for expansion or summarization.",
      },
      {
        name: "Publish note",
        type: "Action",
        description: "A durable note output for the workspace.",
      },
    ],
    edgeTemplates: [
      ["Writing is telepathy", "Transmission image", "explains"],
      ["Transmission image", "Reader context", "connects"],
      ["Reader context", "Metaphor overlap", "supports"],
      ["Metaphor overlap", "Agent draft", "promotes"],
      ["Writing is telepathy", "Memory graph", "appears-in"],
      ["Memory graph", "Source quotes", "grounds"],
      ["Source quotes", "Agent draft", "feeds"],
      ["Agent draft", "Publish note", "outputs"],
    ],
  },
  {
    id: "weekly-product-signals",
    name: "Weekly product signals",
    createdAt: "Created 22m ago",
    status: "Ready",
    summary:
      "Beta feedback, onboarding friction, and launch copy questions are grouped into a single decision workspace.",
    groups: [
      { title: "Beta feedback", meta: "5 user notes" },
      { title: "Launch copy", meta: "2 active threads" },
      { title: "Onboarding gaps", meta: "3 recurring issues" },
    ],
    insights: [
      {
        title: "Patterns",
        body: "Most signals point to first-run clarity rather than missing power features.",
        tone: "focus" as const,
      },
      {
        title: "Signals",
        body: "Users understand chat and notes quickly, but graph entry points still need stronger framing.",
        tone: "bridge" as const,
      },
      {
        title: "Next actions",
        body: "Bundle onboarding copy updates with one note-to-graph interaction change for a tighter release.",
        tone: "action" as const,
      },
    ],
    agentPrompt:
      "Summarize the strongest onboarding issue, link it to graph discoverability, and draft one release task.",
    focusNodeNames: ["Beta feedback", "Graph entry point", "Release task"],
    nodeTemplates: [
      {
        name: "Beta feedback",
        type: "Paper",
        description: "Latest feedback collection from desktop beta users.",
      },
      {
        name: "Onboarding friction",
        type: "Signal",
        description: "Users ask how notes become graph nodes.",
      },
      {
        name: "Graph entry point",
        type: "Concept",
        description: "The first visible path from writing into connected structure.",
      },
      {
        name: "Source chips",
        type: "Pattern",
        description: "Repeated demand for more visible provenance on answers.",
      },
      {
        name: "Launch copy",
        type: "Paper",
        description: "Messaging draft for the landing page and downloads.",
      },
      {
        name: "Release task",
        type: "Action",
        description: "Concrete follow-up item with scope and owner.",
      },
      {
        name: "Retention signal",
        type: "Signal",
        description: "Friction at onboarding strongly predicts drop-off.",
      },
      {
        name: "Agent handoff",
        type: "Action",
        description: "Workspace results passed into the assistant for drafting.",
      },
    ],
    edgeTemplates: [
      ["Beta feedback", "Onboarding friction", "reveals"],
      ["Onboarding friction", "Graph entry point", "points-to"],
      ["Graph entry point", "Source chips", "relates"],
      ["Source chips", "Release task", "informs"],
      ["Launch copy", "Retention signal", "shapes"],
      ["Retention signal", "Release task", "prioritizes"],
      ["Graph entry point", "Agent handoff", "feeds"],
      ["Agent handoff", "Release task", "creates"],
    ],
  },
  {
    id: "knowledge-gaps",
    name: "Knowledge gaps",
    createdAt: "Created 34m ago",
    status: "Generated",
    summary:
      "Search misses, weak graph bridges, and missing summaries are grouped into a review flow for the next iteration.",
    groups: [
      { title: "Sparse links", meta: "6 isolated notes" },
      { title: "Search misses", meta: "3 unclear results" },
      { title: "Summary debt", meta: "2 stale clusters" },
    ],
    insights: [
      {
        title: "Patterns",
        body: "Disconnected notes often come from thin metadata rather than absent ideas.",
        tone: "focus" as const,
      },
      {
        title: "Signals",
        body: "When graph summaries are stale, retrieval quality feels weaker even if the source notes are strong.",
        tone: "bridge" as const,
      },
      {
        title: "Next actions",
        body: "Refresh one stale cluster, connect the strongest orphan note, and test the new search ordering.",
        tone: "action" as const,
      },
    ],
    agentPrompt:
      "Identify the most expensive missing connection, refresh the summary, and propose one retrieval fix.",
    focusNodeNames: ["Sparse links", "Summary debt", "Retrieval fix"],
    nodeTemplates: [
      {
        name: "Sparse links",
        type: "Paper",
        description: "A review note listing under-connected graph areas.",
      },
      {
        name: "Search misses",
        type: "Signal",
        description: "Queries that feel right but still return weak matches.",
      },
      {
        name: "Summary debt",
        type: "Pattern",
        description: "Clusters that no longer reflect recent work.",
      },
      {
        name: "Metadata drift",
        type: "Concept",
        description: "Labels and summaries stop matching note content over time.",
      },
      {
        name: "Retrieval fix",
        type: "Action",
        description: "One scoped change to improve relevance and clarity.",
      },
      {
        name: "Orphan note",
        type: "Paper",
        description: "A valuable note that has not been pulled into the graph strongly enough.",
      },
      {
        name: "Cluster refresh",
        type: "Action",
        description: "A summary regeneration task triggered from the workspace.",
      },
      {
        name: "Bridge concept",
        type: "Concept",
        description: "A missing semantic connector that should tie multiple areas together.",
      },
    ],
    edgeTemplates: [
      ["Sparse links", "Metadata drift", "suggests"],
      ["Metadata drift", "Search misses", "causes"],
      ["Search misses", "Retrieval fix", "guides"],
      ["Summary debt", "Cluster refresh", "requires"],
      ["Orphan note", "Bridge concept", "needs"],
      ["Bridge concept", "Retrieval fix", "supports"],
      ["Cluster refresh", "Retrieval fix", "improves"],
      ["Summary debt", "Bridge concept", "blocks"],
    ],
  },
] as const;

function createSeededRandom(seed: number) {
  let current = seed;
  return () => {
    const value = Math.sin(current++) * 10000;
    return value - Math.floor(value);
  };
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function sampleWithoutReplacement<T>(
  items: T[],
  count: number,
  random: () => number,
) {
  const pool = [...items];
  const result: T[] = [];

  while (pool.length > 0 && result.length < count) {
    const index = Math.floor(random() * pool.length);
    const [item] = pool.splice(index, 1);
    if (item !== undefined) result.push(item);
  }

  return result;
}

function buildGraphCollection(
  config: (typeof GRAPH_COLLECTION_CONFIGS)[number],
  index: number,
): GraphPreviewCollection {
  const random = createSeededRandom(31 + index * 17);
  const clusterTemplates = GRAPH_CLUSTER_LIBRARY.map(
    (_, clusterIndex) =>
      GRAPH_CLUSTER_LIBRARY[
        (clusterIndex + index) % GRAPH_CLUSTER_LIBRARY.length
      ]!,
  );
  const centers = [
    { x: 24, y: 28, r: 15 },
    { x: 73, y: 25, r: 15 },
    { x: 31, y: 72, r: 17 },
    { x: 74, y: 68, r: 16 },
  ];

  let nextNodeId = 1;
  const nodes: GraphPreviewNode[] = [];
  const clusters: GraphPreviewCluster[] = [];
  const subclusters: GraphPreviewSubcluster[] = [];
  const clusterStructures: Array<{
    all: number[];
    primary: number[];
    secondary: number[];
    standalone: number[];
    isolated: number[];
  }> = [];
  const edgeSet = new Set<string>();
  const edges: GraphPreviewEdge[] = [];

  const addEdge = (
    source: number,
    target: number,
    type: "hard" | "insight",
    intraCluster: boolean,
  ) => {
    const key = [source, target].sort((a, b) => a - b).join("-");
    if (edgeSet.has(key)) return;
    edgeSet.add(key);
    edges.push({
      id: `${config.id}-${key}`,
      source,
      target,
      weight: Number((0.48 + random() * 0.4).toFixed(2)),
      type,
      intraCluster,
    });
  };

  clusterTemplates.forEach((template, clusterIndex) => {
    const accent = GRAPH_ACCENTS[clusterIndex % GRAPH_ACCENTS.length]!;
    const center = centers[clusterIndex]!;
    const selectedTitles = sampleWithoutReplacement(
      template.nodeTitles,
      template.nodeTitles.length,
      random,
    );
    const clusterId = `${config.id}-${template.key}`;
    const primaryTitles = selectedTitles.slice(0, 3);
    const secondaryTitles = selectedTitles.slice(3, 6);
    const standaloneTitles = selectedTitles.slice(6);
    const connectedStandaloneTitles = standaloneTitles.slice(
      0,
      Math.max(standaloneTitles.length - 1, 0),
    );
    const isolatedTitles = standaloneTitles.slice(connectedStandaloneTitles.length);
    const segmentConfigs = [
      {
        kind: "subcluster" as const,
        title: `${template.keywords[0]} + ${template.keywords[1]}`,
        titles: primaryTitles,
        anchorAngle: -2.2,
        anchorDistance: center.r * 0.42,
      },
      {
        kind: "subcluster" as const,
        title: `${template.keywords[1]} + ${template.keywords[2]}`,
        titles: secondaryTitles,
        anchorAngle: 0.15,
        anchorDistance: center.r * 0.38,
      },
      {
        kind: "standalone" as const,
        titles: connectedStandaloneTitles,
        anchorAngle: 1.9,
        anchorDistance: center.r * 0.3,
      },
      {
        kind: "isolated" as const,
        titles: isolatedTitles,
        anchorAngle: 2.7,
        anchorDistance: center.r * 0.6,
      },
    ];

    const segmentNodeIds: number[][] = [];
    const clusterNodeList: GraphPreviewNode[] = [];

    segmentConfigs.forEach((segment, segmentIndex) => {
      const anchorX =
        center.x + Math.cos(segment.anchorAngle) * segment.anchorDistance;
      const anchorY =
        center.y + Math.sin(segment.anchorAngle) * segment.anchorDistance;
      const ids: number[] = [];

      segment.titles.forEach((title, titleIndex) => {
        const angularSpread =
          segment.anchorAngle +
          (titleIndex - (segment.titles.length - 1) / 2) * 0.75 +
          (random() - 0.5) * 0.28;
        const radialSpread =
          segment.kind === "standalone"
            ? 2 + titleIndex * 2.4 + random() * 1.4
            : segment.kind === "isolated"
              ? 1.8 + titleIndex * 1.6 + random() * 1.2
            : 3 + titleIndex * 1.8 + random() * 1.6;
        const x = clamp(
          anchorX + Math.cos(angularSpread) * radialSpread,
          9,
          91,
        );
        const y = clamp(
          anchorY + Math.sin(angularSpread) * radialSpread,
          10,
          90,
        );
        const node: GraphPreviewNode = {
          id: nextNodeId++,
          origId: title,
          nodeTitle: title,
          clusterId,
          clusterName: template.name,
          numMessages: 5 + Math.floor(random() * 16),
          sourceType: template.sourceType,
          x,
          y,
          edgeCount: 0,
          size: 18 + Math.round(random() * 6),
        };
        ids.push(node.id);
        clusterNodeList.push(node);
      });

      if (segment.kind === "subcluster" && ids.length > 0) {
        subclusters.push({
          id: `${clusterId}-subcluster-${segmentIndex + 1}`,
          clusterId,
          title: segment.title,
          nodeIds: ids,
          size: ids.length,
          density: Number((0.56 + random() * 0.24).toFixed(2)),
        });
      }

      segmentNodeIds.push(ids);
    });

    const [primaryIds, secondaryIds, standaloneIds, isolatedIds] = segmentNodeIds;
    const clusterNodeIdList = clusterNodeList.map((node) => node.id);
    clusterStructures.push({
      all: clusterNodeIdList,
      primary: primaryIds ?? [],
      secondary: secondaryIds ?? [],
      standalone: standaloneIds ?? [],
      isolated: isolatedIds ?? [],
    });
    nodes.push(...clusterNodeList);

    const density = Number((0.48 + random() * 0.34).toFixed(2));
    clusters.push({
      id: clusterId,
      name: template.name,
      description: template.description,
      topKeywords: template.keywords.slice(0, 3),
      nodeCount: clusterNodeIdList.length,
      density,
      accent,
      center,
    });

    [primaryIds ?? [], secondaryIds ?? []].forEach((groupIds) => {
      groupIds.forEach((nodeId, nodeIndex) => {
        if (nodeIndex > 0) {
          addEdge(groupIds[0]!, nodeId, "hard", true);
        }
        const nextId = groupIds[nodeIndex + 1];
        if (nextId !== undefined) {
          addEdge(nodeId, nextId, "hard", true);
        }
      });

      if (groupIds.length >= 3) {
        addEdge(groupIds[1]!, groupIds[groupIds.length - 1]!, "insight", true);
      }
    });

    if (primaryIds?.length && secondaryIds?.length) {
      addEdge(
        primaryIds[primaryIds.length - 1]!,
        secondaryIds[0]!,
        "insight",
        true,
      );
      addEdge(primaryIds[0]!, secondaryIds[secondaryIds.length - 1]!, "insight", true);
    }

    standaloneIds?.forEach((nodeId, standaloneIndex) => {
      const primaryTarget =
        primaryIds?.[standaloneIndex % Math.max(primaryIds.length, 1)];
      const secondaryTarget =
        secondaryIds?.[
          (secondaryIds.length - 1 - standaloneIndex + secondaryIds.length) %
            Math.max(secondaryIds.length, 1)
        ];

      if (primaryTarget !== undefined) {
        addEdge(nodeId, primaryTarget, "hard", true);
      }
      if (secondaryTarget !== undefined) {
        addEdge(nodeId, secondaryTarget, "insight", true);
      }
      if (standaloneIndex > 0) {
        addEdge(standaloneIds[standaloneIndex - 1]!, nodeId, "insight", true);
      }
    });
  });

  clusterStructures.forEach((clusterStructure, clusterIndex) => {
    const nextClusterStructure = clusterStructures[clusterIndex + 1];
    if (!nextClusterStructure) return;

    const source =
      clusterStructure.secondary[clusterStructure.secondary.length - 1] ??
      clusterStructure.all[clusterStructure.all.length - 1];
    const target =
      nextClusterStructure.primary[0] ?? nextClusterStructure.all[0];
    if (source !== undefined && target !== undefined) {
      addEdge(source, target, "insight", false);
    }

    const standaloneSource = clusterStructure.standalone[0];
    const standaloneTarget =
      nextClusterStructure.standalone[nextClusterStructure.standalone.length - 1];
    if (standaloneSource !== undefined && standaloneTarget !== undefined) {
      addEdge(standaloneSource, standaloneTarget, "insight", false);
    }
  });

  if (
    clusterStructures[0]?.primary[1] !== undefined &&
    clusterStructures[3]?.secondary[1] !== undefined
  ) {
    addEdge(
      clusterStructures[0].primary[1],
      clusterStructures[3].secondary[1],
      "insight",
      false,
    );
  }
  if (
    clusterStructures[1]?.secondary[0] !== undefined &&
    clusterStructures[2]?.primary[1] !== undefined
  ) {
    addEdge(
      clusterStructures[1].secondary[0],
      clusterStructures[2].primary[1],
      "insight",
      false,
    );
  }
  if (
    clusterStructures[0]?.standalone[1] !== undefined &&
    clusterStructures[2]?.standalone[0] !== undefined
  ) {
    addEdge(
      clusterStructures[0].standalone[1],
      clusterStructures[2].standalone[0],
      "insight",
      false,
    );
  }

  const edgeCounts = new Map<number, number>();
  nodes.forEach((node) => edgeCounts.set(node.id, 0));
  edges.forEach((edge) => {
    edgeCounts.set(edge.source, (edgeCounts.get(edge.source) ?? 0) + 1);
    edgeCounts.set(edge.target, (edgeCounts.get(edge.target) ?? 0) + 1);
  });

  const populatedNodes = nodes.map((node) => ({
    ...node,
    edgeCount: edgeCounts.get(node.id) ?? 0,
  }));
  const focusNodeId =
    [...populatedNodes].sort((a, b) => b.edgeCount - a.edgeCount)[0]?.id ??
    populatedNodes[0]?.id ??
    1;

  const patterns = [
    `${clusters[0]?.topKeywords[0] ?? "notes"} stays tightly linked to ${clusters[1]?.topKeywords[0] ?? "search"}`,
    `${clusters[2]?.topKeywords[1] ?? "agent"} bridges into ${clusters[3]?.topKeywords[0] ?? "signals"}`,
    `${config.name} highlights ${clusters[1]?.topKeywords[2] ?? "retrieval"} as a recurring connector`,
  ];

  return {
    id: config.id,
    name: config.name,
    updatedAt: config.updatedAt,
    stats: {
      nodes: populatedNodes.length,
      edges: edges.length,
      clusters: clusters.length,
    },
    summary: config.summary,
    patterns,
    clusters,
    subclusters,
    nodes: populatedNodes,
    edges,
    focusNodeId,
  };
}

function buildMicroscopeWorkspace(
  config: (typeof MICROSCOPE_WORKSPACE_CONFIGS)[number],
  index: number,
): MicroscopePreviewWorkspace {
  const random = createSeededRandom(101 + index * 23);
  const chunkSize = 3;
  const data = [];
  for (let chunkIndex = 0; chunkIndex < config.nodeTemplates.length; chunkIndex += chunkSize) {
    const chunkNodes = config.nodeTemplates
      .slice(chunkIndex, chunkIndex + chunkSize)
      .map((node) => ({
        ...node,
        sourceChunkId: Math.floor(chunkIndex / chunkSize) + 1,
      }));

    const nodeNames = new Set(chunkNodes.map((node) => node.name));
    const chunkEdges = config.edgeTemplates
      .filter(([start, target]) => nodeNames.has(start) || nodeNames.has(target))
      .map(([start, target, type]) => ({
        start,
        target,
        type,
        sourceChunkId: Math.floor(chunkIndex / chunkSize) + 1,
        description: `${type} relation between ${start} and ${target}`,
        confidence: Number((0.56 + random() * 0.34).toFixed(2)),
      }));

    data.push({ nodes: chunkNodes, edges: chunkEdges });
  }

  const flatNodes = flattenMicroscopeWorkspace({
    id: config.id,
    name: config.name,
    createdAt: config.createdAt,
    summary: config.summary,
    status: config.status,
    groups: [...config.groups],
    insights: [...config.insights],
    agentPrompt: config.agentPrompt,
    focusNodeNames: [...config.focusNodeNames],
    data,
    layout: {},
    nodeCount: 0,
    edgeCount: 0,
  }).nodes;

  const typeCenters: Record<string, { x: number; y: number }> = {
    Paper: { x: 50, y: 18 },
    Concept: { x: 25, y: 39 },
    Signal: { x: 75, y: 39 },
    Pattern: { x: 30, y: 74 },
    Action: { x: 73, y: 74 },
  };

  const layout: Record<string, { x: number; y: number }> = {};
  flatNodes.forEach((node, nodeIndex) => {
    const center = typeCenters[node.type] ?? { x: 50, y: 50 };
    const angle = (nodeIndex / Math.max(flatNodes.length, 1)) * Math.PI * 2;
    const radius = 6 + random() * 8;
    layout[node.id] = {
      x: clamp(center.x + Math.cos(angle + random()) * radius, 12, 88),
      y: clamp(center.y + Math.sin(angle + random()) * radius, 12, 88),
    };
  });

  const flattened = flattenMicroscopeWorkspace({
    id: config.id,
    name: config.name,
    createdAt: config.createdAt,
    summary: config.summary,
    status: config.status,
    groups: [...config.groups],
    insights: [...config.insights],
    agentPrompt: config.agentPrompt,
    focusNodeNames: [...config.focusNodeNames],
    data,
    layout,
    nodeCount: 0,
    edgeCount: 0,
  });

  return {
    id: config.id,
    name: config.name,
    createdAt: config.createdAt,
    summary: config.summary,
    status: config.status,
    groups: [...config.groups],
    insights: [...config.insights],
    agentPrompt: config.agentPrompt,
    focusNodeNames: [...config.focusNodeNames],
    data,
    layout,
    nodeCount: flattened.nodes.length,
    edgeCount: flattened.edges.length,
  };
}

function flattenMicroscopeWorkspace(workspace: MicroscopePreviewWorkspace): {
  nodes: FlattenedMicroscopeNode[];
  edges: FlattenedMicroscopeEdge[];
} {
  const nodeMap = new Map<string, FlattenedMicroscopeNode>();
  const edgeMap = new Map<string, FlattenedMicroscopeEdge>();

  workspace.data.forEach((chunk) => {
    chunk.nodes.forEach((node) => {
      const key = `${node.name}::${node.type}`;
      const position = workspace.layout[key] ?? { x: 50, y: 50 };
      if (!nodeMap.has(key)) {
        nodeMap.set(key, {
          id: key,
          name: node.name,
          type: node.type,
          description: node.description,
          x: position.x,
          y: position.y,
        });
      }
    });
  });

  workspace.data.forEach((chunk) => {
    chunk.edges.forEach((edge) => {
      const sourceKey = [...nodeMap.keys()].find((key) =>
        key.startsWith(`${edge.start}::`),
      );
      const targetKey = [...nodeMap.keys()].find((key) =>
        key.startsWith(`${edge.target}::`),
      );
      if (!sourceKey || !targetKey) return;
      const key = `${sourceKey}-${targetKey}-${edge.type}`;
      if (!edgeMap.has(key)) {
        edgeMap.set(key, {
          id: key,
          source: sourceKey,
          target: targetKey,
          type: edge.type,
          description: edge.description,
          confidence: edge.confidence,
        });
      }
    });
  });

  return {
    nodes: Array.from(nodeMap.values()),
    edges: Array.from(edgeMap.values()),
  };
}

const MICROSCOPE_COLOR_PALETTE = [
  { fill: "#8b5cf6", stroke: "#6d28d9", gradient: "#a78bfa" },
  { fill: "#3b82f6", stroke: "#1d4ed8", gradient: "#60a5fa" },
  { fill: "#10b981", stroke: "#047857", gradient: "#34d399" },
  { fill: "#f43f5e", stroke: "#be123c", gradient: "#fb7185" },
  { fill: "#f59e0b", stroke: "#b45309", gradient: "#fbbf24" },
  { fill: "#06b6d4", stroke: "#0e7490", gradient: "#22d3ee" },
] as const;

const MICROSCOPE_EDGE_PALETTE = [
  "#8b5cf6",
  "#3b82f6",
  "#10b981",
  "#f43f5e",
  "#f59e0b",
  "#06b6d4",
] as const;

const MICROSCOPE_FALLBACK_NODE_COLOR = {
  fill: "#6b7280",
  stroke: "#4b5563",
  gradient: "#9ca3af",
};
const MICROSCOPE_FALLBACK_EDGE_COLOR = "#6b7280";
const MICROSCOPE_CANVAS_WIDTH = 1040;
const MICROSCOPE_CANVAS_HEIGHT = 640;
const MICROSCOPE_NODE_RADIUS = 18;

type MicroscopeViewMode = "network" | "cluster";

type MicroscopeDisplayNode = {
  id: string;
  name: string;
  type: string;
  description: string;
  x: number;
  y: number;
  edgeCount: number;
  hasEdges: boolean;
};

function getMicroscopeNodeColors(type: string, allTypes: string[]) {
  const idx = allTypes.indexOf(type);
  if (idx < 0) return MICROSCOPE_FALLBACK_NODE_COLOR;
  return (
    MICROSCOPE_COLOR_PALETTE[idx % MICROSCOPE_COLOR_PALETTE.length] ??
    MICROSCOPE_FALLBACK_NODE_COLOR
  );
}

function getMicroscopeEdgeColor(type: string, allTypes: string[]) {
  const idx = allTypes.indexOf(type);
  if (idx < 0) return MICROSCOPE_FALLBACK_EDGE_COLOR;
  return (
    MICROSCOPE_EDGE_PALETTE[idx % MICROSCOPE_EDGE_PALETTE.length] ??
    MICROSCOPE_FALLBACK_EDGE_COLOR
  );
}

function getMicroscopeNodeAbbr(type: string) {
  return type.slice(0, 2).toUpperCase();
}

function getMicroscopeTextWidth(text: string) {
  return text.length * 6;
}

function getMicroscopeLabelWidth(text: string) {
  return Math.max(56, Math.min(getMicroscopeTextWidth(text), 220));
}

function truncateMicroscopeText(text: string, maxLength: number) {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, Math.max(maxLength - 1, 1))}\u2026`;
}

function getMicroscopeGradientId(type: string) {
  return `microscope-gradient-${type.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}`;
}

function getMicroscopeMarkerId(type: string) {
  return `microscope-arrow-${type.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}`;
}

function toMicroscopeCanvasX(value: number) {
  return (value / 100) * MICROSCOPE_CANVAS_WIDTH;
}

function toMicroscopeCanvasY(value: number) {
  return (value / 100) * MICROSCOPE_CANVAS_HEIGHT;
}

function getMicroscopeTypeCenters(): Record<string, { x: number; y: number }> {
  return {
    Paper: { x: MICROSCOPE_CANVAS_WIDTH * 0.5, y: MICROSCOPE_CANVAS_HEIGHT * 0.18 },
    Concept: { x: MICROSCOPE_CANVAS_WIDTH * 0.26, y: MICROSCOPE_CANVAS_HEIGHT * 0.4 },
    Signal: { x: MICROSCOPE_CANVAS_WIDTH * 0.74, y: MICROSCOPE_CANVAS_HEIGHT * 0.4 },
    Pattern: { x: MICROSCOPE_CANVAS_WIDTH * 0.3, y: MICROSCOPE_CANVAS_HEIGHT * 0.72 },
    Action: { x: MICROSCOPE_CANVAS_WIDTH * 0.72, y: MICROSCOPE_CANVAS_HEIGHT * 0.72 },
  };
}

function getMicroscopeEdgePath(
  source: { x: number; y: number },
  target: { x: number; y: number },
) {
  const dx = target.x - source.x;
  const dy = target.y - source.y;
  const len = Math.sqrt(dx * dx + dy * dy);

  if (len === 0) {
    return `M ${source.x} ${source.y}`;
  }

  const nx = dx / len;
  const ny = dy / len;
  const padding = MICROSCOPE_NODE_RADIUS + 2;
  const x1 = source.x + nx * padding;
  const y1 = source.y + ny * padding;
  const x2 = target.x - nx * padding;
  const y2 = target.y - ny * padding;
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;
  const curvature = Math.min(len * 0.15, 42);
  const ctrlX = midX - ny * curvature;
  const ctrlY = midY + nx * curvature;

  return `M ${x1} ${y1} Q ${ctrlX} ${ctrlY} ${x2} ${y2}`;
}

export function createGraphPreviewCollections() {
  return GRAPH_COLLECTION_CONFIGS.map((config, index) =>
    buildGraphCollection(config, index),
  );
}

export function createMicroscopePreviewWorkspaces() {
  return MICROSCOPE_WORKSPACE_CONFIGS.map((config, index) =>
    buildMicroscopeWorkspace(config, index),
  );
}

type Graph2DDisplayNode = {
  id: string | number;
  isGroupNode: boolean;
  subclusterId?: string | null;
  label?: string;
  x: number;
  y: number;
  edgeCount: number;
  size?: number;
  color?: string;
  clusterId: string;
  clusterName: string;
  origId?: string;
  nodeTitle?: string;
  sourceType?: "chat" | "markdown" | "notion";
};

type Graph2DDisplayEdge = {
  id: string;
  source: string | number;
  target: string | number;
  isIntraCluster: boolean;
};

type Graph2DDisplayCircle = {
  clusterId: string;
  clusterName: string;
  centerX: number;
  centerY: number;
  radius: number;
};

const GRAPH2D_CANVAS_WIDTH = 860;
const GRAPH2D_CANVAS_HEIGHT = 520;
const GRAPH2D_BASE_NODE_RADIUS = 3;
const GRAPH2D_MAX_NODE_RADIUS = 5;
const GRAPH2D_THEME_STYLE = {
  ["--color-primary" as string]: "#2b89f8",
  ["--color-text-primary" as string]: "#f4f4f5",
  ["--color-text-secondary" as string]: "#a1a1aa",
  ["--color-node-default" as string]: "#ebeae2",
  ["--color-node-focus" as string]: "#ef7235",
  ["--color-edge-default" as string]: "#4a4a4f",
  ["--color-cluster-default" as string]: "#1f1f23",
  ["--color-sidebar-button-hover" as string]: "#1e3a5f",
};

function toGraph2DX(value: number) {
  return (value / 100) * GRAPH2D_CANVAS_WIDTH;
}

function toGraph2DY(value: number) {
  return (value / 100) * GRAPH2D_CANVAS_HEIGHT;
}

function getGraph2DNodeRadius(edgeCount: number, maxEdgeCount: number) {
  if (maxEdgeCount === 0) return GRAPH2D_BASE_NODE_RADIUS;
  const scale = edgeCount / maxEdgeCount;
  return (
    GRAPH2D_BASE_NODE_RADIUS +
    (GRAPH2D_MAX_NODE_RADIUS - GRAPH2D_BASE_NODE_RADIUS) * Math.sqrt(scale)
  );
}

function truncateGraph2DLabel(label: string) {
  return label.length > 12 ? `${label.slice(0, 12)}…` : label;
}

function buildGraph2DPreviewData(
  collection: GraphPreviewCollection,
  expandedSubclusterIds: Set<string>,
) {
  const rawNodeMap = new Map(
    collection.nodes.map((node) => [node.id, node] as const),
  );
  const nodeToSubcluster = new Map<number, GraphPreviewSubcluster>();
  const subclusterById = new Map(
    collection.subclusters.map((subcluster) => [subcluster.id, subcluster] as const),
  );

  collection.subclusters.forEach((subcluster) => {
    subcluster.nodeIds.forEach((nodeId) => {
      nodeToSubcluster.set(nodeId, subcluster);
    });
  });

  const visibleNodes: Graph2DDisplayNode[] = [];

  const pushRawNode = (
    node: GraphPreviewNode,
    subclusterId: string | null = null,
  ) => {
    visibleNodes.push({
      id: node.id,
      isGroupNode: false,
      subclusterId,
      label: node.origId,
      x: toGraph2DX(node.x),
      y: toGraph2DY(node.y),
      edgeCount: node.edgeCount,
      clusterId: node.clusterId,
      clusterName: node.clusterName,
      origId: node.origId,
      nodeTitle: node.nodeTitle,
      sourceType: node.sourceType,
    });
  };

  collection.subclusters.forEach((subcluster) => {
    const members = subcluster.nodeIds
      .map((nodeId) => rawNodeMap.get(nodeId))
      .filter((node): node is GraphPreviewNode => node !== undefined);
    if (members.length === 0) return;

    if (expandedSubclusterIds.has(subcluster.id)) {
      members.forEach((member) => pushRawNode(member, subcluster.id));
      return;
    }

    const centerX =
      members.reduce((sum, member) => sum + toGraph2DX(member.x), 0) /
      members.length;
    const centerY =
      members.reduce((sum, member) => sum + toGraph2DY(member.y), 0) /
      members.length;
    const firstMember = members[0];

    visibleNodes.push({
      id: `__group_${subcluster.id}`,
      isGroupNode: true,
      subclusterId: subcluster.id,
      label: subcluster.title,
      x: centerX,
      y: centerY,
      edgeCount: 0,
      size: subcluster.size,
      color: "var(--color-node-focus)",
      clusterId: firstMember.clusterId,
      clusterName: firstMember.clusterName,
    });
  });

  collection.nodes.forEach((node) => {
    if (!nodeToSubcluster.has(node.id)) {
      pushRawNode(node);
    }
  });

  const visibleNodeMap = new Map(visibleNodes.map((node) => [node.id, node] as const));
  const edgeCounts = new Map<string | number, number>();
  visibleNodes.forEach((node) => edgeCounts.set(node.id, 0));

  const visibleEdges: Graph2DDisplayEdge[] = [];
  const edgeKeys = new Set<string>();

  const getVisibleNodeId = (nodeId: number) => {
    const subcluster = nodeToSubcluster.get(nodeId);
    if (!subcluster || expandedSubclusterIds.has(subcluster.id)) {
      return nodeId;
    }
    return `__group_${subcluster.id}`;
  };

  collection.edges.forEach((edge) => {
    const sourceId = getVisibleNodeId(edge.source);
    const targetId = getVisibleNodeId(edge.target);
    if (sourceId === targetId) return;

    const sourceNode = visibleNodeMap.get(sourceId);
    const targetNode = visibleNodeMap.get(targetId);
    if (!sourceNode || !targetNode) return;

    const key = [String(sourceId), String(targetId)].sort().join("-");
    if (edgeKeys.has(key)) return;
    edgeKeys.add(key);

    visibleEdges.push({
      id: edge.id,
      source: sourceId,
      target: targetId,
      isIntraCluster: sourceNode.clusterName === targetNode.clusterName,
    });
    edgeCounts.set(sourceId, (edgeCounts.get(sourceId) ?? 0) + 1);
    edgeCounts.set(targetId, (edgeCounts.get(targetId) ?? 0) + 1);
  });

  const nodesWithCounts: Graph2DDisplayNode[] = visibleNodes.map((node) => ({
    ...node,
    edgeCount: edgeCounts.get(node.id) ?? node.edgeCount,
  }));

  const circles: Graph2DDisplayCircle[] = collection.clusters.map((cluster) => {
    const clusterNodes = nodesWithCounts.filter((node) => node.clusterId === cluster.id);

    if (clusterNodes.length === 0) {
      return {
        clusterId: cluster.id,
        clusterName: cluster.name,
        centerX: toGraph2DX(cluster.center.x),
        centerY: toGraph2DY(cluster.center.y),
        radius:
          (cluster.center.r / 100) *
          Math.min(GRAPH2D_CANVAS_WIDTH, GRAPH2D_CANVAS_HEIGHT),
      };
    }

    const centerX =
      clusterNodes.reduce((sum, node) => sum + node.x, 0) / clusterNodes.length;
    const centerY =
      clusterNodes.reduce((sum, node) => sum + node.y, 0) / clusterNodes.length;
    const maxDist = Math.max(
      ...clusterNodes.map((node) =>
        Math.sqrt((node.x - centerX) ** 2 + (node.y - centerY) ** 2),
      ),
      20,
    );

    return {
      clusterId: cluster.id,
      clusterName: cluster.name,
      centerX,
      centerY,
      radius: maxDist + 30,
    };
  });

  return {
    visibleNodes: nodesWithCounts,
    visibleEdges,
    circles,
    rawNodeMap,
    subclusterById,
  };
}

export function GraphAppPreview({
  collection,
}: {
  collection: GraphPreviewCollection;
}) {
  const [hoveredId, setHoveredId] = useState<string | number | null>(null);
  const [focusNodeId, setFocusNodeId] = useState<number | null>(null);
  const [focusedClusterId, setFocusedClusterId] = useState<string | null>(null);
  const [expandedSubclusterIds, setExpandedSubclusterIds] = useState<Set<string>>(
    new Set(),
  );
  const [clusterOffsets, setClusterOffsets] = useState<
    Map<string, { x: number; y: number }>
  >(new Map());
  const [draggingClusterId, setDraggingClusterId] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const dragStartRef = useRef<{ x: number; y: number } | null>(null);
  const dragStartOffsetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const lastPointerWasDraggingRef = useRef(false);

  const previewData = useMemo(
    () => buildGraph2DPreviewData(collection, expandedSubclusterIds),
    [collection, expandedSubclusterIds],
  );

  const applyClusterOffset = useCallback((
    clusterId: string,
    position: { x: number; y: number },
  ) => {
    const offset = clusterOffsets.get(clusterId);
    if (!offset) return position;
    return { x: position.x + offset.x, y: position.y + offset.y };
  }, [clusterOffsets]);

  const focusedNodes = useMemo<Graph2DDisplayNode[]>(() => {
    if (!focusedClusterId) {
      return previewData.visibleNodes.map((node) => {
        const position = applyClusterOffset(node.clusterId, node);
        return { ...node, x: position.x, y: position.y };
      });
    }
    return collection.nodes
      .filter((node) => node.clusterId === focusedClusterId)
      .map((node) => {
        const baseNode: Graph2DDisplayNode = {
          id: node.id,
          isGroupNode: false,
          subclusterId: null,
          label: node.origId,
          x: toGraph2DX(node.x),
          y: toGraph2DY(node.y),
          edgeCount: node.edgeCount,
          clusterId: node.clusterId,
          clusterName: node.clusterName,
          origId: node.origId,
          nodeTitle: node.nodeTitle,
          sourceType: node.sourceType,
        };
        const position = applyClusterOffset(baseNode.clusterId, baseNode);
        return { ...baseNode, x: position.x, y: position.y };
      });
  }, [
    applyClusterOffset,
    collection.nodes,
    focusedClusterId,
    previewData.visibleNodes,
  ]);

  const focusedEdges = useMemo(() => {
    if (!focusedClusterId) {
      return previewData.visibleEdges;
    }
    return collection.edges
      .filter((edge) => {
        const sourceNode = previewData.rawNodeMap.get(edge.source);
        const targetNode = previewData.rawNodeMap.get(edge.target);
        return (
          sourceNode?.clusterId === focusedClusterId &&
          targetNode?.clusterId === focusedClusterId
        );
      })
      .map((edge) => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        isIntraCluster: true,
      }));
  }, [collection.edges, focusedClusterId, previewData.rawNodeMap, previewData.visibleEdges]);

  const renderedNodeMap = useMemo(
    () => new Map(focusedNodes.map((node) => [node.id, node] as const)),
    [focusedNodes],
  );

  const renderedCircles = useMemo(
    () =>
      previewData.circles.map((circle) => {
        const position = applyClusterOffset(circle.clusterId, {
          x: circle.centerX,
          y: circle.centerY,
        });
        return {
          ...circle,
          centerX: position.x,
          centerY: position.y,
        };
      }),
    [applyClusterOffset, previewData.circles],
  );

  const maxEdgeCount = useMemo(
    () => Math.max(...focusedNodes.map((node) => node.edgeCount), 1),
    [focusedNodes],
  );

  const focusActive =
    focusNodeId !== null &&
    !focusedNodes.some((node) => node.isGroupNode && node.id === focusNodeId) &&
    renderedNodeMap.has(focusNodeId);

  const normalInterEdges = focusedEdges.filter((edge) => {
    if (edge.isIntraCluster) return false;
    if (!focusActive) return true;
    return edge.source !== focusNodeId && edge.target !== focusNodeId;
  });

  const normalIntraEdges = focusedEdges.filter((edge) => {
    if (!edge.isIntraCluster) return false;
    if (!focusActive) return true;
    return edge.source !== focusNodeId && edge.target !== focusNodeId;
  });

  const focusedIntraEdges = focusedEdges.filter((edge) => {
    if (!focusActive || !edge.isIntraCluster) return false;
    return edge.source === focusNodeId || edge.target === focusNodeId;
  });

  const focusedInterEdges = focusedEdges.filter((edge) => {
    if (!focusActive || edge.isIntraCluster) return false;
    return edge.source === focusNodeId || edge.target === focusNodeId;
  });

  const hoveredNode = hoveredId !== null ? renderedNodeMap.get(hoveredId) : null;
  const hoveredSubcluster =
    hoveredNode?.isGroupNode && hoveredNode.subclusterId
      ? previewData.subclusterById.get(hoveredNode.subclusterId)
      : null;

  const handleBackgroundClick = (event: React.MouseEvent<SVGSVGElement>) => {
    const target = event.target as Element;
    const tag = target.tagName.toLowerCase();
    if (tag === "circle" || tag === "text" || tag === "line") return;

    if (focusedClusterId) {
      setFocusedClusterId(null);
      setFocusNodeId(null);
      return;
    }

    setFocusNodeId(null);
  };

  const handleClusterLabelClick = (clusterId: string) => {
    if (lastPointerWasDraggingRef.current) {
      lastPointerWasDraggingRef.current = false;
      return;
    }
    setFocusedClusterId((current) => (current === clusterId ? null : clusterId));
    setFocusNodeId(null);
  };

  const handleClusterLabelMouseDown = (
    event: React.MouseEvent<SVGTextElement>,
    clusterId: string,
  ) => {
    event.stopPropagation();
    dragStartRef.current = { x: event.clientX, y: event.clientY };
    dragStartOffsetRef.current = clusterOffsets.get(clusterId) ?? { x: 0, y: 0 };
    lastPointerWasDraggingRef.current = false;
    setDraggingClusterId(clusterId);
  };

  useEffect(() => {
    if (!draggingClusterId) return;

    const handleMouseMove = (event: MouseEvent) => {
      if (!svgRef.current || !dragStartRef.current) return;

      const rect = svgRef.current.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const dx =
        (event.clientX - dragStartRef.current.x) *
        (GRAPH2D_CANVAS_WIDTH / rect.width);
      const dy =
        (event.clientY - dragStartRef.current.y) *
        (GRAPH2D_CANVAS_HEIGHT / rect.height);

      if (Math.abs(dx) > 2 || Math.abs(dy) > 2) {
        lastPointerWasDraggingRef.current = true;
      }

      setClusterOffsets((current) => {
        const next = new Map(current);
        next.set(draggingClusterId, {
          x: dragStartOffsetRef.current.x + dx,
          y: dragStartOffsetRef.current.y + dy,
        });
        return next;
      });
    };

    const handleMouseUp = () => {
      setDraggingClusterId(null);
      dragStartRef.current = null;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [draggingClusterId]);

  const handleNodeClick = (node: Graph2DDisplayNode) => {
    if (node.isGroupNode) {
      if (!node.subclusterId || focusedClusterId) return;
      setExpandedSubclusterIds((current) => {
        const next = new Set(current);
        if (next.has(node.subclusterId!)) {
          next.delete(node.subclusterId!);
        } else {
          next.add(node.subclusterId!);
        }
        return next;
      });
      return;
    }

    if (typeof node.id === "number") {
      const numericId = node.id;
      setFocusNodeId((current) => (current === numericId ? null : numericId));
    }
  };

  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={GRAPH2D_THEME_STYLE}
    >
      {hoveredNode && (
        <div
          className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded px-1.5 py-0.5 text-[10px]"
          style={{
            left: `${(hoveredNode.x / GRAPH2D_CANVAS_WIDTH) * 100}%`,
            top: `${(hoveredNode.y / GRAPH2D_CANVAS_HEIGHT) * 100}%`,
            backgroundColor: "var(--color-sidebar-button-hover)",
            color: "var(--color-text-primary)",
          }}
        >
          <div className="font-semibold">
            {hoveredNode.isGroupNode
              ? hoveredNode.label ?? String(hoveredNode.id)
              : hoveredNode.nodeTitle ?? hoveredNode.label ?? String(hoveredNode.id)}
          </div>
          {hoveredSubcluster && (
            <div className="text-[9px] opacity-80">
              Size: {hoveredSubcluster.size} | Density:{" "}
              {hoveredSubcluster.density.toFixed(2)}
            </div>
          )}
        </div>
      )}

      <svg
        ref={svgRef}
        className="h-full w-full"
        viewBox={`0 0 ${GRAPH2D_CANVAS_WIDTH} ${GRAPH2D_CANVAS_HEIGHT}`}
        style={{
          cursor: draggingClusterId ? "grabbing" : "grab",
          touchAction: "none",
          backgroundColor: "var(--color-cluster-default)",
        }}
        onClick={handleBackgroundClick}
      >
        <g transform="translate(0, 0) scale(1)">
          {!focusedClusterId &&
            renderedCircles.map((circle) => (
              <text
                key={`label-${circle.clusterId}`}
                x={circle.centerX}
                y={circle.centerY - circle.radius - 12}
                textAnchor="middle"
                fontSize={16}
                fontWeight={600}
                fill="var(--color-text-secondary)"
                style={{
                  cursor:
                    draggingClusterId === circle.clusterId ? "grabbing" : "grab",
                  pointerEvents: "all",
                  userSelect: "none",
                }}
                onMouseDown={(event) =>
                  handleClusterLabelMouseDown(event, circle.clusterId)
                }
                onClick={(event) => {
                  event.stopPropagation();
                  handleClusterLabelClick(circle.clusterId);
                }}
              >
                {circle.clusterName}
              </text>
            ))}

          {normalInterEdges.map((edge, index) => {
            const source = renderedNodeMap.get(edge.source);
            const target = renderedNodeMap.get(edge.target);
            if (!source || !target) return null;

            return (
              <line
                key={edge.id || `inter-normal-${index}`}
                x1={source.x}
                y1={source.y}
                x2={target.x}
                y2={target.y}
                stroke="var(--color-edge-default)"
                strokeWidth={0.7}
                strokeOpacity={0.7}
              />
            );
          })}

          {normalIntraEdges.map((edge, index) => {
            const source = renderedNodeMap.get(edge.source);
            const target = renderedNodeMap.get(edge.target);
            if (!source || !target) return null;

            return (
              <line
                key={edge.id || `intra-normal-${index}`}
                x1={source.x}
                y1={source.y}
                x2={target.x}
                y2={target.y}
                stroke="var(--color-edge-default)"
                strokeWidth={0.7}
              />
            );
          })}

          {[...focusedIntraEdges, ...focusedInterEdges].map((edge, index) => {
            const source = renderedNodeMap.get(edge.source);
            const target = renderedNodeMap.get(edge.target);
            if (!source || !target) return null;

            return (
              <line
                key={edge.id || `focus-${index}`}
                x1={source.x}
                y1={source.y}
                x2={target.x}
                y2={target.y}
                stroke="var(--color-primary)"
                strokeWidth={1.5}
              />
            );
          })}

          {focusedNodes.map((node) => {
            const isHovered = hoveredId === node.id;
            const isFocused =
              !node.isGroupNode &&
              typeof node.id === "number" &&
              focusNodeId === node.id;

            if (node.isGroupNode) {
              const baseRadius = 10;
              const radius = Math.max(baseRadius, Math.sqrt(node.size ?? 0) * 1.8);
              const displayRadius = isHovered ? radius + 1.5 : radius;

              return (
                <g
                  key={node.id}
                  transform={`translate(${node.x}, ${node.y})`}
                  style={{ cursor: focusedClusterId ? "default" : "pointer" }}
                  onMouseEnter={() => setHoveredId(node.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={(event) => {
                    event.stopPropagation();
                    handleNodeClick(node);
                  }}
                >
                  <circle
                    r={displayRadius}
                    fill={node.color ?? "var(--color-node-focus)"}
                    stroke="var(--color-cluster-default)"
                    strokeWidth={0.75}
                  />
                  <text
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={9}
                    fontWeight="bold"
                    fill="white"
                    style={{ pointerEvents: "none", userSelect: "none" }}
                  >
                    {node.size}
                  </text>
                </g>
              );
            }

            const baseRadius = getGraph2DNodeRadius(node.edgeCount, maxEdgeCount);
            const radius = isHovered ? baseRadius + 2 : baseRadius;
            const isHighlyConnected =
              maxEdgeCount > 0 && node.edgeCount >= maxEdgeCount * 0.5;
            const baseFill = isHighlyConnected
              ? "var(--color-node-focus)"
              : "var(--color-node-default)";
            const fill =
              isFocused || isHovered ? "var(--color-node-focus)" : baseFill;
            const title = focusedClusterId
              ? truncateGraph2DLabel(node.nodeTitle ?? node.label ?? String(node.id))
              : null;

            return (
              <g
                key={node.id}
                transform={`translate(${node.x}, ${node.y})`}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredId(node.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={(event) => {
                  event.stopPropagation();
                  handleNodeClick(node);
                }}
              >
                <circle
                  r={radius}
                  fill={fill}
                  stroke="var(--color-cluster-default)"
                  strokeWidth={0.75}
                />
                {title && (
                  <text
                    x={0}
                    y={-(radius + 4)}
                    textAnchor="middle"
                    fontSize={6}
                    fontWeight={500}
                    fill="var(--color-text-secondary)"
                    style={{ pointerEvents: "none", userSelect: "none" }}
                  >
                    {title}
                  </text>
                )}
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}

export function MicroscopeAppPreview({
  workspaces,
  activeWorkspaceId,
  onSelectWorkspace,
}: {
  workspaces: MicroscopePreviewWorkspace[];
  activeWorkspaceId: string | null;
  onSelectWorkspace: (workspaceId: string) => void;
}) {
  const [viewMode, setViewMode] = useState<MicroscopeViewMode>("network");
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const activeWorkspace = useMemo(
    () =>
      workspaces.find((workspace) => workspace.id === activeWorkspaceId) ??
      workspaces[0] ??
      null,
    [activeWorkspaceId, workspaces],
  );

  const flattened = useMemo(
    () =>
      activeWorkspace
        ? flattenMicroscopeWorkspace(activeWorkspace)
        : { nodes: [], edges: [] },
    [activeWorkspace],
  );

  const focusSet = useMemo(
    () => new Set(activeWorkspace?.focusNodeNames ?? []),
    [activeWorkspace],
  );

  const nodeTypes = useMemo(() => {
    const types = new Set<string>();
    flattened.nodes.forEach((node) => types.add(node.type));
    return Array.from(types);
  }, [flattened.nodes]);

  const edgeTypes = useMemo(() => {
    const types = new Set<string>();
    flattened.edges.forEach((edge) => types.add(edge.type));
    return Array.from(types);
  }, [flattened.edges]);

  const edgeCounts = useMemo(() => {
    const counts = new Map<string, number>();
    flattened.nodes.forEach((node) => counts.set(node.id, 0));
    flattened.edges.forEach((edge) => {
      counts.set(edge.source, (counts.get(edge.source) ?? 0) + 1);
      counts.set(edge.target, (counts.get(edge.target) ?? 0) + 1);
    });
    return counts;
  }, [flattened.edges, flattened.nodes]);

  const networkNodes = useMemo<MicroscopeDisplayNode[]>(
    () =>
      flattened.nodes.map((node) => {
        const count = edgeCounts.get(node.id) ?? 0;
        return {
          ...node,
          x: toMicroscopeCanvasX(node.x),
          y: toMicroscopeCanvasY(node.y),
          edgeCount: count,
          hasEdges: count > 0,
        };
      }),
    [edgeCounts, flattened.nodes],
  );

  const clusterNodes = useMemo<MicroscopeDisplayNode[]>(() => {
    const typeCenters = getMicroscopeTypeCenters();
    const grouped = flattened.nodes.reduce<Record<string, FlattenedMicroscopeNode[]>>(
      (acc, node) => {
        const nodes = acc[node.type] ?? [];
        nodes.push(node);
        acc[node.type] = nodes;
        return acc;
      },
      {},
    );

    const positions = new Map<string, { x: number; y: number }>();
    Object.entries(grouped).forEach(([type, nodes]) => {
      const center = typeCenters[type] ?? {
        x: MICROSCOPE_CANVAS_WIDTH / 2,
        y: MICROSCOPE_CANVAS_HEIGHT / 2,
      };
      const sortedNodes = [...nodes].sort((a, b) => a.name.localeCompare(b.name));
      const radius = 44 + Math.max(sortedNodes.length - 2, 0) * 10;

      sortedNodes.forEach((node, index) => {
        if (sortedNodes.length === 1) {
          positions.set(node.id, center);
          return;
        }

        const angle = (index / sortedNodes.length) * Math.PI * 2 - Math.PI / 2;
        const stagger = index % 2 === 0 ? radius : radius + 14;
        positions.set(node.id, {
          x: center.x + Math.cos(angle) * stagger,
          y: center.y + Math.sin(angle) * stagger,
        });
      });
    });

    return flattened.nodes.map((node) => {
      const count = edgeCounts.get(node.id) ?? 0;
      const position = positions.get(node.id) ?? {
        x: toMicroscopeCanvasX(node.x),
        y: toMicroscopeCanvasY(node.y),
      };

      return {
        ...node,
        x: position.x,
        y: position.y,
        edgeCount: count,
        hasEdges: count > 0,
      };
    });
  }, [edgeCounts, flattened.nodes]);

  const renderedNodes = viewMode === "cluster" ? clusterNodes : networkNodes;
  const renderedNodeMap = useMemo(
    () => new Map(renderedNodes.map((node) => [node.id, node] as const)),
    [renderedNodes],
  );

  const activeNodeId = useMemo(() => {
    if (selectedNodeId && renderedNodeMap.has(selectedNodeId)) {
      return selectedNodeId;
    }
    if (hoveredNodeId && renderedNodeMap.has(hoveredNodeId)) {
      return hoveredNodeId;
    }
    return null;
  }, [hoveredNodeId, renderedNodeMap, selectedNodeId]);

  const typeLabels = useMemo(() => {
    const grouped = renderedNodes.reduce<Record<string, MicroscopeDisplayNode[]>>(
      (acc, node) => {
        const nodes = acc[node.type] ?? [];
        nodes.push(node);
        acc[node.type] = nodes;
        return acc;
      },
      {},
    );

    return Object.entries(grouped).map(([type, nodes]) => ({
      type,
      x: nodes.reduce((sum, node) => sum + node.x, 0) / nodes.length,
      y: nodes.reduce((sum, node) => sum + node.y, 0) / nodes.length - 74,
    }));
  }, [renderedNodes]);

  if (!activeWorkspace) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-[#1f1f1f] text-sm text-[#7f8794]">
        No workspace selected
      </div>
    );
  }

  return (
    <div className="flex h-full w-full overflow-hidden bg-[#1f1f1f]">
      <aside className="flex h-full w-[259px] shrink-0 flex-col border-r border-[#2d2d32] bg-[#202124]">
        <div className="app-preview-scrollbar flex-1 overflow-y-auto px-2 py-3">
          <div className="space-y-2">
            {workspaces.map((workspace) => {
              const isActive = workspace.id === activeWorkspace.id;

              return (
                <button
                  key={workspace.id}
                  onClick={() => onSelectWorkspace(workspace.id)}
                  className={`w-full rounded-xl border px-3 py-3 text-left transition ${
                    isActive
                      ? "border-[#3b4f6d] bg-[#2a3140] text-white"
                      : "border-transparent bg-transparent text-[#d1d1d6] hover:bg-[#2a2a2e]"
                  }`}
                >
                  <p className="truncate text-sm font-medium">
                    {workspace.name}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </aside>

      <div className="relative min-w-0 flex-1 overflow-hidden bg-[#19191b]">
        <div className="absolute right-6 top-6 z-20 flex gap-1 rounded-md border border-white/8 bg-[#2a2a2d] p-[2px]">
          {(["network", "cluster"] as const).map((mode) => {
            const isActive = viewMode === mode;
            return (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`relative rounded-[6px] px-4 py-1.5 text-sm font-medium transition ${
                  isActive
                    ? "bg-[#18191c] text-[#5a8df6]"
                    : "text-[#9aa0aa] hover:text-white"
                }`}
              >
                {mode === "network" ? "Network" : "Cluster"}
              </button>
            );
          })}
        </div>

        <svg
          className="h-full w-full"
          viewBox={`0 0 ${MICROSCOPE_CANVAS_WIDTH} ${MICROSCOPE_CANVAS_HEIGHT}`}
          onClick={() => setSelectedNodeId(null)}
        >
          <defs>
            {nodeTypes.map((type) => {
              const colors = getMicroscopeNodeColors(type, nodeTypes);
              return (
                <linearGradient
                  key={getMicroscopeGradientId(type)}
                  id={getMicroscopeGradientId(type)}
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor={colors.gradient} />
                  <stop offset="100%" stopColor={colors.fill} />
                </linearGradient>
              );
            })}
            <filter
              id="microscope-node-shadow"
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feDropShadow
                dx="0"
                dy="2"
                stdDeviation="2"
                floodOpacity="0.18"
              />
            </filter>
            {edgeTypes.map((type) => {
              const color = getMicroscopeEdgeColor(type, edgeTypes);
              return (
                <marker
                  key={getMicroscopeMarkerId(type)}
                  id={getMicroscopeMarkerId(type)}
                  markerWidth="6"
                  markerHeight="6"
                  refX="5"
                  refY="3"
                  orient="auto"
                  markerUnits="strokeWidth"
                >
                  <path d="M0,0 L6,3 L0,6 Z" fill={color} />
                </marker>
              );
            })}
          </defs>

          {viewMode === "cluster" &&
            typeLabels.map((label) => {
              const width = Math.max(56, label.type.length * 8 + 20);
              return (
                <g key={`microscope-type-${label.type}`}>
                  <rect
                    x={label.x - width / 2}
                    y={label.y - 14}
                    width={width}
                    height={28}
                    rx={14}
                    fill="rgba(17, 19, 21, 0.94)"
                    stroke="rgba(255, 255, 255, 0.10)"
                  />
                  <text
                    x={label.x}
                    y={label.y + 4}
                    textAnchor="middle"
                    fontSize={12}
                    fontWeight={600}
                    fill="#d4d4d8"
                    style={{ pointerEvents: "none", userSelect: "none" }}
                  >
                    {label.type}
                  </text>
                </g>
              );
            })}

          {flattened.edges.map((edge) => {
            const source = renderedNodeMap.get(edge.source);
            const target = renderedNodeMap.get(edge.target);
            if (!source || !target) return null;

            const color = getMicroscopeEdgeColor(edge.type, edgeTypes);
            const isHighlighted =
              activeNodeId !== null &&
              (edge.source === activeNodeId || edge.target === activeNodeId);
            const isCrossCluster =
              viewMode === "cluster" && source.type !== target.type;

            return (
              <path
                key={edge.id}
                d={getMicroscopeEdgePath(source, target)}
                stroke={color}
                strokeWidth={isHighlighted ? 2 : 1.1}
                strokeOpacity={
                  activeNodeId !== null
                    ? isHighlighted
                      ? 0.95
                      : 0.2
                    : isCrossCluster
                      ? 0.58
                      : 0.42
                }
                strokeDasharray={
                  edge.type === "supports" || isCrossCluster ? "6 3" : undefined
                }
                fill="none"
                markerEnd={`url(#${getMicroscopeMarkerId(edge.type)})`}
              />
            );
          })}

          {renderedNodes.map((node) => {
            const colors = getMicroscopeNodeColors(node.type, nodeTypes);
            const isHovered = hoveredNodeId === node.id;
            const isSelected = selectedNodeId === node.id;
            const isFocused = focusSet.has(node.name);
            const labelWidth = getMicroscopeLabelWidth(node.name);

            return (
              <g
                key={node.id}
                className="cursor-pointer"
                transform={`translate(${node.x}, ${node.y})`}
                onMouseEnter={() => setHoveredNodeId(node.id)}
                onMouseLeave={() => setHoveredNodeId(null)}
                onClick={(event) => {
                  event.stopPropagation();
                  setSelectedNodeId((current) =>
                    current === node.id ? null : node.id,
                  );
                }}
              >
                {isFocused && (
                  <circle
                    r={MICROSCOPE_NODE_RADIUS + 8}
                    fill="none"
                    stroke={colors.stroke}
                    strokeWidth={3}
                    opacity={0.34}
                  />
                )}
                {(isHovered || isSelected) && (
                  <circle
                    r={MICROSCOPE_NODE_RADIUS + 4}
                    fill="none"
                    stroke={colors.stroke}
                    strokeWidth={2}
                    opacity={0.72}
                  />
                )}
                <circle
                  r={MICROSCOPE_NODE_RADIUS}
                  fill={`url(#${getMicroscopeGradientId(node.type)})`}
                  filter="url(#microscope-node-shadow)"
                />
                <text
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="8"
                  fontWeight="bold"
                  fill="white"
                  style={{ pointerEvents: "none", userSelect: "none" }}
                >
                  {getMicroscopeNodeAbbr(node.type)}
                </text>
                <g style={{ opacity: isHovered || isSelected ? 1 : 0.78 }}>
                  <rect
                    x={-labelWidth / 2 - 6}
                    y={MICROSCOPE_NODE_RADIUS + 6}
                    width={labelWidth + 12}
                    height={22}
                    rx={9}
                    fill="#111315"
                    stroke={isFocused ? colors.stroke : "rgba(148, 163, 184, 0.28)"}
                    strokeWidth={isFocused ? 1.4 : 0.75}
                  />
                  <foreignObject
                    x={-labelWidth / 2}
                    y={MICROSCOPE_NODE_RADIUS + 8}
                    width={labelWidth}
                    height={18}
                    style={{ pointerEvents: "none", overflow: "visible" }}
                  >
                    <div
                      style={{
                        width: `${labelWidth}px`,
                        height: "18px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "10px",
                        fontWeight: 500,
                        color: "#f4f4f5",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        lineHeight: 1,
                      }}
                    >
                      {truncateMicroscopeText(node.name, 28)}
                    </div>
                  </foreignObject>
                </g>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
