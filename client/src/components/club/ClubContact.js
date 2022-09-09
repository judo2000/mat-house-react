import React from 'react';

const ClubContact = ({ text }) => {
  return (
    <div>
      <h1>Contact Us</h1>
      <div dangerouslySetInnerHTML={{ __html: text }} />
    </div>
  );
};

export default ClubContact;
