const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        password: String
        gameLists: [GameList]
    }

    type Game {
        _id: ID
        slug: String
        name: String
        released: String
        image: String
        rating: String
        platforms: String
        metacritic: Int
    }

    type GameList {
        _id: ID
        createdAt: String
        listName: String
        games: [Game]
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        users: [User]
        user(username: String!): User
        games: [Game]
        game(game: String!): Game
        gameLists(username: String): [GameList]
        gameList(listId: ID!): GameList
    }

    type Mutation {
        addUser(username: String!, password: String!): Auth
        login(username: String!, password: String!): Auth
        addGame(listId: ID!, slug: String!, name: String!, released: String!, image: String!, rating: String!, platforms: String!,metacritic: Int!): GameList
        addGameList(listName: String!): GameList
        removeGame(listId: ID!, gameId: ID!): GameList
        removeGameList(listId: ID!): GameList
    }
`;

module.exports = typeDefs;
