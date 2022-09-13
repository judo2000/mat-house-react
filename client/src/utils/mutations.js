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
    $shortDesc: String
    $longDesc: String
    $waiver: String
    $customBasicFields: [String]
    $earlyEntryDeadline: String!
    $createdBy: String!
  ) {
    addEvent(
      style: $style
      eventType: $eventType
      eventName: $eventName
      shortDesc: $shortDesc
      longDesc: $longDesc
      waiver: $waiver
      earlyEntryDeadline: $earlyEntryDeadline
      customBasicFields: $customBasicFields
      createdBy: $createdBy
    ) {
      _id
      style
      eventType
      eventName
      shortDesc
      longDesc
      earlyEntryDeadline
      waiver
      customBasicFields
    }
  }
`;

// mutation for updating an event
export const UPDATE_EVENT = gql`
  mutation updateEvent(
    # $style: String
    # $eventType: String
    # $eventName: String
    # $shortDesc: String
    # $longDesc: String
    # $waiver: String
    $earlyEntryDeadline: String!
    $entryDeadline: String!
  ) # $customBasicFields: [String]
  # $earlyFirstEntry: Number
  # $lateFirstEntry: Number
  # $earlyAddEntry: Number!
  # $lateAddEntry: Number!
  # $eventStartDate: String!
  # $eventEndDate: String
  # $weighInStartTime: String
  # $weighInEndTime: String
  # $customLogisticsFields: [String]
  {
    updateEvent(
      # style: $style
      # eventType: $eventType
      # eventName: $eventName
      # shortDesc: $shortDesc
      # longDesc: $longDesc
      # waiver: $waiver
      # customBasicFields: $customBasicFields
      # createdBy: $createdBy
      # earlyFirstEntry: $earlyFirstEntry
      # lateFirstEntry: $lateFirstEntry
      # earlyAddEntry: $earlyAddEntry
      # lateAddEntry: $lateAddEntry
      earlyEntryDeadlin: $earlyEntryDeadline
      entryDeadline: $entryDeadline # eventStartDate: $eventStartDate # eventEndDate: $eventEndDate # weighInStartTime: $weighInStartTime # weighInEndTime: $weighInEndTime # customLogisticsFields: $customLogisticsFields
    ) {
      _id
      style
      eventType
      eventName
      shortDesc
      longDesc
      waiver
      customBasicFields
      createdBy {
        _id
        clubName
      }
      # earlyFirstEntry
      # lateFirstEntry
      # earlyAddEntry
      # lateAddEntry
      earlyEntryDeadlin
      entryDeadline
      # eventStartDate
      # eventEndDate
      # weighInStartTime
      # weighInEndTime
      # customLogisticsFields
    }
  }
`;
