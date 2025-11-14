import { Position, Handle, NodeResizer } from "@xyflow/react";

const ApplicationNode = ({ data, selected }) => {
  return (
    <div className="relative border bg-white w-full h-full rounded-xl">
      <NodeResizer
        color="#ff0071"
        isVisible={selected}
        minWidth={100}
        minHeight={50}
      />
      <div className="flex items-center justify-center p-2.5 h-full">
        {data.label}
      </div>
      <Handle type="source" position={Position.Top} />
      <Handle type="target" position={Position.Bottom} />
    </div>
  );
};

export default ApplicationNode;
