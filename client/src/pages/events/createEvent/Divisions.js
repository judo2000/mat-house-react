import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useLocation, useNavigate } from 'react-router-dom';
import { GET_EVENT_BY_ID } from '../../../utils/queries';
import { useEffect } from 'react';
import { UPDATE_EVENT } from '../../../utils/mutations';
import FormContainer from '../../../components/FormContainer';
import EventSteps from '../../../components/events/EventSteps';
import { Button, Col, Form, Row } from 'react-bootstrap';

const Divisions = () => {
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
  const [judoDivJNov, setJudoDivJNov] = useState('');
  const { data, loading } = useQuery(GET_EVENT_BY_ID, {
    variables: { id: id },
  });

  useEffect(() => {
    const eventData = data?.eventById || {};
    if (eventData) {
      setEventStyle(eventData.eventStyle);
      setEventType(eventData.eventType);
      setEventName(eventData.eventName);
      setEventCity(eventData.eventCity);
      setEventState(eventData.eventState);
      setEventGenInfo(eventData.eventGenInfo);
      setEventStartDate(eventData.eventStartDate);
      setEventEndDate(eventData.eventEndDate);
      setEventWeighInInfo(eventData.eventWeighInInfo);
      setEarlyEntryDeadline(eventData.earlyEntryDeadline);
      setEntryDeadline(eventData.entryDeadline);
      setEventStartTime(eventData.eventStartTime);
      setEventWaiver(eventData.eventWaiver);
      setEarlyFirstEntryFee(eventData.earlyFirstEntryFee);
      setEarlyAddEntryFee(eventData.earlyAddEntryFee);
      setLateFirstEntryFee(eventData.lateFirstEntryFee);
      setLateAddEntryFee(eventData.lateAddEntryFee);
    }
  }, [
    setEventStyle,
    setEventType,
    setEventName,
    setEventCity,
    setEventState,
    setEventGenInfo,
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
    data,
  ]);

  // set up mutations
  const [updateEvent, { error }] = useMutation(UPDATE_EVENT);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(judoDivJNov);
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
          judoDivJNov,
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
          {eventStyle === 'Judo' ? (
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
                        type='checkbox'
                        label='judoDivJNov'
                        id='judoDivJNov'
                        name='judoDivJNov'
                        checked={judoDivJNov}
                        onChange={(e) => setJudoDivJNov(e.target.checked)}
                      ></Form.Check>
                    </Col>
                  </Row>
                </Col>
              </Form.Group>
            </Row>
          ) : (
            <h1>BJJ</h1>
          )}

          <Button variant='primary' type='submit'>
            Submit
          </Button>
        </Form>
      </FormContainer>
    </div>
  );
};

export default Divisions;
