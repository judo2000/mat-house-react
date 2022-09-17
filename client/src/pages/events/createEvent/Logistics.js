import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { GET_EVENT_BY_ID } from '../../../utils/queries';
import { UPDATE_EVENT } from '../../../utils/mutations';
import { Loader } from '../../../components/Loader';
import { Button, Col, Form, Row } from 'react-bootstrap';
import FormContainer from '../../../components/FormContainer';
import EventSteps from '../../../components/events/EventSteps';
import ReactQuill from 'react-quill';

const Logistics = () => {
  const search = useLocation().search;
  const id = new URLSearchParams(search).get('eID');

  const [eventStyle, setEventStyle] = useState('');
  const [eventType, setEventType] = useState('');
  const [eventName, setEventName] = useState('');
  const [eventCity, setEventCity] = useState('');
  const [eventState, setEventState] = useState('');
  const [eventGenInfo, setEventGenInfo] = useState('');
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

  const { data, loading } = useQuery(GET_EVENT_BY_ID, {
    variables: { id: id },
  });
  console.log(id);
  console.log('DATA ', data);
  useEffect(() => {
    const eventData = data?.eventById || {};

    if (eventData) {
      setEventStyle(eventData.eventStyle);
      setEventType(eventData.eventType);
      setEventName(eventData.eventName);
      setEventCity(eventData.eventCity);
      setEventState(eventData.eventState);
      setEventGenInfo(eventData.eventGenInfo);
      //setEventStartDate(eventData.eventGenInfo);
      //setEarlyEntryDeadline(eventData.earlyEntryDeadline);
      // const convertedEarlyEntryDeadline = parseInt(
      //   eventData.earlyEntryDeadline
      // );
      // setEarlyEntryDeadline(
      //   moment(convertedEarlyEntryDeadline).format('MM/DD/YYYY')
      // );
    }
  }, [
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
  const navigate = useNavigate();

  // const buildDateforForm = (date) => {
  //   let month = moment(date).month().toString();
  //   let day = moment(date).day().toString();
  //   let year = moment(date).year().toString();
  //   if (month < 10) {
  //     month = '0' + month;
  //   }
  //   if (day < 10) {
  //     day = '0' + day;
  //   }
  //   return `${year}-${month}-${day}`;
  // };

  // const reverseDateForSave = (date) => {
  //   let newDate = date.split('/');
  //   let month = newDate[0];
  //   let day = newDate[1];
  //   let year = newDate[2];
  //   let revDate = new Date(`${year}-${month}-${day}Z`);
  //   return revDate;
  // };
  // console.log(earlyEntryDeadline);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(typeof earlyFirstEntryFee);
    console.log(typeof earlyAddEntryFee);
    console.log(typeof lateFirstEntryFee);
    console.log(typeof lateAddEntryFee);
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
      console.log('DATA!!!!!!! ', data);
      navigate(`/events/createEvent/divisions?eID=${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='mt-4'>
      <h1>Create Event</h1>
      <FormContainer>
        <EventSteps step1 step2 />
        <h4>Logistics Information</h4>
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
