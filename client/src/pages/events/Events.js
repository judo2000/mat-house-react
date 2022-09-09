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
          {!eventsData ? (
            eventsData.map((event, index) => {
              return (
                <Col sm={12} md={6} key={index} className='pt-4'>
                  <Card style={{ border: 'solid black 1px' }}>
                    <Card.Title>{event.eventName}</Card.Title>
                    <Card.Body>
                      <NavLink to={event.slug}>{event.slug}</NavLink>
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
