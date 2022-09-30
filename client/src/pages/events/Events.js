import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_EVENTS } from '../../utils/queries';
import Loader from '../../components/Loader';
import { Card, Col, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const Events = () => {
  const { data, loading } = useQuery(GET_EVENTS);

  const eventsData = data?.events || {};
  console.log(eventsData);
  return (
    <>
      <h1>Upcoming Events</h1>
      {loading ? (
        <Loader />
      ) : (
        <Row>
          {eventsData ? (
            eventsData.map((event, index) => {
              return (
                <Col sm={12} md={3} key={index} className='pt-4'>
                  <Card
                    style={{
                      height: '350px',
                      border: 'solid #000000 1px',
                      backgroundColor: 'lightgray',
                      opacity: 0.8,
                      background: `lightgray `,
                    }}
                  >
                    <Card.Title className='pb-0'>
                      {event.eventName}
                      <br />
                    </Card.Title>
                    <Card.Body
                      className='row align-items-end pt-0 text-center'
                      style={{
                        background: `url(${event.logo}) center no-repeat`,
                      }}
                    >
                      <NavLink className='text-black' to={event.slug}>
                        Click here for details
                      </NavLink>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })
          ) : (
            <p>Sorry, there are currently no events. Please check back soon.</p>
          )}
        </Row>
      )}
    </>
  );
};

export default Events;
