import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import { useNavigate } from 'react-router-dom';
import { CREATE_CLUB } from '../utils/mutations';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Auth from '../utils/auth';
import Loader from '../components/Loader';
import Message from '../components/Message';

const CreateClub = ({ modal, handleShow }) => {
  const token = Auth.loggedIn() ? Auth.getToken() : null;

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

  // if (token) {
  //   const user = jwt(token);
  // }

  const [clubName, setClubName] = useState('');
  const [address, setAddress] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [phone, setPhone] = useState('');
  const [clubEmail, setClub_email] = useState('');
  const [website, setWebsite] = useState('');
  const [homeInfo, setHomeInfo] = useState('');
  const [classSchedule, setClassSchedule] = useState('');
  const [about, setAbout] = useState('');
  const [headInstructor, setHeadInstructor] = useState('');

  const [loading, addClub, { error }] = useMutation(CREATE_CLUB);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await addClub({
        variables: {
          clubName,
          address,
          address2,
          city,
          state,
          country,
          postalCode,
          phone,
          clubEmail,
          website,
          homeInfo,
          classSchedule,
          about,
          headInstructor,
        },
      });
      window.location.href = '/clubs';
      return data;
    } catch (error) {
      setErrorMessage(error.message);
      if (error.message.includes('Slug is missing')) {
        toast('Club name is required');
      } else if (error.message.includes('clubName_1 dup key')) {
        toast('That club name is taken, please choose another name');
      } else if (error.message.includes('`address` is required')) {
        toast('Address is required');
      } else if (error.message.includes('Please fill a valid email address')) {
        toast('Please enter a valid email address');
      } else if (error.message.includes('clubEmail_1 dup key')) {
        toast(
          'That club email is already taken, please enter another email address.'
        );
      }
      console.log(error.message);
    }
  };
  return (
    <Container className='mt-4'>
      {loading && <Loader />}
      {error && <Message variant='danger'>{error}</Message>}
      {token ? (
        <Row>
          <Col sm={12} md={10}>
            {errorMessage ? (
              <h3>
                <ToastContainer />
              </h3>
            ) : (
              ''
            )}
            <Card>
              <h3>Add your club</h3>
              <p>
                Please use this form to register your club and yourself as the
                coach.
              </p>
              <p>
                When you add the club you will be entered as the default
                administrator for the club. You will be able to update club
                informaiton, add/remove instructors, and approve membership
                requests. You will also be able to assign other members to help
                you administer the club. If you add another admin you can assign
                someone else as the primary administrator and remove yourself if
                necessary.
              </p>
              <div>
                <span className='text-danger'>*</span> indicates required
                fields.
              </div>
              <Form onSubmit={handleSubmit}>
                <Form.Group className='mb-3'>
                  <Form.Label>Club Name</Form.Label>
                  <Form.Control
                    type='text'
                    id='clubName'
                    onChange={(e) => setClubName(e.target.value)}
                    placeholder='Enter Club name'
                  />
                </Form.Group>

                <Form.Group className='mb-3'>
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type='text'
                    id='address'
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder='Address'
                  />
                </Form.Group>

                <Form.Group className='mb-3'>
                  <Form.Label>Address 2</Form.Label>
                  <Form.Control
                    type='text'
                    id='address2'
                    value={address2}
                    onChange={(e) => setAddress2(e.target.value)}
                    placeholder='Address'
                  />
                </Form.Group>

                <Form.Group className='mb-3'>
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type='text'
                    id='city'
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder='City'
                  />
                </Form.Group>

                <Form.Group className='mb-3'>
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    type='text'
                    id='state'
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder='State'
                  />
                </Form.Group>

                <Form.Group className='mb-3'>
                  <Form.Label>Postal Code</Form.Label>
                  <Form.Control
                    type='text'
                    id='postalCode'
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder='Postal Code'
                  />
                </Form.Group>

                <Form.Group className='mb-3'>
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    type='text'
                    id='country'
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder='country'
                  />
                </Form.Group>

                <Form.Group className='mb-3'>
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type='text'
                    id='phone'
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder='Phone'
                  />
                </Form.Group>

                <Form.Group className='mb-3'>
                  <Form.Label>Club Email</Form.Label>
                  <Form.Control
                    type='text'
                    id='clubEmail'
                    value={clubEmail}
                    onChange={(e) => setClub_email(e.target.value)}
                    placeholder='Club Email'
                  />
                </Form.Group>

                <Form.Group className='mb-3'>
                  <Form.Label>Website</Form.Label>
                  <Form.Control
                    type='text'
                    id='website'
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder='Website'
                  />
                </Form.Group>

                <Form.Group className='mb-3'>
                  <Form.Label>Head Instructor(s)</Form.Label>
                  <Form.Control
                    type='text'
                    id='headInstructor'
                    value={headInstructor}
                    onChange={(e) => setHeadInstructor(e.target.value)}
                    placeholder='Head Instructor(s)'
                  />
                </Form.Group>

                <Form.Group className='mb-3'>
                  <Form.Label>Home Info</Form.Label>
                  <ReactQuill
                    value={homeInfo ? homeInfo : ''}
                    // onChange={(e) => setContent(e.target.value)}
                    onChange={setHomeInfo}
                    theme='snow'
                  ></ReactQuill>
                </Form.Group>

                <Form.Group className='mb-3'>
                  <Form.Label>Class Schedule</Form.Label>
                  <ReactQuill
                    value={classSchedule ? classSchedule : ''}
                    // onChange={(e) => setContent(e.target.value)}
                    onChange={setClassSchedule}
                    theme='snow'
                  ></ReactQuill>
                </Form.Group>

                <Form.Group className='mb-3'>
                  <Form.Label>About Us</Form.Label>
                  <ReactQuill
                    value={about ? about : ''}
                    // onChange={(e) => setContent(e.target.value)}
                    onChange={setAbout}
                    theme='snow'
                  ></ReactQuill>
                </Form.Group>

                <Button variant='primary' type='submit'>
                  Submit
                </Button>
              </Form>
            </Card>
          </Col>
        </Row>
      ) : (
        <>
          <h2 className='text-center'>
            You must be logged in to create a club
          </h2>
          <p>Please click on Login/SignUp link at the top of this page.</p>
        </>
      )}
    </Container>
  );
};

export default CreateClub;
