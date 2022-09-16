import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { GET_EVENT_BY_ID } from '../../../utils/queries';
import { ReactQuill } from 'react-quill';
import { UPDATE_EVENT } from '../../../utils/mutations';
import { Loader } from '../../../components/Loader';
import { Button, Col, Form, Row } from 'react-bootstrap';
import FormContainer from '../../../components/FormContainer';
import EventSteps from '../../../components/events/EventSteps';
import moment from 'moment';

const Logistics = () => {
  const search = useLocation().search;
  const id = new URLSearchParams(search).get('eID');
  const [style, setStyle] = useState('');
  const [eventType, setEventType] = useState('');
  const [eventName, setEventName] = useState('');
  const [earlyEntryDeadline, setEarlyEntryDeadline] = useState('');
  const [slug, setSlug] = useState('');
  const { data, loading } = useQuery(GET_EVENT_BY_ID, {
    variables: { _id: id },
  });
  // console.log(id);
  // console.log(data);
  useEffect(() => {
    const eventData = data?.eventById || {};
    if (eventData) {
      setStyle(eventData.style);
      setEventType(eventData.eventType);
      setEventName(eventData.eventName);
      setSlug(eventData.slug);
      setEarlyEntryDeadline(eventData.earlyEntryDeadline);
      // const convertedEarlyEntryDeadline = parseInt(
      //   eventData.earlyEntryDeadline
      // );
      // setEarlyEntryDeadline(
      //   moment(convertedEarlyEntryDeadline).format('MM/DD/YYYY')
      // );
    }
  }, [setStyle, setEventType, setEventName, setSlug, data]);

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
  console.log(earlyEntryDeadline);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await updateEvent({
        variables: {
          style,
          eventType,
          eventName,
          earlyEntryDeadline,
        },
      });
      console.log('DATA!!!!!!! ', data);
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
          {/* <Row>
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
            <Form.Group className='my-3'>
              <Col>
                <Row>
                  <Col sm={12} md={2} className='text-center'>
                    <Form.Label className='form-label'>
                      Early First Entry <span className='text-danger'>*</span>
                    </Form.Label>
                  </Col>
                  <Col sm={12} md={8}>
                    <Form.Control
                      type='number'
                      label='Early First Entry'
                      id='earlyFirstEntry'
                      name='earlyFirstEntry'
                      value={earlyFirstEntry}
                      onChange={(e) => setEarlyFirstEntry(e.target.value)}
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
                      Early Additional Entries{' '}
                      <span className='text-danger'>*</span>
                    </Form.Label>
                  </Col>
                  <Col sm={12} md={8}>
                    <Form.Control
                      type='number'
                      label='Early Additional Entry'
                      id='earlyAddEntry'
                      name='earlyAddEntry'
                      value={earlyAddEntry}
                      onChange={(e) => setEarlyAddEntry(e.target.value)}
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
                      Late First Entry <span className='text-danger'>*</span>
                    </Form.Label>
                  </Col>
                  <Col sm={12} md={8}>
                    <Form.Control
                      type='number'
                      label='Late First Entry'
                      id='lateFirstEntry'
                      name='lateFirstEntry'
                      value={lateFirstEntry}
                      onChange={(e) => setLateFirstEntry(e.target.value)}
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
                      Late Additional Entries{' '}
                      <span className='text-danger'>*</span>
                    </Form.Label>
                  </Col>
                  <Col sm={12} md={8}>
                    <Form.Control
                      type='number'
                      label='Late Additional Entry'
                      id='lateAddEntry'
                      name='lateAddEntry'
                      value={lateAddEntry}
                      onChange={(e) => setLateAddEntry(e.target.value)}
                    ></Form.Control>
                  </Col>
                </Row>
              </Col>
            </Form.Group>
          </Row> */}

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
          </Row>

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

          {/* <Row>
            <Form.Group className='my-3'>
              <Col>
                <Row>
                  <Col sm={12} md={2} className='text-center'>
                    <Form.Label className='form-label'>
                      Weigh In Start Time <span className='text-danger'>*</span>
                    </Form.Label>
                  </Col>
                  <Col sm={12} md={8}>
                    <Form.Control
                      type='time'
                      label='Weigh In Start Time'
                      id='weighInStartTime'
                      name='weighInStartTime'
                      value={weighInStartTime}
                      onChange={(e) => setWeighInStartTime(e.target.value)}
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
                      Weigh In End Time <span className='text-danger'>*</span>
                    </Form.Label>
                  </Col>
                  <Col sm={12} md={8}>
                    <Form.Control
                      type='time'
                      label='Weigh In End Time'
                      id='weighInEndTime'
                      name='weighInEndTime'
                      value={weighInEndTime}
                      onChange={(e) => setWeighInEndTime(e.target.value)}
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
