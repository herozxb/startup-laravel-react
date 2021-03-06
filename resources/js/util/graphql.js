import gql from 'graphql-tag';

export const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;


export const FETCH_AREA_QUERY = gql`
  query($thoughtArea: String = "Self_improvement", $limit: Int = 30, $skip:Int = 0) {
    getAreaPosts(thoughtArea: $thoughtArea, limit: $limit , skip:$skip) {
      id
      body
      createdAt
      user
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
      thoughtArea
      honesty
      ability
      position
      salary
      person
    }
  }
`;



export const CREATE_AREA_POST_MUTATION = gql`
  mutation createAreaPost($body: String!,$thoughtArea: String!) {
    createAreaPost(body: $body, thoughtArea: $thoughtArea) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
      thoughtArea
      honesty
      ability
    }
  }
`;

export const CREATE_AREA_HONESTY_POST_MUTATION = gql`
  mutation createAreaHonestyPost($body: String!,$thoughtArea: String!,$honesty: String!,$ability: String!) {
    createAreaHonestyPost(body: $body, thoughtArea: $thoughtArea, honesty: $honesty, ability: $ability) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
      thoughtArea
      honesty
      ability
    }
  }
`;

export const CREATE_AREA_HONESTY_POSITION_POST_MUTATION = gql`
  mutation createAreaHonestyPostionPost($body: String!,$thoughtArea: String!,$honesty: String!,$ability: String!,$position: String!,$salary: String!,$person: String!) {
    createAreaHonestyPostionPost(body: $body, thoughtArea: $thoughtArea, honesty: $honesty, ability: $ability,position: $position, salary: $salary, person: $person) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
      thoughtArea
      honesty
      ability
      position
      salary
      person
    }
  }
`;



