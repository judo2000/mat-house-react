import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_EVENT } from '../../../utils/mutations';
import Loader from '../../../components/Loader';
import { Button, Col, Form, Row } from 'react-bootstrap';
import FormContainer from '../../../components/FormContainer';
import EventSteps from '../../../components/events/EventSteps';
import ReactQuill from 'react-quill';
import Auth from '../../../utils/auth';
import { toast, ToastContainer } from 'react-toastify';
import { GET_EVENT_BY_ID } from '../../../utils/queries';
import moment from 'moment';

const Logistics = () => {
  const search = useLocation().search;
  const id = new URLSearchParams(search).get('eId');
  console.log(id);
  const token = Auth.loggedIn() ? Auth.getToken() : null;

  const [eventStartDate, setEventStartDate] = useState('');
  const [eventEndDate, setEventEndDate] = useState('');
  const [eventWeighInInfo, setEventWeighInInfo] = useState('');
  const [earlyEntryDeadline, setEarlyEntryDeadline] = useState('');
  const [entryDeadline, setEntryDeadline] = useState('');
  const [eventStartTime, setEventStartTime] = useState('');
  const [eventWaiver, setEventWaiver] = useState('');
  const [earlyFirstEntryFee, setEarlyFirstEntryFee] = useState('');
  const [earlyAddEntryFee, setEarlyAddEntryFee] = useState('');
  const [lateFirstEntryFee, setLateFirstEntryFee] = useState('');
  const [lateAddEntryFee, setLateAddEntryFee] = useState('');

  const { loading, data } = useQuery(GET_EVENT_BY_ID, {
    variables: { id: id },
  });
  console.log(data);
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
    const eventData = data?.eventById || {};
    let tempDate = parseInt(eventData.eventStartDate);
    setEventStartDate(moment(tempDate).add(1, 'days').format('YYYY-MM-DD'));
    tempDate = parseInt(eventData.eventEndDate);
    setEventEndDate(moment(tempDate).add(1, 'days').format('YYYY-MM-DD'));
    setEventWeighInInfo(eventData.eventWeighInInfo);
    setEarlyEntryDeadline(eventData.earlyEntryDeadline);
    setEntryDeadline(eventData.entryDeadline);
    setEventStartTime(eventData.eventStartTime);
    setEventWaiver(eventData.eventWaiver);
    setEarlyFirstEntryFee(eventData.earlyFirstEntryFee);
    setEarlyAddEntryFee(eventData.earlyAddEntryFee);
    setLateFirstEntryFee(eventData.lateFirstEntryFee);
    setLateAddEntryFee(eventData.lateAddEntryFee);
  }, [
    setErrorMessage,
    navigate,
    token,
    data,
    setEventStartDate,
    setEventEndDate,
    setEventWeighInInfo,
    setEarlyEntryDeadline,
    setEntryDeadline,
    setEventStartTime,
    setEventWaiver,
    setEarlyFirstEntryFee,
    setEarlyAddEntryFee,
    setLateFirstEntryFee,
    setLateAddEntryFee,
  ]);

  // set up mutation
  const [updateEvent] = useMutation(UPDATE_EVENT);
  console.log('EVENT START DATE ', moment(eventStartDate).format('MM-DD-YYYY'));
  // const tempDate = parseInt(eventStartDate);
  // const date = new Date(tempDate);
  // const newDate = moment(date).add(1, 'days').format('YYYY/MM/DD');
  // console.log('NEW DATE ', newDate);

  console.log('EVENT START DATE ', eventStartDate);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await updateEvent({
        variables: {
          id,
          eventStartDate,
          eventEndDate,
          eventWeighInInfo,
          earlyEntryDeadline,
          entryDeadline,
          earlyFirstEntryFee,
          earlyAddEntryFee,
          lateFirstEntryFee,
          lateAddEntryFee,
          eventStartTime,
          eventWaiver,
        },
      });
      console.log(moment(eventStartDate).format('MM-DD-YYYY'));
      console.log('DATA!!!!!!! ', data);
      //navigate(`/events/createEvent/divisions?eId=${id}`);
    } catch (error) {
      console.log(error);
    }
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
        <EventSteps step1 step2 id={id} />
        <h4>Logistics Information</h4>
        {loading && <Loader />}
        <div>
          <span className='text-danger'>*</span>
        </div>
        <Form onSubmit={handleSubmit} style={{ border: 'solid black 1px' }}>
          <Row>
            <Form.Group className='my-3'>
              <Col>
                <Row>
                  <Col sm={12} md={2} className='text-center'>
                    <Form.Label className='form-label'>
                      Event Start Date <span className='text-danger'>*</span>
                    </Form.Label>
                  </Col>
                  {eventStartDate}
                  <Col sm={12} md={8}>
                    <Form.Control
                      type='date'
                      label='Event Start Date'
                      id='eventStartDate'
                      name='eventStartDate'
                      value={eventStartDate}
                      onChange={(e) => setEventStartDate(e.target.value)}
                    ></Form.Control>
                  </Col>
                </Row>
              </Col>
            </Form.Group>
          </Row>

          <Row>
            <Form.Group className='my-3'>
              <Col>
                <Row>
                  <Col sm={12} md={2} className='text-center'>
                    <Form.Label className='form-label'>
                      Event End Date <span className='text-danger'>*</span>
                    </Form.Label>
                  </Col>
                  <Col sm={12} md={8}>
                    <Form.Control
                      type='date'
                      label='Event End Date'
                      id='eventEndDate'
                      name='eventEndDate'
                      value={eventEndDate}
                      onChange={(e) => setEventEndDate(e.target.value)}
                    ></Form.Control>
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
                      Weigh In Info
                    </Form.Label>
                  </Col>
                  <Col sm={12} md='8' className='text-start'>
                    <ReactQuill
                      value={eventWeighInInfo ? eventWeighInInfo : ''}
                      // onChange={(e) => setContent(e.target.value)}
                      onChange={setEventWeighInInfo}
                      theme='snow'
                    ></ReactQuill>
                  </Col>
                </Row>
              </Col>
            </Form.Group>
          </Row>

          <Row>
            <Form.Group className='my-3'>
              <Col>
                <Row>
                  <Col sm={12} md={2} className='text-center'>
                    <Form.Label className='form-label'>
                      Early Entry Deadline{' '}
                      <span className='text-danger'>*</span>
                    </Form.Label>
                  </Col>
                  <Col sm={12} md={8}>
                    <Form.Control
                      type='date'
                      label='Early Entry Deadline'
                      id='earlyEntryDeadline'
                      name='earlyEntryDeadline'
                      value={earlyEntryDeadline}
                      onChange={(e) => setEarlyEntryDeadline(e.target.value)}
                    ></Form.Control>
                  </Col>
                </Row>
              </Col>
            </Form.Group>
          </Row>

          <Row>
            <Form.Group className='my-3'>
              <Col>
                <Row>
                  <Col sm={12} md={2} className='text-center'>
                    <Form.Label className='form-label'>
                      Entry Deadline <span className='text-danger'>*</span>
                    </Form.Label>
                  </Col>
                  <Col sm={12} md={8}>
                    <Form.Control
                      type='date'
                      label='Entry Deadline'
                      id='entryDeadline'
                      name='entryDeadline'
                      value={entryDeadline}
                      onChange={(e) => setEntryDeadline(e.target.value)}
                    ></Form.Control>
                  </Col>
                </Row>
              </Col>
            </Form.Group>
          </Row>

          <Row>
            <Form.Group className='my-3'>
              <Col>
                <Row>
                  <Col sm={12} md={2} className='text-center'>
                    <Form.Label className='form-label'>
                      Early First Entry Fee{' '}
                      <span className='text-danger'>*</span>
                    </Form.Label>
                  </Col>
                  <Col sm={12} md={8}>
                    <Form.Control
                      type='number'
                      label='Early First Entry Fee'
                      id='earlyFirstEntryFee'
                      name='earlyFirstEntryFee'
                      value={earlyFirstEntryFee}
                      onChange={(e) =>
                        setEarlyFirstEntryFee(e.target.valueAsNumber)
                      }
                    ></Form.Control>
                  </Col>
                </Row>
              </Col>
            </Form.Group>
          </Row>

          <Row>
            <Form.Group className='my-3'>
              <Col>
                <Row>
                  <Col sm={12} md={2} className='text-center'>
                    <Form.Label className='form-label'>
                      Early Additional Entry Fees{' '}
                      <span className='text-danger'>*</span>
                    </Form.Label>
                  </Col>
                  <Col sm={12} md={8}>
                    <Form.Control
                      type='number'
                      label='Early Additional Entry Fees'
                      id='earlyAddEntryFee'
                      name='earlyAddEntryFee'
                      value={earlyAddEntryFee}
                      onChange={(e) =>
                        setEarlyAddEntryFee(e.target.valueAsNumber)
                      }
                    ></Form.Control>
                  </Col>
                </Row>
              </Col>
            </Form.Group>
          </Row>

          <Row>
            <Form.Group className='my-3'>
              <Col>
                <Row>
                  <Col sm={12} md={2} className='text-center'>
                    <Form.Label className='form-label'>
                      Late First Entry Fee{' '}
                      <span className='text-danger'>*</span>
                    </Form.Label>
                  </Col>
                  <Col sm={12} md={8}>
                    <Form.Control
                      type='number'
                      label='Late First Entry Fee'
                      id='lateFirstEntryFee'
                      name='lateFirstEntryFee'
                      value={lateFirstEntryFee}
                      onChange={(e) =>
                        setLateFirstEntryFee(e.target.valueAsNumber)
                      }
                    ></Form.Control>
                  </Col>
                </Row>
              </Col>
            </Form.Group>
          </Row>

          <Row>
            <Form.Group className='my-3'>
              <Col>
                <Row>
                  <Col sm={12} md={2} className='text-center'>
                    <Form.Label className='form-label'>
                      Late Additional Entry Fee{' '}
                      <span className='text-danger'>*</span>
                    </Form.Label>
                  </Col>
                  <Col sm={12} md={8}>
                    <Form.Control
                      type='number'
                      label='Late Additional Entry Fee'
                      id='lateAddEntryFee'
                      name='lateAddEntryFee'
                      value={lateAddEntryFee}
                      onChange={(e) =>
                        setLateAddEntryFee(e.target.valueAsNumber)
                      }
                    ></Form.Control>
                  </Col>
                </Row>
              </Col>
            </Form.Group>
          </Row>

          <Row>
            <Form.Group className='my-3'>
              <Col>
                <Row>
                  <Col sm={12} md={2} className='text-center'>
                    <Form.Label className='form-label'>
                      Entry Deadline <span className='text-danger'>*</span>
                    </Form.Label>
                  </Col>
                  <Col sm={12} md={8}>
                    <Form.Control
                      type='time'
                      label='Event Start Time'
                      id='eventStartTime'
                      name='eventStartTime'
                      value={eventStartTime}
                      onChange={(e) => setEventStartTime(e.target.value)}
                    ></Form.Control>
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
                    <Form.Label className='form-label'>Event Waiver</Form.Label>
                  </Col>
                  <Col sm={12} md='8' className='text-start'>
                    <ReactQuill
                      value={eventWaiver ? eventWaiver : ''}
                      // onChange={(e) => setContent(e.target.value)}
                      onChange={setEventWaiver}
                      theme='snow'
                    ></ReactQuill>
                  </Col>
                </Row>
              </Col>
            </Form.Group>
          </Row>

          {/*
          <Row>
            <Form.Group className='my-3'>
              <Col>
                <Row>
                  <Col sm={12} md={2} className='text-center'>
                    <Form.Label className='form-label'>
                      Early Entry Deadline{' '}
                      <span className='text-danger'>*</span>
                    </Form.Label>
                  </Col>
                  {}
                  <Col sm={12} md={8}>
                    <Form.Control
                      type='date'
                      label='Early Entry Deadline '
                      id='earlyEntryDeadline'
                      name='earlyEntryDeadline'
                      value={earlyEntryDeadline}
                      onChange={(e) => setEarlyEntryDeadline(e.target.value)}
                    ></Form.Control>
                  </Col>
                </Row>
              </Col>
            </Form.Group>
          </Row>*/}

          {/* <Row>
            <Form.Group className='my-3'>
              <Col>
                <Row>
                  <Col sm={12} md={2} className='text-center'>
                    <Form.Label className='form-label'>
                      Entry Deadline <span className='text-danger'>*</span>
                    </Form.Label>
                  </Col>
                  <Col sm={12} md={8}>
                    <Form.Control
                      type='date'
                      label='Entry Deadline '
                      id='entryDeadline'
                      name='entryDeadline'
                      value={buildDateforForm(entryDeadline)}
                      onChange={(e) => setEntryDeadline(e.target.value)}
                    ></Form.Control>
                  </Col>
                </Row>
              </Col>
            </Form.Group>
          </Row> */}

          <Button variant='primary' type='submit'>
            Submit
          </Button>
        </Form>
      </FormContainer>
    </div>
  );
};

export default Logistics;
