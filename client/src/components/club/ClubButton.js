import React, { useState } from 'react';

const ClubButton = ({ text, btnClass }) => {
  const [btnState, setBtnState] = useState(false);

  const handleClick = () => {
    setBtnState((btnState) => !btnState);
  };
  return <div className={btnClass}>{text}</div>;
};

export default ClubButton;
