import { gql } from '@apollo/client';

export const GET_ME = gql`
  {
    me {
      firstName
      lastName
      email
      isAdmin
      clubsJoined {
        _id
      }
    }
  }
`;

export const GET_CLUBS = gql`
  {
    clubs {
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
      classSchedule
      about
      headInstructor
      slug
      clubMemberIds
    }
  }
`;

export const GET_LAST_CLUB = gql`
  query LastClub {
    lastClub {
      slug
    }
  }
`;
export const GET_CLUB = gql`
  query Club($slug: String!) {
    club(slug: $slug) {
      _id
      clubName
      address
      address2
      city
      state
      country
      postalCode
      clubEmail
      headInstructor
      homeInfo
      classSchedule
      slug
      clubMembers {
        _id
        firstName
        lastName
      }
      clubAdmins {
        _id
        firstName
        lastName
      }
    }
  }
`;

export const GET_EVENTS = gql`
  {
    events {
      _id
      eventStyle
      eventType
      eventName
      eventCity
      eventState
      eventGenInfo
      slug
    }
  }
`;

export const GET_EVENT = gql`
  query Event($slug: String!) {
    event(slug: $slug) {
      _id
      eventStyle
      eventType
      eventName
      eventCity
      eventState
      eventGenInfo
      slug
    }
  }
`;

export const GET_EVENT_BY_ID = gql`
  query EventById($id: String!) {
    eventById(_id: $id) {
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
      slug
    }
  }
`;
