import React, { useCallback } from "react";
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from "reactflow";
import { Box } from "@mui/material";
import Header from "../../../Components/global/Header";

import {
  nodes as initialNodes,
  edges as initialEdges,
} from "./initial_elements";
import TransparentNode from "./TransparentNode";
import "reactflow/dist/style.css";
import "./overview.css";
import GroupNode from "./GroupNode";

const nodeTypes = {
  transparent: TransparentNode,
  group: GroupNode,
};

const edgeTypes = {};

const nodeClassName = (node) => node.type;

const OverviewFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  return (
    <Box sx={{width:"100%", height:"100%"}}>
      <Box m="20px">
        <Header
          title="Network Diagram"
          subtitle="Summary of the organization's Network Diagram and connections between devices"
        />
      </Box>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          attributionPosition="top-right"
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          className="overview"
        >
          <MiniMap zoomable pannable nodeClassName={nodeClassName} />
          <Controls />
          <Background />
        </ReactFlow>
    </Box>
  );
};

export default OverviewFlow;
