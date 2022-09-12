const { User, Club, Event } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select(
          '-__v -password'
        );
        return userData;
      }
      throw new AuthenticationError('Not logged in');
    },
    clubs: async () => {
      const clubs = await Club.find({});
      return clubs;
    },
    club: async (parent, { slug }) => {
      //console.log(slug);
      let club = await Club.findOne({ slug: slug });
      return club;
    },
    lastClub: async () => {
      let club = await Club.find().limit(1).sort({ $natural: -1 });
      return club;
    },
    events: async () => {
      let events = await Event.find({});
      return events;
    },
    event: async (parent, { slug }) => {
      let event = await Event.findOne({ slug: slug });
      return event;
    },
    eventById: async (parent, { _id }) => {
      let event = await Event.findById(_id);
      return event;
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      console.log(email, password);
      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const correctPw = await user.isCorrectPassword(password);
      console.log(correctPw);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },
    deleteUser: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findByIdAndDelete({ _id: _id });
      }
    },
    joinClub: async (parent, { clubId }, context) => {
      if (context.user) {
        try {
          const user = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $push: { clubsJoinedIds: clubId } }
          );
          const club = await Club.findOneAndUpdate(
            { _id: clubId },
            { $push: { clubMemberIds: context.user._id } }
          );
          return user;
          return club;
        } catch (error) {
          return error;
        }
      }
    },
    leaveClub: async (parent, { clubId }, context) => {
      if (context.user) {
        try {
          const user = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { clubsJoinedIds: clubId } },
            { new: true }
          );
          return user;
        } catch (error) {
          return error;
        }
      }
    },
    addClub: async (parent, args, context) => {
      if (context.user) {
        const club = await Club.create(args);
        const newClub = await Club.findOneAndUpdate(
          { slug: club.slug },
          { $push: { clubAdmins: context.user._id } }
        );
        return newClub;
      }
    },
    updateClub: async (
      parent,
      {
        clubName,
        address,
        address2,
        city,
        state,
        country,
        postalCode,
        phone,
        club_email,
        website,
        homeInfo,
        classSchedule,
        about,
        headInstructor,
        slug,
      }
    ) => {
      try {
        const club = await Club.findOneAndUpdate(
          { slug },
          {
            clubName,
            address,
            address2,
            city,
            state,
            country,
            postalCode,
            phone,
            club_email,
            website,
            homeInfo,
            classSchedule,
            about,
            headInstructor,
            logo,
          }
        );
        const updatedClub = await Club.findOneAndUpdate({ slug });

        return updatedClub;
      } catch (error) {
        return error;
      }
    },
    deleteClub: async (parent, { slug }) => {
      await Club.findOneAndDelete({ slug: slug });
    },
    addEvent: async (parent, args, context) => {
      //if (context.user) {
      console.log(args);
      const event = await Event.create(args);
      // const newEvent = await Club.findOneAndUpdate(
      //   { slug: Event.slug },
      //   { $push: { clubAdmins: context.user._id } }
      // );
      return event;
      //}
    },
    updateClub: async (
      parent,
      {
        clubName,
        address,
        address2,
        city,
        state,
        country,
        postalCode,
        phone,
        club_email,
        website,
        homeInfo,
        classSchedule,
        about,
        headInstructor,
        slug,
      }
    ) => {
      try {
        const club = await Club.findOneAndUpdate(
          { slug },
          {
            clubName,
            address,
            address2,
            city,
            state,
            country,
            postalCode,
            phone,
            club_email,
            website,
            homeInfo,
            classSchedule,
            about,
            headInstructor,
            logo,
          }
        );
        const updatedClub = await Club.findOneAndUpdate({ slug });

        return updatedClub;
      } catch (error) {
        return error;
      }
    },
    updateEvent: async (
      parent,
      {
        style,
        eventType,
        eventName,
        shortDesc,
        longDesc,
        waiver,
        customBasicFields,
        earlyFirstEntry,
        lateFirstEntry,
        // earlyAddEntry,
        // lateAddEntry,
        // earlyEntryDeadline,
        // entryDeadline,
        // eventStartDate,
        // eventEndDate,
        // weighInStartTime,
        // weighInEndTime,
        // customLogisticsFields,
      }
    ) => {
      try {
        const event = Event.findOneAndUpdate(
          { _id },
          {
            style,
            eventType,
            eventName,
            shortDesc,
            longDesc,
            waiver,
            customBasicFields,
            earlyFirstEntry,
            lateFirstEntry,
            // earlyAddEntry,
            // lateAddEntry,
            // earlyEntryDeadline,
            // entryDeadline,
            // eventStartDate,
            // eventEndDate,
            // weighInStartTime,
            // weighInEndTime,
            // customLogisticsFields,
          }
        );
        const updatedEvent = await Event.findOneAndUpdate({ _id });

        return updatedEvent;
      } catch (error) {}
    },
  },
  User: {
    clubsJoined: async (root) => {
      return await Club.find({ _id: { $in: root.clubsJoinedIds } });
    },
  },
  Club: {
    clubMembers: async (root) => {
      return await User.find({ _id: { $in: root.clubMemberIds } });
    },
    clubAdmins: async (root) => {
      return await User.find({ _id: { $in: root.clubAdmins } });
    },
  },
  Event: {
    eventCreator: async (root) => {
      return await Club.find({ _id: { $in: root.createdBy } });
    },
  },
};

module.exports = resolvers;
