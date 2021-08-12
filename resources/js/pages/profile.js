import React, { useContext, useState, fetchPolicy } from 'react';
import { Link } from 'react-router-dom'
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import moment from 'moment';
import {
  Button,
  Card,
  Form,
  Grid,
  Image,
  Icon,
  Label,
  Menu, 
  Segment,
  Transition,
  Input,
  Divider
} from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import { useForm } from '../util/hooks';
import LikeButton from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import MyPopup from '../util/MyPopup';

function Profile(props) {

  const context = useContext(AuthContext);
  var username = null;
  var nologin = null;
  var createdAt = null;
  if (context.user===null)
  {
    username = "default";
    nologin = true;

  }
  else
  {
    username = context.user.username;
    nologin = false;
    createdAt = context.user.createdAt;
  }

  const {
    loading,
    data: { getUserPosts: posts }
  } = useQuery(FETCH_USER_QUERY, 
  {
    variables: {
      username
    },
  }
  );

  function deletePostCallback() {
    props.history.push('/');
  }

  const [activeItem, setActiveItem] = useState("home");

  const setActiveItemOnClick = (name) => {

  setActiveItem(name);
  };




  let postMarkup;
  if (!posts)
  {
    postMarkup = <p>Loading post..</p>;
  }
  else 
  {
    const {
      id,
      body,
      createdAt,
      username,
      comments,
      likes,
      likeCount,
      commentCount
    } = posts;

    postMarkup = (
      <div>
        { nologin ? 
          (
          <h1>You are not logged in...</h1>
          ) 
          : 
          (
          <Grid centered>
            <Grid.Column centered width={20}>
              <Card>
                <Image src='https://react.semantic-ui.com/images/avatar/large/daniel.jpg' wrapped ui={false} />
                <Card.Content>
                  <Card.Header>{context.user.username}</Card.Header>
                  <Card.Meta>{moment(context.user.createdAt).fromNow(true)}</Card.Meta>
                  <Card.Description>
                    Daniel is a comedian living in Nashville.
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <a>
                    <Icon name='user' />
                    10 Friends
                  </a>
                </Card.Content>
              </Card>
              <Grid.Row>
              {context.user && (
                <Grid.Column>
                    <PostForm />
                  </Grid.Column>
                )}
                {
                  loading ? 
                  (
                  <h1>Loading posts..</h1>
                  ) 
                  : 
                  (
                  <Transition.Group>
                    <Grid.Column>
                      <Divider horizontal><h3>最新</h3></Divider>
                    </Grid.Column>
                    {posts &&
                      posts.map((post) => (
                        <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                          <PostCard post={post} />
                        </Grid.Column>
                      ))}
                  </Transition.Group>
                  )
                }
              </Grid.Row>
            </Grid.Column>
          </Grid>
          )
          }
      </div>
    );
  }
  return postMarkup;

}

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

const SUBMIT_COMMENT_MUTATION = gql`
  mutation($postId: String!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        body
        createdAt
        username
      }
      commentCount
    }
  }
`;

const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
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

const FETCH_USER_QUERY = gql`
  query($username: String!) {
    getUserPosts(username: $username) {
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

export default Profile;
