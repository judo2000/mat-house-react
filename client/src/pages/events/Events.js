import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_EVENTS } from '../../utils/queries';
import Loader from '../../components/Loader';
import { Card, Col, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import { Link } from 'react-router-dom';

const Events = () => {
  const { data, loading } = useQuery(GET_EVENTS);

  const eventsData = data?.events || {};

  const convertDate = (date) => {
    let tempDate = parseInt(date);
    return moment(tempDate).add(1, 'days').format('MM-DD-YYYY');
  };
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
                <Col sm={12} md={4} key={index} className='pt-4'>
                  <Link to={event.slug} className='eventCard'>
                    <Card
                      style={{
                        height: '350px',
                        border: 'solid #000000 1px',
                        background: `lightgray`,
                      }}
                    >
                      <Card.Title
                        style={{ opacity: 1 }}
                        className='pb-0 text-center'
                      >
                        {event.eventName}
                        <br />
                      </Card.Title>
                      <Card.Body className=' pt-0 text-center'>
                        {convertDate(event.eventStartDate)}
                        <br />
                        {event.eventCity}, {event.eventState}
                        <br />
                        {event.logo ? (
                          <>
                            <img
                              className='eventBgImage align-items-top'
                              src={event.logo}
                              style={{ opacity: 0.5, height: '150px' }}
                              alt='Event Logo'
                            />
                            <br />
                          </>
                        ) : (
                          <br />
                        )}
                        <NavLink className='text-black' to={event.slug}>
                          Event Details
                        </NavLink>
                      </Card.Body>
                    </Card>
                  </Link>
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
