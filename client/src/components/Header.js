import React from 'react';
import MainNav from './MainNav';
import Col from 'react-bootstrap/Col';

const Header = () => {
  return (
    <>
      <MainNav />
      <div className='jumbotron pt-3 align-text-top text-center text-white'>
        <Col md={12}>
          <h1 className='display-4'>How It Works</h1>
          <p className='lead '>
            TheMatHouse allows you to control and manage your personal
            tournament experience. Create a profile for simple, one-time
            registration of a tournament and be able to track your tournaments.
            <br />
            <br />
            Join for <b>FREE</b> and simplify your tournament experience!
          </p>
        </Col>
      </div>
    </>
  );
};

export default Header;
