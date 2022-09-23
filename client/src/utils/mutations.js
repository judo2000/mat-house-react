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
    $eventStyle: String!
    $eventType: String!
    $eventName: String!
    $eventCity: String!
    $eventState: String!
    $eventGenInfo: String
    $createdBy: String!
  ) {
    addEvent(
      eventStyle: $eventStyle
      eventType: $eventType
      eventName: $eventName
      eventCity: $eventCity
      eventState: $eventState
      eventGenInfo: $eventGenInfo
      createdBy: $createdBy
    ) {
      _id
      eventStyle
      eventType
      eventName
      eventCity
      eventState
      eventGenInfo
      createdBy
    }
  }
`;

// mutation for updating an event
export const UPDATE_EVENT = gql`
  mutation UpdateEvent(
    $id: String!
    $eventStyle: String!
    $eventType: String!
    $eventName: String!
    $eventCity: String!
    $eventState: String!
    $eventGenInfo: String
    $eventStartDate: String
    $eventEndDate: String
    $eventWeighInInfo: String
    $earlyEntryDeadline: String
    $entryDeadline: String
    $earlyFirstEntryFee: Float
    $earlyAddEntryFee: Float
    $lateFirstEntryFee: Float
    $lateAddEntryFee: Float
    $eventStartTime: String
    $eventWaiver: String
    $judoDivJNov: Boolean
    $judoDivJAdv: Boolean
    $judoDivSNov: Boolean
    $judoDivSAdv: Boolean
    $judoDivSOpen: Boolean
    $judoDivMNov: Boolean
    $judoDivMAdv: Boolean
    $judoDivVI: Boolean
    $judoDivKata: Boolean
    $logo: String
  ) {
    updateEvent(
      _id: $id
      eventStyle: $eventStyle
      eventType: $eventType
      eventName: $eventName
      eventCity: $eventCity
      eventState: $eventState
      eventEndDate: $eventEndDate
      eventStartDate: $eventStartDate
      eventGenInfo: $eventGenInfo
      eventWeighInInfo: $eventWeighInInfo
      earlyEntryDeadline: $earlyEntryDeadline
      entryDeadline: $entryDeadline
      earlyFirstEntryFee: $earlyFirstEntryFee
      earlyAddEntryFee: $earlyAddEntryFee
      lateFirstEntryFee: $lateFirstEntryFee
      lateAddEntryFee: $lateAddEntryFee
      eventStartTime: $eventStartTime
      eventWaiver: $eventWaiver
      judoDivJNov: $judoDivJNov
      judoDivJAdv: $judoDivJAdv
      judoDivSNov: $judoDivSNov
      judoDivSAdv: $judoDivSAdv
      judoDivSOpen: $judoDivSOpen
      judoDivMNov: $judoDivMNov
      judoDivMAdv: $judoDivMAdv
      judoDivVI: $judoDivVI
      judoDivKata: $judoDivKata
      logo: $logo
    ) {
      _id
      eventStyle
      eventType
      eventName
      eventCity
      eventState
      eventGenInfo
      eventStartDate
      eventEndDate
      eventWeighInInfo
      earlyEntryDeadline
      entryDeadline
      earlyFirstEntryFee
      earlyAddEntryFee
      lateFirstEntryFee
      lateAddEntryFee
      eventStartTime
      eventWaiver
      judoDivJNov
      judoDivJAdv
      judoDivSNov
      judoDivSAdv
      judoDivSOpen
      judoDivMNov
      judoDivMAdv
      judoDivVI
      judoDivKata
      logo
    }
  }
`;
