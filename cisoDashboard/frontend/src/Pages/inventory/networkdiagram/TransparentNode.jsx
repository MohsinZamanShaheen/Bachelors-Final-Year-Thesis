import React, { memo } from 'react';
import { Handle, useStore, Position } from 'reactflow';
import { Box } from '@mui/material';
import RouterIcon from '@mui/icons-material/Router';
import CustomIcon from './customIcons/CustomIcon';

const iconMap = {
  firewall: CustomIcon
};

const labelStyle = {
  position: 'absolute',
  color: '#fff',
  bottom: -15,
  fontSize: 8,
};


export default memo(({ data }) => {
  const Icon = iconMap[data.type] || RouterIcon;
  const label = useStore((s) => {
    const node = s.nodeInternals.get(data);

    if (!node) {
      return null;
    }

    return `position x:${parseInt(node.position.x)} y:${parseInt(
      node.position.y,
    )}`;
  });

  return (
    <Box className="react-flow__node-circle-transparent">
      <div className="inner">
        <CustomIcon customIcon={data.imageUrl} />
      </div>
      {data.type === "firewall"  && (
        <>
          <Handle type="source" position={Position.Right} id='fa' />
          <Handle type="source" position={Position.Left} id='fb' />
          <Handle type="source" position={Position.Top} id='fc' />
          <Handle type="source" position={Position.Bottom} id='fd'/>
          <Handle type="target" position={Position.Bottom} id='fd'/>
        </>
      )}
      {data.type==="switch" && (
        <>
        <Handle type="source" position={Position.Right} id='sa' />
          <Handle type="source" position={Position.Left} id='sb' />
          <Handle type="source" position={Position.Top} id='sc' />
          <Handle type="source" position={Position.Bottom} id='sd'/>
          <Handle type="target" position={Position.Bottom} id='se'/>
        </>
      )}
      {data.type==="modem" && (
        <>
        <Handle type="target" position={Position.Right} />
        <Handle type="source" position={Position.Left} />
        </>
      )}
       {data.type==="router" && (
        <>
        <Handle type="source" position={Position.Right} />
        <Handle type="target" position={Position.Left} />
        </>
      )}
      {data.type==="cloud" && (
        <>
        <Handle type="source" position={Position.Right} />
        <Handle type="target" position={Position.Left} />
        </>
      )}
      {data.type==="server" && (
        <>
        <Handle type="source" position={Position.Right} />
        <Handle type="target" position={Position.Left} />
        </>
      )}
      {data.type==="pc"&& (
        <>
        <Handle type="target" position={Position.Top} />
        <Handle type="source" position={Position.Bottom} />
        </>
      )}
      {data.type === "laptop" && (
        <>
        <Handle type="target" position={Position.Top} />
        <Handle type="source" position={Position.Bottom} />
        </>
      )}
      {data.type==="fax" && (
        <>
        <Handle type="target" position={Position.Top} />
        <Handle type="source" position={Position.Bottom} />
        </>
      )}
       <div style={labelStyle}>{data.label}</div>
    </Box>
  );
});
