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
    }
  }
`;

export const QUERY_GAMES = gql`
query Games {
    games {
      name
      _id
      slug
    }
  }
`

export const QUERY_GAME = gql`
query Game($gameId: ID) {
    game(gameId: $gameId) {
      _id
      slug
      name
      released
      image
    }
  }`

export const QUERY_GAMELISTS = gql`
query GameLists($userId: ID) {
    gameLists(userId: $userId) {
    _id
    listName
    games {
      name
    }  
    }
  }`

export const QUERY_GAMELIST = gql`
query GameLists($listId: ID!) {
    gameList(listId: $listId) {
    listName
    games {
      name
      slug
    }  
    }
  }`

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