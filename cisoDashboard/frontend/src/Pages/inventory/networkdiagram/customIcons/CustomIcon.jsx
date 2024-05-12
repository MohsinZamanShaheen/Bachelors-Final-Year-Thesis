import React from 'react';

const CustomIcon = ({ customIcon }) => {
  return (
    <div>
      <img src={customIcon} alt="Custom Icon" style={{ width: 90, height: 60 }} />
    </div>
  );
};

export default CustomIcon;
