import React, { memo } from 'react';
import { Handle, useStore, Position } from 'reactflow';
import { Box } from '@mui/material';
import RouterIcon from '@mui/icons-material/Router';
import StorageIcon from '@mui/icons-material/Storage';
import ComputerIcon from '@mui/icons-material/Computer';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';

const iconMap = {
  router: RouterIcon,
  database: StorageIcon,
  computer: ComputerIcon,
  mobile: PhoneAndroidIcon,
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
    <Box className="react-flow__node-circle-custom">
      <div className="inner">
         <Icon style={{ fontSize: 30, color: '#fff' }} />
      </div>
      <Handle type="source" position={Position.Left} />
      <Handle type="target" position={Position.Right} />
    </Box>
  );
});
