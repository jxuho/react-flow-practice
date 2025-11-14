export const initialNodes = [
  {
    id: "n1",
    type: "processUnitNode",
    position: { x: 0, y: 0 },
    data: { label: "Process Unit" },
  },
  { id: "n2", position: { x: 0, y: 100 }, data: { label: "Node 2" } },
  { id: "n3", position: { x: 0, y: 200 }, data: { label: "Node 3" } },
  {
    id: "n4",
    type: "dataProviderNode",
    position: { x: -100, y: 0 },
    data: { label: "Data Provider" },
  },
  {
    id: "n5",
    type: "applicationNode",
    position: { x: -200, y: 0 },
    data: { label: "Application" },
  },
  {
    id: "n6",
    type: "resizableNode",
    position: { x: -300, y: 0 },
    data: { label: "resizableNode" },
  },
];

export const initialEdges = [{ id: "n2-n3", source: "n2", target: "n3", type: "step" }];