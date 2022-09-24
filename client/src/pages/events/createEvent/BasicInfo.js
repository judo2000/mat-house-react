import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FormContainer from '../../../components/FormContainer';
import EventSteps from '../../../components/events/EventSteps';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { CREATE_EVENT } from '../../../utils/mutations';
import ReactQuill from 'react-quill';
import Loader from '../../../components/Loader';
import Message from '../../../components/Message';
import Auth from '../../../utils/auth';
import { toast, ToastContainer } from 'react-toastify';

const BasicInfo = () => {
  const search = useLocation().search;
  const token = Auth.loggedIn() ? Auth.getToken() : null;

  let [count, setCount] = useState(0);
  const createdBy = new URLSearchParams(search).get('cID');
  const [eventStyle, setEventStyle] = useState('');
  const [eventType, setEventType] = useState('');
  const [eventName, setEventName] = useState('');
  const [eventCity, setEventCity] = useState('');
  const [eventState, setEventState] = useState('');
  const [eventGenInfo, setEventGenInfo] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setErrorMessage('You must be logged in to access this page');
      toast('You must be logged in to access this page');
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  }, [setErrorMessage, navigate, token]);

  const [loading, error, addEvent] = useMutation(CREATE_EVENT);

  //const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(count);
    // let fieldEl = document.getElementById(`customField1`);
    // console.log(fieldEl.value);

    // for (let i = 1; i < count + 1; i++) {
    //   console.log('i = ', i);
    // let fieldEl = document.getElementById(`customField${i}`);
    // let fieldVal = fieldEl.value;
    // console.log(fieldEl);
    // customBasicFields.push(fieldVal);
    // }
    try {
      const { data } = await addEvent({
        variables: {
          eventStyle,
          eventType,
          eventName,
          eventCity,
          eventState,
          eventGenInfo,
          createdBy,
        },
      });
      console.log(data);
      navigate(`/events/createEvent/logistics?eId=${data.addEvent._id}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddFields = async (e) => {
    e.preventDefault();
    count = count + 1;
    setCount(count);
    let customFieldsDiv = document.getElementById('customFields');
    // Create an <input> element, set its type and name attributes
    let customGrid = `
      <div class='row'>
        <div class='mb-3'>
          <div class='col'>
            <div class='row'>
              <div class='text-end col-md-2 col-sm-12'>
                <div class='form-label text-center'>
                  Custom Field ${count}
                </div>
              </div>
              <div class='col-sm-12 col-md-8'>
                <input id=customField${count} type='text' name='customField${count}' value />
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    // // let input = document.createElement('input');
    // // input.type = 'text';
    // // input.name = 'customField' + count;
    // //Row.content(input);
    customFieldsDiv.innerHTML += customGrid;
    // Append a line break
    customFieldsDiv.appendChild(document.createElement('br'));
    return count;
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
      <FormContainer>
        <EventSteps step1 />
        <h4>Basic Information</h4>
        {loading && <Loader />}
        {error && <Message variant='danger'>{error}</Message>}
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
                      value='Brazilian Jui Jitsu'
                      onChange={(e) => setEventStyle(e.target.value)}
                    ></Form.Check>
                    <Form.Check
                      type='radio'
                      label='Judo'
                      id='Judo'
                      name='style'
                      value='Judo'
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
                      onChange={(e) => setEventType(e.target.value)}
                    ></Form.Check>
                    <Form.Check
                      type='radio'
                      label='Clinic'
                      id='Clinic'
                      name='eventType'
                      value='Clinic'
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
export default BasicInfo;
