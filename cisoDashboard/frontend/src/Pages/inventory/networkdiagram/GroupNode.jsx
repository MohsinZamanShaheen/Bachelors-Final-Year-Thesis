import React from 'react';
import { Handle } from 'reactflow';

const GroupNode = ({ data }) => {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      color: '#fff',
    }}>
      <span>{data.label}</span>
    </div>
  );
};

export default GroupNode;
