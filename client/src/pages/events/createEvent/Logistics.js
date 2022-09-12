import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { GET_EVENT_BY_ID } from '../../../utils/queries';
import { ReactQuill } from 'react-quill';
import { UPDATE_EVENT } from '../../../utils/mutations';
import { Loader } from '../../../components/Loader';
import { Button } from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap/Form';

const Logistics = () => {
  const search = useLocation().search;
  let id = new URLSearchParams(search).get('eID');

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

  useEffect(() => {
    const eventData = data?.event || {};
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

  return <div>Logistics</div>;
};

export default Logistics;
