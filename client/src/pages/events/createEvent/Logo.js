import React, { useState, useEffect } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { storage } from '../../../firebase';
import { ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { GET_EVENT_BY_ID } from '../../../utils/queries';
import { UPDATE_EVENT } from '../../../utils/mutations';
import EventSteps from '../../../components/events/EventSteps';
import FormContainer from '../../../components/FormContainer';

const Logo = () => {
  const search = useLocation().search;
  const id = new URLSearchParams(search).get('eID');

  const [eventStyle, setEventStyle] = useState('');
  // const [eventType, setEventType] = useState('');
  // const [eventName, setEventName] = useState('');
  // const [eventCity, setEventCity] = useState('');
  // const [eventState, setEventState] = useState('');
  // const [eventGenInfo, setEventGenInfo] = useState('');
  // const [eventStartDate, setEventStartDate] = useState('');
  // const [eventEndDate, setEventEndDate] = useState('');
  // const [eventWeighInInfo, setEventWeighInInfo] = useState('');
  // const [earlyEntryDeadline, setEarlyEntryDeadline] = useState('');
  // const [entryDeadline, setEntryDeadline] = useState('');
  // const [eventStartTime, setEventStartTime] = useState('');
  // const [eventWaiver, setEventWaiver] = useState('');
  // const [earlyFirstEntryFee, setEarlyFirstEntryFee] = useState('');
  // const [earlyAddEntryFee, setEarlyAddEntryFee] = useState('');
  // const [lateFirstEntryFee, setLateFirstEntryFee] = useState('');
  // const [lateAddEntryFee, setLateAddEntryFee] = useState('');
  // const [judoDivJNov, setJudoDivJNov] = useState('');
  // const [judoDivJAdv, setJudoDivJAdv] = useState('');
  // const [judoDivSNov, setJudoDivSNov] = useState('');
  // const [judoDivSAdv, setJudoDivSAdv] = useState('');
  // const [judoDivSOpen, setJudoDivSOpen] = useState('');
  // const [judoDivMNov, setJudoDivMNov] = useState('');
  // const [judoDivMAdv, setJudoDivMAdv] = useState('');
  // const [judoDivVI, setJudoDivVI] = useState('');
  // const [judoDivKata, setJudoDivKata] = useState('');
  //const [logo, setLogo] = useState(null);
  const [logoUpload, setLogoUpload] = useState(null);

  // const { data, loading } = useQuery(GET_EVENT_BY_ID, {
  //   variables: { id: id },
  // });

  // useEffect(() => {
  //   //   console.log(logo);
  //   const eventData = data?.eventById || {};
  //   if (eventData) {
  //     setEventStyle(eventData.eventStyle);
  //   }
  // }, [setEventStyle, data]);

  // set up mutations
  const [updateEvent, { error }] = useMutation(UPDATE_EVENT);
  const navigate = useNavigate();

  const uploadLogo = async (e) => {
    e.preventDefault();
    if (logoUpload === null) return;
    const logoName = `${logoUpload.name}${v4()}`;
    const logoRef = ref(storage, `/logos/events/${logoName}`);

    uploadBytes(logoRef, logoUpload);

    const logo = `https://firebasestorage.googleapis.com/v0/b/${logoRef.bucket}/o/logos%2Fevents%2F${logoName}?alt=media`;
    console.log(logo);
    // console.log(
    //   `https://firebasestorage.googleapis.com/v0/b/${logoRef.bucket}/o/${logoRef.fullPath}?alt=media`
    // );

    try {
      const { data } = await updateEvent({
        variables: {
          id,
          logo,
        },
      });
      console.log('DATA!!!!!!! ', data);
      navigate(`/events/createEvent/athleteInfo?eID=${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='mt-4'>
      <h1>Create Event</h1>
      <FormContainer>
        <EventSteps step1 step2 step3 step4 />
        <h4>Logo</h4>
        <Form onSubmit={uploadLogo} style={{ border: 'solid black 1px' }}>
          <Row>
            <Form.Group className='mb-3'>
              <Col>
                <Row>
                  <Col sm={12} md={2} className='text-center'>
                    <Form.Label className='form-label'>
                      Select Logo <span className='text-danger'>*</span>
                    </Form.Label>
                  </Col>
                  <Col sm={12} md={8}>
                    <input
                      type='file'
                      onChange={(e) => {
                        setLogoUpload(e.target.files[0]);
                      }}
                    />
                  </Col>
                </Row>
              </Col>
            </Form.Group>
          </Row>

          <Button type='submit'>Upload Logo</Button>
        </Form>
      </FormContainer>
    </div>
  );
};

export default Logo;
