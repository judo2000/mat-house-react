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
    style: String
    eventType: String
    eventName: String
    slug: String
    createdBy: [Club]
    eventCreator: [Club]
    customFields: [String]
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
    event(slug: String!): Event
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
      style: String!
      eventType: String!
      eventName: String!
      createdBy: String!
      customFields: [String]
    ): Event
  }
`;

module.exports = typeDefs;
