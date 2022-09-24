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
  const id = new URLSearchParams(search).get('eId');

  const [eventStyle, setEventStyle] = useState('');
  const [logoUpload, setLogoUpload] = useState(null);

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
      navigate(`/events/createEvent/athleteInfo?eId=${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='mt-4'>
      <h1>Create Event</h1>
      <FormContainer>
        <EventSteps step1 step2 step3 step4 id={id} />
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
