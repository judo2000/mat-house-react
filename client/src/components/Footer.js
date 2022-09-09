import React from 'react';
import Col from 'react-bootstrap/esm/Col';
//import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import { NavLink } from 'react-router-dom';
import fbLogo from '../assets/images/layout/footer_facebook_148_114.jpg';

const Footer = () => {
  return (
    <>
      <div className='footer_main mt-4'>
        <Row id='footer' className='pt2'>
          <Col sm={12} md={3} className='mt-md-0 mt-3'>
            <ul className='list-unstyled'>
              <li>Features (Tournament Director)</li>
              <li>Features (Athlete)</li>
              <li>Upcoming Events</li>
              <li>Pricing</li>
            </ul>
          </Col>
          <Col sm={12} md={3} className='mt-md-0 mt-3'>
            <ul className='list-unstyled'>
              <li>About</li>
              <li>Contact</li>
              <li>Register</li>
              <li>Login</li>
            </ul>
          </Col>
          <Col
            sm={12}
            md={6}
            className='mt-md-0 mt-3 d-flex justify-content-end'
          >
            <img src={fbLogo} className='img-fluid' alt='Find us on Facebook' />
          </Col>
        </Row>
      </div>
      <div id='terms' className='text-black align-left'>
        &#64; 2017. All Rights Reserved
        <br />
        <NavLink to='/terms'>Terms of Service</NavLink> |{' '}
        <NavLink to='/privacy'>Privacy Policy</NavLink>
      </div>
    </>
  );
};

export default Footer;
