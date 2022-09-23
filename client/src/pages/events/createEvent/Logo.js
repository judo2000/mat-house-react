import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { storage } from '../../../firebase';
import { ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { GET_EVENT_BY_ID } from '../../../utils/queries';
import { UPDATE_EVENT } from '../../../utils/mutations';

const Logo = () => {
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
  const [judoDivJAdv, setJudoDivJAdv] = useState('');
  const [judoDivSNov, setJudoDivSNov] = useState('');
  const [judoDivSAdv, setJudoDivSAdv] = useState('');
  const [judoDivSOpen, setJudoDivSOpen] = useState('');
  const [judoDivMNov, setJudoDivMNov] = useState('');
  const [judoDivMAdv, setJudoDivMAdv] = useState('');
  const [judoDivVI, setJudoDivVI] = useState('');
  const [judoDivKata, setJudoDivKata] = useState('');
  const [logo, setLogo] = useState(null);
  const [logoUpload, setLogoUpload] = useState(null);

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
      setJudoDivJNov(eventData.judoDivJNov);
      setJudoDivJAdv(eventData.judoDivJAdv);
      setJudoDivSNov(eventData.judoDivSNov);
      setJudoDivSAdv(eventData.judoDivSAdv);
      setJudoDivSOpen(eventData.judoDivSOpen);
      setJudoDivMNov(eventData.judoDivMNov);
      setJudoDivMAdv(eventData.judoDivMAdv);
      setJudoDivVI(eventData.judoDivVI);
      setJudoDivKata(eventData.judoDivKata);
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
    setJudoDivJNov,
    setJudoDivJAdv,
    setJudoDivSNov,
    setJudoDivSAdv,
    setJudoDivSOpen,
    setJudoDivMNov,
    setJudoDivMAdv,
    setJudoDivVI,
    setJudoDivKata,
    data,
  ]);

  // set up mutations
  const [updateEvent, { error }] = useMutation(UPDATE_EVENT);
  const navigate = useNavigate();

  const uploadLogo = async () => {
    console.log(logoUpload.name);
    if (logoUpload === null) return;
    const logoName = `${logoUpload.name}${v4()}`;
    console.log(logoName);
    const logoRef = ref(storage, `/logos/events/${logoName}`);

    uploadBytes(logoRef, logoUpload);

    setLogo(
      `https://firebasestorage.googleapis.com/v0/b/${logoRef.bucket}/o/logos%2Fevents%2F${logoName}?alt=media`
    );
    console.log(
      `https://firebasestorage.googleapis.com/v0/b/${logoRef.bucket}/o/${logoRef.fullPath}?alt=media`
    );
    console.log(logoRef);

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
          judoDivJAdv,
          judoDivSNov,
          judoDivSAdv,
          judoDivSOpen,
          judoDivMNov,
          judoDivMAdv,
          judoDivVI,
          judoDivKata,
          logo,
        },
      });
      console.log('DATA!!!!!!! ', data);
      //navigate(`/events/createEvent/divisions?eID=${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <input type='file' onChange={(e) => setLogoUpload(e.target.files[0])} />
      <button onClick={uploadLogo}>Submit</button>
    </>
  );
};

export default Logo;
