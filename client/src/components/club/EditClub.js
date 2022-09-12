import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { GET_CLUB } from '../../utils/queries';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { UPDATE_CLUB } from '../../utils/mutations';
import Loader from '../Loader';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const EditClub = () => {
  const { slug } = useParams();

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
  const [logo, setLogo] = useState('');

  const { data, loading } = useQuery(GET_CLUB, {
    variables: { slug: slug },
  });

  useEffect(() => {
    const clubData = data?.club || {};
    setClubName(clubData.clubName);
    setAddress(clubData.address);
    setAddress2(clubData.address2);
    setCity(clubData.city);
    setState(clubData.state);
    setCountry(clubData.country);
    setPostalCode(clubData.postalCode);
    setPhone(clubData.phone);
    setClub_email(clubData.clubEmail);
    setWebsite(clubData.website);
    setHomeInfo(clubData.homeInfo);
    setClassSchedule(clubData.classSchedule);
    setAbout(clubData.about);
    setHeadInstructor(clubData.headInstructor);
    setLogo(clubData.logo);
  }, [
    setClubName,
    setAddress,
    setAddress2,
    setCity,
    setState,
    setCountry,
    setPostalCode,
    setPhone,
    setClub_email,
    setWebsite,
    setHomeInfo,
    setClassSchedule,
    setAbout,
    setHeadInstructor,
    setLogo,
    data,
  ]);

  // set up mutation
  const [updateClub, { error }] = useMutation(UPDATE_CLUB);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await updateClub({
        variables: {
          slug,
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
          logo,
        },
      });

      navigate(``);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Edit Club Info</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className='mb-3'>
          <Form.Label>Club Name</Form.Label>
          <Form.Control
            type='text'
            id='clubName'
            value={clubName}
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

        <Form.Group>
          <Form.Label>Upload logo</Form.Label>
          <Form.Control
            type='file'
            onChange={(e) => setLogo(e.target.value)}
            placeholder='Head Instructor(s)'
          />
        </Form.Group>
        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default EditClub;
