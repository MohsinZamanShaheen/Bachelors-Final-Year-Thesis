import React from 'react';
import {useTheme} from "@mui/material";


const GroupNode = ({ data }) => {
    const theme = useTheme();
  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      color: theme.palette.mode === "dark"? "#fff" : "#000",
    }}>
      <span>{data.label}</span>
    </div>
  );
};

export default GroupNode;
