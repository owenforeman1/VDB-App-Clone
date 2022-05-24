const { AuthenticationError } = require('apollo-server-express');
const { User, Game } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
      users: async () => {
          return await User.find({}).populate('games');
      },
      user: async (parent, { username }) => {
        return await User.findOne({ username }).populate('games');
      },
      games: async () => {
        return await Game.find({});
      },
      game: async (parent, { game }) => {
        return await Game.find({ game });
      },
  },

  Mutation: {
    addUser: async (parent, { username, password }) => {
        const user = await User.create({ username, password });
        const token = signToken(user);
        return { token, user };
      },
    login: async (parent, { username, password }) => {
        const user = await User.findOne({ username });
  
        if (!user) {
          throw new AuthenticationError('No user found with this username');
        }
  
        const correctPw = await user.isCorrectPassword(password);
  
        if (!correctPw) {
          throw new AuthenticationError('Incorrect credentials');
        }
  
        const token = signToken(user);
  
        return { token, user };
      },  
  }
};

module.exports = resolvers;
