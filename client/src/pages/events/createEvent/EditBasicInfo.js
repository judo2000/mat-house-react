import React, { useState, useEffect } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import { useLocation, useNavigate } from 'react-router-dom';
import EventSteps from '../../../components/events/EventSteps';
import FormContainer from '../../../components/FormContainer';
import Auth from '../../../utils/auth';
import jwt from 'jwt-decode';
import { useMutation, useQuery } from '@apollo/client';
import { GET_EVENT_BY_ID } from '../../../utils/queries';
import { UPDATE_EVENT } from '../../../utils/mutations';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditBasicInfo = () => {
  const token = Auth.loggedIn() ? Auth.getToken() : null;

  const search = useLocation().search;
  const id = new URLSearchParams(search).get('eID');

  const [eventStyle, setEventStyle] = useState('');
  const [eventType, setEventType] = useState('');
  const [eventName, setEventName] = useState('');
  const [eventCity, setEventCity] = useState('');
  const [eventState, setEventState] = useState('');
  const [eventGenInfo, setEventGenInfo] = useState('');

  const { data, loading } = useQuery(GET_EVENT_BY_ID, {
    variables: { id: id },
  });

  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!token) {
      setErrorMessage('You must be logged in to access this page');
      toast('You must be logged in to access this page');
      const timer = setTimeout(() => {
        navigate('/');
      }, 3000);
    }
    const eventData = data?.eventById || {};

    if (eventData) {
      setEventStyle(eventData.eventStyle);
      setEventType(eventData.eventType);
      setEventName(eventData.eventName);
      setEventCity(eventData.eventCity);
      setEventState(eventData.eventState);
      setEventGenInfo(eventData.eventGenInfo);
    }
  }, [
    token,
    navigate,
    setEventStyle,
    setEventType,
    setEventName,
    setEventCity,
    setEventState,
    setEventGenInfo,
    data,
  ]);

  // set up mutation
  const [updateEvent, { error }] = useMutation(UPDATE_EVENT);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (eventCity === '') {
      toast.error('City is required', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setErrorMessage('City is required');
    } else if (eventState === '') {
      setErrorMessage('State is required');
      toast.error('State is required', {
        position: 'top-right',
        theme: 'dark',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    if (errorMessage) {
    }
    try {
      const { data } = await updateEvent({
        variables: {
          id,
          eventStyle,
          eventType,
          eventName,
          eventCity,
          eventState,
          eventGenInfo,
        },
      });
      navigate(`/events/createEvent/logistics?eId${id}`);
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
      if (error.message.includes('eventName_1 dup key')) {
        toast('That event name is taken, please choose another name');
      } else if (eventCity === '') {
        toast('City is required');
      } else if (error.message.includes('Please fill a valid email address')) {
        toast('Please enter a valid email address');
      } else if (error.message.includes('clubEmail_1 dup key')) {
        toast(
          'That club email is already taken, please enter another email address.'
        );
      }
    }
  };
  const handleAddFields = async (e) => {
    e.preventDefault();
  };
  return (
    <div className='mt-4'>
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
      <h1>Create Event</h1>
      <FormContainer>
        <EventSteps step1 />
        <h4>Basic Information</h4>
        <div>
          <span className='text-danger'>*</span> indicates required fields.
        </div>
        <Form onSubmit={handleSubmit} style={{ border: 'solid black 1px' }}>
          <Row>
            <Form.Group className='mb-3'>
              <Col>
                <Row>
                  <Col sm={12} md={2} className='text-center'>
                    <Form.Label className='form-label'>
                      Style <span className='text-danger'>*</span>
                    </Form.Label>
                  </Col>
                  <Col sm={12} md={8}>
                    <Form.Check
                      type='radio'
                      label='Brazilian Jui Jitsu'
                      id='BJJ'
                      name='style'
                      value='BJJ'
                      checked={eventStyle === 'BJJ'}
                      onChange={(e) => setEventStyle(e.target.value)}
                    ></Form.Check>
                    <Form.Check
                      type='radio'
                      label='Judo'
                      id='Judo'
                      name='style'
                      value='Judo'
                      checked={eventStyle === 'Judo'}
                      onChange={(e) => setEventStyle(e.target.value)}
                    ></Form.Check>
                  </Col>
                </Row>
              </Col>
            </Form.Group>
          </Row>

          <Row>
            <Form.Group className='mb-3'>
              <Col>
                <Row>
                  <Col sm={12} md={2} className='text-center'>
                    <Form.Label className='form-label'>
                      Event Type <span className='text-danger'>*</span>
                    </Form.Label>
                  </Col>
                  <Col sm={12} md={8}>
                    <Form.Check
                      type='radio'
                      label='Tournament'
                      id='Tournament'
                      name='eventType'
                      value='Tournament'
                      checked={eventType === 'Tournament'}
                      onChange={(e) => setEventType(e.target.value)}
                    ></Form.Check>
                    <Form.Check
                      type='radio'
                      label='Clinic'
                      id='Clinic'
                      name='eventType'
                      value='Clinic'
                      checked={eventType === 'Clinic'}
                      onChange={(e) => setEventType(e.target.value)}
                    ></Form.Check>
                  </Col>
                </Row>
              </Col>
            </Form.Group>
          </Row>

          <Row>
            <Form.Group className='mb-3'>
              <Row>
                <Col>
                  <Row>
                    <Col sm={12} md={2} className='text-center'>
                      <Form.Label className='form-label'>
                        Event Name <span className='text-danger'>*</span>
                      </Form.Label>
                    </Col>
                    <Col sm={12} md={8} className='text-start'>
                      <Form.Control
                        type='text'
                        label='Event Name'
                        id='eventName'
                        name='eventName'
                        value={eventName}
                        onChange={(e) => setEventName(e.target.value)}
                      ></Form.Control>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Form.Group>
          </Row>

          <Row>
            <Form.Group className='mb-3'>
              <Row>
                <Col>
                  <Row>
                    <Col sm={12} md={2} className='text-center'>
                      <Form.Label className='form-label'>
                        Event Location <span className='text-danger'>*</span>
                      </Form.Label>
                    </Col>
                    <Col sm={12} md={8} className='text-start'>
                      <Row>
                        <Col sm={12} md={2} className='text-center'>
                          <Form.Label className='form-label'>
                            City <span className='text-danger'>*</span>
                          </Form.Label>
                        </Col>
                        <Col sm={12} md='4'>
                          <Form.Control
                            type='text'
                            label='Event City'
                            id='eventCity'
                            name='eventCity'
                            value={eventCity}
                            onChange={(e) => setEventCity(e.target.value)}
                          ></Form.Control>
                        </Col>
                        <Col sm={12} md={2} className='text-center'>
                          <Form.Label className='form-label'>
                            State <span className='text-danger'>*</span>
                          </Form.Label>
                        </Col>
                        <Col sm={12} md={4}>
                          <Form.Control
                            type='text'
                            label='State'
                            id='eventState'
                            name='eventState'
                            value={eventState}
                            onChange={(e) => setEventState(e.target.value)}
                          ></Form.Control>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Form.Group>
          </Row>

          <Row>
            <Form.Group className='mb-3'>
              <Col>
                <Row>
                  <Col sm={12} md={2} className='text-center'>
                    <Form.Label className='form-label'>General Info</Form.Label>
                  </Col>
                  <Col sm={12} md='8' className='text-start'>
                    <ReactQuill
                      value={eventGenInfo ? eventGenInfo : ''}
                      // onChange={(e) => setContent(e.target.value)}
                      onChange={setEventGenInfo}
                      theme='snow'
                    ></ReactQuill>
                  </Col>
                </Row>
              </Col>
            </Form.Group>
          </Row>

          <Button type='btn' onClick={handleAddFields}>
            Add Custom Fields
          </Button>
          <div id='customFields' dangerouslySetInnerHTML={{ __html: '' }} />

          <Button variant='primary' type='submit'>
            Submit
          </Button>
        </Form>
      </FormContainer>
    </div>
  );
};

export default EditBasicInfo;
