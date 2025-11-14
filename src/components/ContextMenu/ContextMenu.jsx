import React, { useCallback } from "react";
import { useReactFlow } from "@xyflow/react";

export default function ContextMenu({ id, type = "node", top, left, right, bottom, ...props }) {
  const { getNode, setNodes, addNodes, setEdges, deleteElements } = useReactFlow();

  // 노드 복제
  const duplicateNode = useCallback(() => {
    if (type !== "node") return;

    const node = getNode(id);
    if (!node) return;

    const position = { x: node.position.x + 50, y: node.position.y + 50 };
    addNodes({ ...node, selected: false, dragging: false, id: `${node.id}-copy`, position });
  }, [id, getNode, addNodes, type]);

  // 노드/엣지 삭제
  const deleteItem = useCallback(() => {
    if (type === "node") {
      setNodes((nodes) => nodes.filter((node) => node.id !== id));
      setEdges((edges) => edges.filter((edge) => edge.source !== id && edge.target !== id));
    } else if (type === "edge") {
      deleteElements({ edges: [{ id }] });
    }
  }, [id, type, setNodes, setEdges, deleteElements]);

  return (
    <div
      style={{ top, left, right, bottom }}
      className="absolute bg-white border rounded shadow p-2 z-50 flex flex-col gap-2"
      {...props}
    >
      <p className="text-sm m-0">
        <small>{type}: {id}</small>
      </p>
      {type === "node" && (
        <button className="px-2 py-1 bg-gray-200 rounded" onClick={duplicateNode}>
          duplicate
        </button>
      )}
      <button className="px-2 py-1 bg-red-200 rounded" onClick={deleteItem}>
        delete
      </button>
    </div>
  );
}


// import React, { useCallback } from "react";
// import { useReactFlow } from "@xyflow/react";

// export default function ContextMenu({
//   id,
//   top,
//   left,
//   right,
//   bottom,
//   ...props
// }) {
//   const { getNode, setNodes, addNodes, setEdges } = useReactFlow();
//   const duplicateNode = useCallback(() => {
//     const node = getNode(id);
//     const position = {
//       x: node.position.x + 50,
//       y: node.position.y + 50,
//     };

//     addNodes({
//       ...node,
//       selected: false,
//       dragging: false,
//       id: `${node.id}-copy`,
//       position,
//     });
//   }, [id, getNode, addNodes]);

//   const deleteNode = useCallback(() => {
//     setNodes((nodes) => nodes.filter((node) => node.id !== id));
//     setEdges((edges) => edges.filter((edge) => edge.source !== id));
//   }, [id, setNodes, setEdges]);

//   return (
//     <div
//       style={{ top, left, right, bottom }}
//       className="context-menu absolute bg-white border rounded shadow p-2 z-50 flex flex-col gap-2"
//       {...props}
//     >
//       <p className="text-sm m-0">
//         <small>node: {id}</small>
//       </p>
//       <button className="px-2 py-1 bg-gray-200 rounded" onClick={duplicateNode}>
//         duplicate
//       </button>
//       <button className="px-2 py-1 bg-red-200 rounded" onClick={deleteNode}>
//         delete
//       </button>
//     </div>
//   );
// }
