import { useState, useCallback, useRef } from "react";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Background,
  Controls,
  MiniMap,
  Panel,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { ProcessUnitNode } from "./components/nodes/ProcessUnitNode";
import DataProviderNode from "./components/nodes/DataProviderNode";
import ApplicationNode from "./components/nodes/ApplicationNode";
import ResizableNode from "./components/nodes/ResizableNode";
import ContextMenu from "./components/ContextMenu/ContextMenu";
import { initialNodes, initialEdges } from "./data/initialElements";

export default function App() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [menu, setMenu] = useState(null);
  const ref = useRef(null);

  /**
   * 노드를 화면에 처음 렌더링할 때 (node init)
   * 노드를 드래그해서 위치를 바꿀 때 (node drag)
   * 엣지를 선택하거나 변경할 때 (edge select)
   * 이런 변화가 생기면 **onNodesChange** **핸들러(handler)**가 호출됩니다.
   */
  const onNodesChange = useCallback((changes) => {
    setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot));
    // applyNodeChanges는 change event를 사용해서 node의 current state를 업데이트한다
  }, []);
  const onEdgesChange = useCallback(
    (changes) =>
      setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    []
  );
  const onConnect = useCallback(
    // 두 노드 간에 새로운 연결이 생성될 때마다 호출된다
    (params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    // addEdge 유틸리티 함수를 사용하여 새 에지를 생성하고 에지 배열을 업데이트할 수 있다.
    []
  );

  const onNodeContextMenu = useCallback(
    (event, node) => {
      // Prevent native context menu from showing
      event.preventDefault();
      // Calculate position of the context menu. We want to make sure it
      // doesn't get positioned off-screen.
      const pane = ref.current.getBoundingClientRect();
      setMenu({
        id: node.id,
        top: event.clientY < pane.height - 200 && event.clientY,
        left: event.clientX < pane.width - 200 && event.clientX,
        right: event.clientX >= pane.width - 200 && pane.width - event.clientX,
        bottom:
          event.clientY >= pane.height - 200 && pane.height - event.clientY,
      });
    },
    [setMenu]
  );

  // Close the context menu if it's open whenever the window is clicked.
  const onPaneClick = useCallback(() => {
    console.log('onPaneClick');
    setMenu(null);
  }, [setMenu]);

  const nodeTypes = {
    processUnitNode: ProcessUnitNode,
    dataProviderNode: DataProviderNode,
    applicationNode: ApplicationNode,
    resizableNode: ResizableNode,
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        ref={ref}
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeContextMenu={onNodeContextMenu}
        onPaneClick={onPaneClick}
        fitView
      >
        {/* <MiniMap/> */}
        <Panel position="top-center">top-center panel</Panel>
        <Background />
        <Controls />
        {menu && <ContextMenu onClick={onPaneClick} {...menu} />}
      </ReactFlow>
    </div>
  );
}
