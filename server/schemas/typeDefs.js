const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        password: String
    }

    type Game {}

    type GameList {}

    type Query {}

    type Mutation {}
`;

module.exports = typeDefs;
