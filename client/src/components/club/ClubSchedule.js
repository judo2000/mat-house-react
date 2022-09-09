import React from 'react';

const ClubSchedule = ({ text }) => {
  return (
    <div>
      <h1>Club Schedule</h1>
      <div dangerouslySetInnerHTML={{ __html: text }} />
    </div>
  );
};

export default ClubSchedule;
