const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        password: String
        gameLists: GameList
    }

    type Game {
        _id: ID
        slug: String
        name: String
        releades: String
        image: String
        games: [Game]
    }

    type GameList {
        _id: ID
        user: User!
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
    }

    type Mutation {
        
    }
`;

module.exports = typeDefs;
