import React from 'react';
import Row from 'react-bootstrap/Row';
import { NavLink } from 'react-router-dom';
import Col from 'react-bootstrap/esm/Col';
import upcomingEventsImg from '../../assets/images/layout/home/upcoming_events_709_129.jpg';

const Events = () => {
  return (
    <>
      <Row className='text-center'>
        <Col sm={12} className='content-center'>
          <NavLink to='/features'>
            <img
              src={upcomingEventsImg}
              className='img-fluid'
              alt='Upcoming Events'
            />
          </NavLink>
        </Col>
      </Row>
    </>
  );
};

export default Events;
