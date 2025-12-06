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
import StepEdge from "./components/edges/StepEdge";
import SecurityRealm from "./components/nodes/SecurityRealm";

export default function App() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [menu, setMenu] = useState(null);
  const ref = useRef(null);

  const onNodesChange = useCallback((changes) => {
    setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot));
  }, []);
  const onEdgesChange = useCallback(
    (changes) =>
      setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    []
  );
const onConnect = useCallback(
  (params) => {
    const newEdge = {
      ...params,
      type: "step", 
      source: params.source,
      target: params.target,
      markerEnd: {
        type: 'arrowclosed', 
        color: '#808080',
      },
    };
    setEdges((edgesSnapshot) => addEdge(newEdge, edgesSnapshot));
  },
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
  const onEdgeContextMenu = useCallback((event, edge) => {
    event.preventDefault();

    const pane = ref.current.getBoundingClientRect();
    setMenu({
      id: edge.id,
      type: "edge",
      top: event.clientY < pane.height - 200 ? event.clientY : undefined,
      left: event.clientX < pane.width - 200 ? event.clientX : undefined,
      right:
        event.clientX >= pane.width - 200
          ? pane.width - event.clientX
          : undefined,
      bottom:
        event.clientY >= pane.height - 200
          ? pane.height - event.clientY
          : undefined,
    });
  }, []);

  // Close the context menu if it's open whenever the window is clicked.
  const onPaneClick = useCallback(() => {
    setMenu(null);
  }, [setMenu]);

  const nodeTypes = {
    processUnitNode: ProcessUnitNode,
    dataProviderNode: DataProviderNode,
    applicationNode: ApplicationNode,
    resizableNode: ResizableNode,
    securityRealm: SecurityRealm
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
        onEdgeContextMenu={onEdgeContextMenu}
        onPaneClick={onPaneClick}
        connectionMode="loose"
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
