const { AuthenticationError } = require('apollo-server-express');
const { User, Game, GameList } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
      users: async () => {
          return await User.find({}).populate('gameLists');
      },
      user: async (parent, { userId }) => {
        return await User.findOne({ userId }).populate('gameLists');
      },
      games: async () => {
        return await Game.find({});
      },
      game: async (parent, { gameId }) => {
        return await Game.findOne({ gameId });
      },
      gameLists: async (parent, { userId }) => {
        const params = userId ? { userId } : {};
        return GameList.find(params).sort({ createdAt: -1 }).populate('games') 
      },
      gameList: async (parent, { listId }) => {
        return GameList.findOne({ _id: listId }).populate('games')
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
    addGame: async (parent, { listId, slug, name, released, image, rating, platforms, metacritic }) => {
      const newGame = await Game.create({ slug, name, released, image, rating, platforms, metacritic})

      return GameList.findOneAndUpdate(
        { _id: listId },
        { $addToSet: { games: { _id: newGame._id } } },
        { new: true }
        // Future Todo: Add if/else to search for games if they already exist
      );
    },
    addGameList: async (parent, { listName }, context) => {
      
      if (context.user) {
        const list = await GameList.create({ listName })
        await User.findOneAndUpdate(
          {_id: context.user._id}
          { $addToSet: { lists: list._id } }
        );

        return list;
      };

      throw new AuthenticationError('You need to be logged in!');
    },  
    removeGame: async (parent, { listId, gameId }) => {
      return GameList.findOneAndUpdate(
        { _id: listId },
        { $pull: { games: { _id: gameId } } },
        { new: true }
      );
    },
    removeGameList: async (parent, { listId }) => {
      return GameList.findOneAndDelete({ _id: listId });
    },
  }
};

module.exports = resolvers;
