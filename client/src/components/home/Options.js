import React from 'react';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/Row';

import regAthlete from '../../assets/images/layout/home/reg_athlete_298_251.png';
import regCoach from '../../assets/images/layout/home/reg_club_coach_298_251.png';
import regCreate from '../../assets/images/layout/home/reg_create_tournament_298_251.png';
const Options = () => {
  return (
    <>
      <section id='mouseOver' className='my-4'>
        <Row className='text-center'>
          <Col md={4} className='pb-1'>
            <img src={regAthlete} className='img-fluid' alt='Athletes' />
          </Col>
          <Col md={4} className='pb-1'>
            <img src={regCoach} className='img-fluid' alt='Club coaches' />
          </Col>
          <Col md={4} className='pb-1'>
            <img
              src={regCreate}
              className='img-fluid'
              alt='Create a Tournament'
            />
          </Col>
        </Row>
      </section>
    </>
  );
};

export default Options;
