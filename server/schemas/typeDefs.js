const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    firstName: String
    lastName: String
    email: String
    isAdmin: Boolean
    clubsJoinedIds: [ID]
    clubsJoined: [Club]
  }

  type Club {
    _id: ID
    clubName: String
    address: String
    address2: String
    city: String
    state: String
    country: String
    postalCode: String
    phone: String
    clubEmail: String
    website: String
    homeInfo: String
    classSchedule: String
    about: String
    headInstructor: String
    slug: String
    clubMemberIds: [ID]
    clubMembers: [User]
    clubAdmins: [User]
    logo: String
  }

  type Event {
    _id: ID
    eventStyle: String
    eventType: String
    eventName: String
    eventCity: String
    eventState: String
    eventGenInfo: String
    eventWeighInInfo: String
    eventStartDate: String
    eventEndDate: String
    eventStartTime: String
    earlyEntryDeadline: String
    earlyFirstEntryFee: Float
    earlyAddEntryFee: Float
    lateFirstEntryFee: Float
    lateAddEntryFee: Float
    entryDeadline: String
    eventWaiver: String
    createdBy: String
    slug: String
  }

  type Auth {
    token: String
    user: User
  }

  type Query {
    me: User
    user(_id: String!): User
    users: [User!]!
    clubs: [Club!]!
    club(slug: String!): Club
    lastClub: [Club!]!
    events: [Event!]!
    eventById(_id: String!): Event
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): Auth
    joinClub(clubId: String!): User
    leaveClub(clubId: String!): User
    deleteUser(_id: String!): User
    addClub(
      clubName: String!
      address: String!
      address2: String
      city: String!
      state: String!
      country: String!
      postalCode: String!
      phone: String
      clubEmail: String
      website: String
      homeInfo: String
      classSchedule: String
      about: String
      headInstructor: String
      clubAdmins: [String]
    ): Club
    updateClub(
      clubName: String!
      address: String!
      address2: String
      city: String!
      state: String!
      country: String!
      postalCode: String!
      phone: String
      clubEmail: String
      website: String
      homeInfo: String
      classSchedule: String
      about: String
      headInstructor: String
      clubAdmins: [String]
      slug: String
    ): Club
    deleteClub(slug: String!): Club
    addEvent(
      eventStyle: String!
      eventType: String!
      eventName: String!
      eventCity: String!
      eventState: String!
      eventGenInfo: String
      createdBy: String
    ): Event
    updateEvent(
      _id: String
      eventStyle: String!
      eventType: String!
      eventName: String!
      eventCity: String!
      eventState: String!
      eventGenInfo: String
      eventStartDate: String
      eventEndDate: String
      eventWeighInInfo: String
      earlyEntryDeadline: String
      entryDeadline: String
      earlyFirstEntryFee: Float
      earlyAddEntryFee: Float
      lateFirstEntryFee: Float
      lateAddEntryFee: Float
      eventStartTime: String
      eventWaiver: String
    ): Event
  }
`;

module.exports = typeDefs;
