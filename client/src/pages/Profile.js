import React, { useState } from 'react';
import jwt from 'jwt-decode';
import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Loader from '../components/Loader';

const Profile = () => {
  const token = Auth.loggedIn() ? Auth.getToken() : null;
  console.log(token);
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate('/');
    }
  }, [navigate, token]);
  // checks for user if logged in
  if (token) {
    const user = jwt(token);
  }
  const { loading, data } = useQuery(GET_ME);
  const me = data?.me || {};

  return token ? loading ? <Loader /> : <h1>{me.firstName}</h1> : <></>;
};

export default Profile;
