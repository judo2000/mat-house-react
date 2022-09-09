import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { listClubs } from '../actions/clubActions';
import { useQuery } from '@apollo/client';
import { GET_CLUBS } from '../utils/queries';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Card from 'react-bootstrap/esm/Card';
import { Link, NavLink } from 'react-router-dom';
import Loader from '../components/Loader';
import { useEffect } from 'react';

const Clubs = () => {
  // const token = Auth.loggedIn() ? Auth.getToken() : null;
  // console.log(token);

  const { data, loading } = useQuery(GET_CLUBS);

  const clubsData = data?.clubs || {};
  console.log(clubsData);

  return (
    <>
      <h1>Club Listings</h1>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Row>
            <Col md={6}>
              <Link to='create/' className='btn mb-4'>
                Add a Club
              </Link>
            </Col>
          </Row>
          <Row>
            {clubsData.map((club, index) => {
              return (
                <Col sm={6} key={index} className='pt-4'>
                  <Card style={{ border: 'solid black 1px' }}>
                    <Card.Title className='card-header'>
                      {club.clubName}
                    </Card.Title>
                    <Card.Body>
                      <span className='card-title'>Head Instructors(s)</span> -{' '}
                      {club.headInstructor}
                      <p className='card-text'>
                        {' '}
                        {club.city}, {club.state} {club.country}
                      </p>
                      <NavLink to={club.slug}>View Club Page</NavLink>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </>
      )}
    </>
  );
};

export default Clubs;
