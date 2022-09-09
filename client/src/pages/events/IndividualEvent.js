import React from 'react';
import { useQuery } from '@apollo/client';
import { useLocation, useParams } from 'react-router-dom';
import { GET_EVENT } from '../../utils/queries';
import Loader from '../../components/Loader';
import { Col, Row } from 'react-bootstrap';

const IndividualEvent = () => {
  const { slug } = useParams();
  const search = useLocation().search;

  const { data, loading } = useQuery(GET_EVENT, {
    variables: { slug: slug },
  });

  const event = data?.event || {};
  console.log(event);
  return loading ? (
    <Loader />
  ) : (
    <Row>
      <Col>
        <h2 className='text-center'>{event.eventName}</h2>
      </Col>
    </Row>
  );
};

export default IndividualEvent;
