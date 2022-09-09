import React from 'react';

const ClubHome = ({ text }) => {
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: text }} />
    </div>
  );
};

export default ClubHome;
