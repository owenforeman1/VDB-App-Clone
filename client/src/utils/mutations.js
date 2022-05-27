import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $password: String!) {
    addUser(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_GAME = gql`
  mutation Mutation(
    $listId: ID!
    $slug: String!
    $name: String!
    $released: String!
    $image: String!
    $rating: String!
    $platforms: String!
    $metacritic: Int!
  ) {
    addGame(
      listId: $listId
      slug: $slug
      name: $name
      released: $released
      image: $image
      rating: $rating
      platforms: $platforms
      metacritic: $metacritic
    ) {
      _id
      games {
        slug
        name
        released
        image
        rating
        platforms
        metacritic
      }
    }
  }
`;

export const ADD_GAMELIST = gql`
  mutation addGameList($listName: String!) {
    addGameList(listName: $listName) {
      _id
      listName
    }
  }
`;