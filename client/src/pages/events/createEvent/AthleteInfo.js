import { useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import EventSteps from '../../../components/events/EventSteps';
import FormContainer from '../../../components/FormContainer';
import { UPDATE_EVENT } from '../../../utils/mutations';
import Auth from '../../../utils/auth';
import { toast, ToastContainer } from 'react-toastify';
import { GET_EVENT_BY_ID } from '../../../utils/queries';

const AthleteInfo = () => {
  const search = useLocation().search;
  const id = new URLSearchParams(search).get('eId');
  const token = Auth.loggedIn() ? Auth.getToken() : null;

  const [athleteFirstName, setAthleteFirstName] = useState(false);
  const [athleteLastName, setAthleteLastName] = useState(false);
  const [athleteDOB, setAthleteDOB] = useState(false);
  const [athleteAddress1, setAthleteAddress1] = useState(false);
  const [athleteAddress2, setAthleteAddress2] = useState(false);
  const [athleteCity, setAthleteCity] = useState(false);
  const [athleteState, setAthleteState] = useState(false);
  const [athleteEmail, setAthleteEmail] = useState(false);
  const [athleteRank, setAthleteRank] = useState(false);

  const { data } = useQuery(GET_EVENT_BY_ID, {
    variables: { id: id },
  });
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!token) {
      setErrorMessage('You must be logged in to access this page');
      toast('You must be logged in to access this page');
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }

    const eventData = data?.eventById || {};
    setAthleteFirstName(eventData.athleteFirstName);
    setAthleteLastName(eventData.athleteLastName);
    setAthleteDOB(eventData.athleteDOB);
    setAthleteAddress1(eventData.athleteAddress1);
    setAthleteAddress2(eventData.athleteAddress2);
    setAthleteCity(eventData.athleteCity);
    setAthleteState(eventData.athleteState);
    setAthleteEmail(eventData.athleteEmail);
    setAthleteRank(eventData.athleteRank);
  }, [
    setErrorMessage,
    navigate,
    data,
    token,
    setAthleteFirstName,
    setAthleteLastName,
    setAthleteDOB,
    setAthleteAddress1,
    setAthleteAddress2,
    setAthleteCity,
    setAthleteState,
    setAthleteEmail,
    setAthleteRank,
  ]);

  // set up mutations
  const [updateEvent] = useMutation(UPDATE_EVENT);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await updateEvent({
        variables: {
          id,
          athleteFirstName,
          athleteLastName,
          athleteDOB,
          athleteAddress1,
          athleteAddress2,
          athleteCity,
          athleteState,
          athleteEmail,
          athleteRank,
        },
      });
      //navigate(`/events/createEvent/finish?eId=${id}`);
      return data;
    } catch (error) {}
  };
  return (
    <div className='mt-4'>
      <h1>Create Event</h1>
      {/* {loading && <Loader />} */}
      {/* {error && <Message variant='danger'>{error}</Message>} */}
      {errorMessage ? (
        <h3>
          <ToastContainer
            position='top-right'
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </h3>
      ) : (
        ''
      )}
      <FormContainer>
        <EventSteps step1 step2 step3 step4 step5 id={id} />
        <h4>Athlete Information</h4>
        <div>
          <span className='text-danger'>*</span>
        </div>
        <Form onSubmit={handleSubmit} style={{ border: 'solid black 1px' }}>
          <Row>
            <Form.Group className='nb-3'>
              <Col>
                <Row>
                  <Col sm={12} md={2} className='text-center'>
                    <Form.Label className='form-label'>Basic Info</Form.Label>
                  </Col>
                  {athleteFirstName}
                  <Col sm={12} md={8}>
                    <Form.Check
                      type='checkbox'
                      label='First Name'
                      id='athleteFirstName'
                      name='athleteFirstName'
                      checked={athleteFirstName || false}
                      onChange={(e) => setAthleteFirstName(e.target.checked)}
                    ></Form.Check>

                    <Form.Check
                      type='checkbox'
                      label='Last Name'
                      id='athleteLastName'
                      name='athleteLastName'
                      checked={athleteLastName || false}
                      onChange={(e) => setAthleteLastName(e.target.checked)}
                    ></Form.Check>

                    <Form.Check
                      type='checkbox'
                      label='Date of Birth'
                      id='athleteDOB'
                      name='athleteDOB'
                      checked={athleteDOB || false}
                      onChange={(e) => setAthleteDOB(e.target.checked)}
                    ></Form.Check>

                    <Form.Check
                      type='checkbox'
                      label='Address 1 '
                      id='athleteAddress1'
                      name='athleteAddress1'
                      checked={athleteAddress1 || false}
                      onChange={(e) => setAthleteAddress1(e.target.checked)}
                    ></Form.Check>

                    <Form.Check
                      type='checkbox'
                      label='Address 2 '
                      id='athleteAddress2'
                      name='athleteAddress2'
                      checked={athleteAddress2 || false}
                      onChange={(e) => setAthleteAddress2(e.target.checked)}
                    ></Form.Check>

                    <Form.Check
                      type='checkbox'
                      label='City'
                      id='athleteCity'
                      name='athleteCity'
                      checked={athleteCity || false}
                      onChange={(e) => setAthleteCity(e.target.checked)}
                    ></Form.Check>

                    <Form.Check
                      type='checkbox'
                      label='State'
                      id='athleteState'
                      name='athleteState'
                      checked={athleteState || false}
                      onChange={(e) => setAthleteState(e.target.checked)}
                    ></Form.Check>

                    <Form.Check
                      type='checkbox'
                      label='Email'
                      id='athleteEmail'
                      name='athleteEmail'
                      checked={athleteEmail || false}
                      onChange={(e) => setAthleteEmail(e.target.checked)}
                    ></Form.Check>

                    <Form.Check
                      type='checkbox'
                      label='Rank'
                      id='athleteRank'
                      name='athleteRank'
                      checked={athleteRank || false}
                      onChange={(e) => setAthleteRank(e.target.checked)}
                    ></Form.Check>
                  </Col>
                </Row>
              </Col>
            </Form.Group>
          </Row>
          <Button type='submit'>Submit</Button>
        </Form>
      </FormContainer>
    </div>
  );
};

export default AthleteInfo;
