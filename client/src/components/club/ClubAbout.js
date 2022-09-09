import React from 'react';

const ClubAbout = ({ text }) => {
  return (
    <div>
      <h1>About Us</h1>
      <div dangerouslySetInnerHTML={{ __html: text }} />
    </div>
  );
};

export default ClubAbout;
