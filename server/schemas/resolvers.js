const { AuthenticationError } = require('apollo-server-express');
const { User, Game } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
      users: async () => {
          return await User.find({}).populate('gameLists');
      },
      user: async (parent, { username }) => {
        return await User.findOne({ username }).populate('gameLists');
      },
      games: async () => {
        return await Game.find({});
      },
      game: async (parent, { game }) => {
        return await Game.find({ game });
      },
      gameLists: async (parent, { username }) => {
        const params = username ? { username } : {};
        return GameList.find(params).sort({ createdAt: -1 })
      },
      gameList: async (parent, { listId }) => {
        return Thought.findOne({ _id: listId })
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
    addGame: async () => {},
    addGameList: async () => {},  
    removeGame: async () => {},
    removeGameList: async () => {},
  }
};

module.exports = resolvers;
