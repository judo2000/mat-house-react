import React, { useState } from 'react';
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import FormContainer from '../../../components/FormContainer';
import EventSteps from '../../../components/events/EventSteps';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { CREATE_EVENT } from '../../../utils/mutations';

const BasicInfo = () => {
  const { slug } = useParams();

  const search = useLocation().search;

  const createdBy = new URLSearchParams(search).get('cID');
  const [style, setStyle] = useState('');
  const [eventType, setEventType] = useState('');
  const [eventName, setEventName] = useState('');

  const [addEvent, { error }] = useMutation(CREATE_EVENT);

  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await addEvent({
        variables: {
          style,
          eventType,
          eventName,
          createdBy,
        },
      });
      console.log(data.addEvent._id);
      navigate(`/events/createEvent/logistics?eID=${data.addEvent._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='mt-4'>
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
              <Col sm={12} md={2}>
                <Form.Label as='legend'>
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
                  onChange={(e) => setStyle(e.target.value)}
                ></Form.Check>
                <Form.Check
                  type='radio'
                  label='Judo'
                  id='Judo'
                  name='style'
                  value='Judo'
                  onChange={(e) => setStyle(e.target.value)}
                ></Form.Check>
              </Col>
            </Form.Group>
          </Row>

          <Row>
            <Form.Group className='mb-3'>
              <Col sm={12} md={2}>
                <Form.Label as='legend'>
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
            </Form.Group>
          </Row>

          <Row>
            <Form.Group className='mb-3'>
              <Row>
                <Col>
                  <Row>
                    <Col sm={12} md={2}>
                      <Form.Label as='legend'>
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

          <Button variant='primary' type='submit'>
            Submit
          </Button>
        </Form>
      </FormContainer>
    </div>
  );
};

export default BasicInfo;
