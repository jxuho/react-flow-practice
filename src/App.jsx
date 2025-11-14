import { useState, useCallback } from "react";
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
import { ProcessUnit } from "./assets/components/nodes/ProcessUnit";
import DataProvider from "./assets/components/nodes/DataProvider";
import Application from "./assets/components/nodes/Application";


const initialNodes = [
  {
    id: "n1",
    type: "processUnit",
    position: { x: 0, y: 0 },
    data: { label: "Node 1" },
  },
  { id: "n2", position: { x: 0, y: 100 }, data: { label: "Node 2" } },
  { id: "n3", position: { x: 0, y: 200 }, data: { label: "Node 3" } },
  { id: "n4",type: "dataProvider", position: { x: -100, y: 0 }, data: { label: "Node 4" } },
  { id: "n5",type: "application", position: { x: -200, y: 0 }, data: { label: "Node 5" } },
];

// const initialEdges = [{ id: "n2-n3", source: "n2", target: "n3", type: "step"}];
const initialEdges = [];

export default function App() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  /**
   * 노드를 화면에 처음 렌더링할 때 (node init)
   * 노드를 드래그해서 위치를 바꿀 때 (node drag)
   * 엣지를 선택하거나 변경할 때 (edge select)
   * 이런 변화가 생기면 **onNodesChange** **핸들러(handler)**가 호출됩니다.
   */
  const onNodesChange = useCallback( 
    (changes) => {
      // console.log(changes);
      setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot))
    }
      // applyNodeChanges는 change event를 사용해서 node의 current state를 업데이트한다
    ,[]
  );
  const onEdgesChange = useCallback(
    (changes) =>
      setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    []
  );
  const onConnect = useCallback(  // 두 노드 간에 새로운 연결이 생성될 때마다 호출된다
    (params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    // addEdge 유틸리티 함수를 사용하여 새 에지를 생성하고 에지 배열을 업데이트할 수 있다.
    []
  );

  const nodeTypes = {
    processUnit: ProcessUnit,
    dataProvider: DataProvider,
    application: Application,
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        {/* <MiniMap/> */}
        <Panel position="top-center">top-center panel</Panel>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
