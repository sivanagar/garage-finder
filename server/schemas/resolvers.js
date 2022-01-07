const { User, Listing } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .populate('listings')
          .select('-__v -password');

        return userData;
      }

      throw new AuthenticationError('Not logged in');
    },
    users: async () => {
      return User.find().select('-__v -password');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .populate('listings')
        .select('-__v -password');
    },
    listing: async (parent, { _id }) => {
      return Listing.findOne({ _id });
    },
    listings: async (
      parent,
      { type, rate, accessType, climateControl, height, width, depth, location }
    ) => {
      const params = {};
      type ? (params.type = type) : null;
      rate ? (params.rate = rate) : null;
      climateControl == null ? null : (params.climateControl = climateControl);
      accessType ? (params.accessType = accessType) : null;
      height ? (params.height = height) : null;
      width ? (params.width = width) : null;
      depth ? (params.depth = depth) : null;
      location ? (params.location = location) : null;
      return Listing.find(params).sort({ createdAt: -1 });
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

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },
    addListing: async (parent, args, context) => {
      if (context.user) {
        const listing = await Listing.create({
          ...args,
          username: context.user.username,
        });
        const user = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { listings: listing._id } },
          { new: true }
        );

        return listing;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
