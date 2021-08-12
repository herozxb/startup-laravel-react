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
  query($thoughtArea: String!, $limit: Int!, $skip:Int!) {
    getAreaPosts(thoughtArea: $thoughtArea, limit: $limit , skip:$skip) {
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
      thoughtArea
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
    }
  }
`;


