import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
    }
  }
`;

export const QUERY_USERS = gql`
query users {
    users {
      _id
      username
      password
    }
  }
`;

export const QUERY_GAME = gql


// users: [User]
//         user(username: String!): User
//         games: [Game]
//         game(game: String!): Game
//         gameLists(username: String): [GameList]
//         gameList(listId: ID!): GameList

        //    lists {
    //     _id
    //     games
    //   }