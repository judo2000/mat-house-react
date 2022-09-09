import { gql } from '@apollo/client';

// mutation to register a user
export const ADD_USER = gql`
  mutation AddUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
        firstName
        lastName
        email
        isAdmin
      }
    }
  }
`;

// mutation for creating a club
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        firstName
      }
    }
  }
`;

// mutation to create a club
export const CREATE_CLUB = gql`
  mutation AddClub(
    $clubName: String!
    $address: String!
    $address2: String
    $city: String!
    $state: String!
    $country: String!
    $postalCode: String!
    $phone: String
    $clubEmail: String
    $website: String
    $homeInfo: String
    $classSchedule: String
    $about: String
    $headInstructor: String
  ) {
    addClub(
      clubName: $clubName
      address: $address
      address2: $address2
      city: $city
      state: $state
      country: $country
      postalCode: $postalCode
      phone: $phone
      clubEmail: $clubEmail
      website: $website
      homeInfo: $homeInfo
      classSchedule: $classSchedule
      about: $about
      headInstructor: $headInstructor
    ) {
      _id
      clubName
      address
      address2
      city
      state
      country
      postalCode
      phone
      clubEmail
      website
      homeInfo
      classSchedule
      about
      headInstructor
      slug
    }
  }
`;

// mutation for updating a club
export const UPDATE_CLUB = gql`
  mutation updateClub(
    $clubName: String!
    $address: String!
    $address2: String
    $city: String!
    $state: String!
    $country: String!
    $postalCode: String!
    $phone: String
    $clubEmail: String
    $website: String
    $homeInfo: String
    $classSchedule: String
    $about: String
    $headInstructor: String!
    $logo: String!
    $slug: String
  ) {
    updateClub(
      clubName: $clubName
      address: $address
      address2: $address2
      city: $city
      state: $state
      country: $country
      postalCode: $postalCode
      phone: $phone
      clubEmail: $clubEmail
      website: $website
      homeInfo: $homeInfo
      classSchedule: $classSchedule
      about: $about
      headInstructor: $headInstructor
      logo: $logo
      slug: $slug
    ) {
      _id
      clubName
      address
      address2
      city
      state
      country
      postalCode
      phone
      clubEmail
      website
      homeInfo
      classSchedule
      about
      headInstructor
    }
  }
`;

export const JOIN_CLUB = gql`
  mutation JoinClub($clubId: String!) {
    joinClub(clubId: $clubId) {
      _id
      firstName
      lastName
      email
    }
  }
`;

export const CREATE_EVENT = gql`
  mutation AddEvent(
    $style: String!
    $eventType: String!
    $eventName: String!
    $createdBy: String!
  ) {
    addEvent(
      style: $style
      eventType: $eventType
      eventName: $eventName
      createdBy: $createdBy
    ) {
      _id
      style
      eventType
      eventName
    }
  }
`;
