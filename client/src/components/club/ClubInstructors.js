import React from 'react';

const ClubInstructors = ({ text }) => {
  return (
    <div>
      <h1>Out Instructors</h1>
      <div dangerouslySetInnerHTML={{ __html: text }} />
    </div>
  );
};

export default ClubInstructors;
