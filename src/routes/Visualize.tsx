import { useEffect, useState, useCallback } from "react";
import VisualizeToggle from "@/components/visualize/VisualizeToggle";
import VisualizeSidebar from "@/components/visualize/VisualizeSidebar";
import {
  GraphSnapshotDto,
  GraphStatsDto,
} from "node_modules/@taco_tsinghua/graphnode-sdk/dist/types/graph";
import { Me } from "@/types/Me";
import { DUMMY_GRAPH } from "@/constants/DUMMY_GRAPH";
import { Subcluster } from "@/types/GraphData";

interface GraphData {
  nodeData: GraphSnapshotDto;
  statisticData: GraphStatsDto;
}

export default function Visualize() {
  const [me, setMe] = useState<Me | null>(null);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [focusedNodeId, setFocusedNodeId] = useState<number | null>(null);
  const [expandedSubclusters, setExpandedSubclusters] = useState<Set<string>>(
    new Set(),
  );
  const [isUpdatingGraph, setIsUpdatingGraph] = useState(false);

  useEffect(() => {
    (async () => {
      const meData = await window.keytarAPI.getMe();
      setMe(meData as Me);
    })();
  }, []);

  // 그래프 업데이트 핸들러
  const handleUpdateGraph = useCallback(async () => {
    setIsUpdatingGraph(true);
    try {
      // TODO: 실제 그래프 업데이트 API 호출
      await new Promise((resolve) => setTimeout(resolve, 2000)); // 임시 딜레이
      console.log("Graph updated");
    } catch (error) {
      console.error("Failed to update graph:", error);
    } finally {
      setIsUpdatingGraph(false);
    }
  }, []);

  // 중분류(subcluster) 펼치기/접기 토글
  const handleToggleSubcluster = useCallback((subclusterId: string) => {
    setExpandedSubclusters((prev) => {
      const next = new Set(prev);
      if (next.has(subclusterId)) {
        next.delete(subclusterId);
      } else {
        next.add(subclusterId);
      }
      return next;
    });
  }, []);

  // DUMMY_GRAPH 데이터 사용
  const graphData: GraphData = {
    nodeData: {
      nodes: DUMMY_GRAPH.nodes,
      edges: DUMMY_GRAPH.edges,
      clusters: DUMMY_GRAPH.clusters,
      stats: DUMMY_GRAPH.stats,
    } as GraphSnapshotDto,
    statisticData: DUMMY_GRAPH.stats as GraphStatsDto,
  };

  // 중분류 데이터
  const subclusters: Subcluster[] = DUMMY_GRAPH.subclusters;

  // 사이드바에서 노드 클릭 시 포커싱만 (줌인 + 시각적 효과)
  const handleNodeFocus = (nodeId: number) => {
    setFocusedNodeId((prev) => (prev === nodeId ? null : nodeId));
  };

  return (
    <div className="flex w-full h-full overflow-hidden select-none">
      {/* 그래프 구조 사이드바 */}
      <VisualizeSidebar
        graphData={graphData.nodeData}
        isExpanded={isSidebarExpanded}
        setIsExpanded={setIsSidebarExpanded}
        onNodeFocus={handleNodeFocus}
        focusedNodeId={focusedNodeId}
        subclusters={subclusters}
        expandedSubclusters={expandedSubclusters}
        onToggleSubcluster={handleToggleSubcluster}
        onUpdateGraph={handleUpdateGraph}
        isUpdating={isUpdatingGraph}
      />

      {/* 메인 시각화 영역 */}
      <div className="flex-1 overflow-hidden">
        <VisualizeToggle
          graphData={graphData}
          avatarUrl={me?.profile?.avatarUrl ?? null}
          subclusters={subclusters}
        />
      </div>
    </div>
  );
}
