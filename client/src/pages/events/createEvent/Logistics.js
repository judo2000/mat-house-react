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

const Logistics = () => {
  const search = useLocation().search;
  const id = new URLSearchParams(search).get('eID');
  console.log(id);
  const [earlyFirstEntry, setEarlyFirstEntry] = useState(0);
  const [lateFirstEntry, setLateFirstEntry] = useState(0);
  const [earlyAddEntry, setEarlyAddEntry] = useState(0);
  const [lateAddEntry, setLateAddEntry] = useState(0);
  const [earlyEntryDeadline, setEarlyEntryDeadline] = useState('');
  const [entryDeadline, setEntryDeadline] = useState('');
  const [eventStartDate, setEventStartDate] = useState('');
  const [eventEndDate, setEventEndDate] = useState('');
  const [weighInStartTime, setWeighInStartTime] = useState('');
  const [weighInEndTime, setWeighInEndTime] = useState('');
  const [cusLogisticsFields, setCustomLogisticsFields] = useState('');

  const { data, loading } = useQuery(GET_EVENT_BY_ID, {
    variables: { _id: id },
  });
  console.log('data ', data);
  useEffect(() => {
    const eventData = data?.eventById || {};
    setEarlyFirstEntry(eventData.earlyFirstEntry);
    setLateFirstEntry(eventData.lateFirstEntry);
    setEarlyAddEntry(eventData.earlyAddEntry);
    setLateAddEntry(eventData.lateAddEntry);
    setEarlyEntryDeadline(eventData.earlyEntryDeadline);
    setEntryDeadline(eventData.entryDeadline);
    setEventStartDate(eventData.eventStartDate);
    setEventEndDate(eventData.eventEndDate);
    setWeighInStartTime(eventData.weighInStartTime);
    setWeighInEndTime(eventData.weighInEndTime);
    setCustomLogisticsFields(eventData.customLogisticsFields);
  }, [
    setEarlyFirstEntry,
    setLateFirstEntry,
    setEarlyAddEntry,
    setLateAddEntry,
    setEarlyEntryDeadline,
    setEntryDeadline,
    setEventStartDate,
    setEventEndDate,
    setWeighInStartTime,
    setWeighInEndTime,
    setCustomLogisticsFields,
    data,
  ]);

  // set up mutation
  const [updateEvent, { error }] = useMutation(UPDATE_EVENT);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
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
            <Form.Group className='mb-3'>
              <Col>
                <Row>
                  <Col sm={12} md={2} className='text-center'>
                    <Form.Label className='form-label'>
                      Early First Entry <span className='text-danger'>*</span>
                    </Form.Label>
                  </Col>
                  <Col sm={12} md={8}>
                    <Form.Control
                      type='date'
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
        </Form>
      </FormContainer>
    </div>
  );
};

export default Logistics;
