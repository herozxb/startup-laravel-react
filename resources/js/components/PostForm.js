import React,{useState,useEffect} from 'react';
import { Button, Form, Divider, Header, Icon, Grid, Dropdown } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import { useForm } from '../util/hooks';
import { FETCH_POSTS_QUERY, FETCH_AREA_QUERY } from '../util/graphql';


function PostForm( { area, onAreaChange } ) {


  console.log("=========function_iput===========");
  console.log(area);
  //const { values, onChange, onSubmit } = useForm(createPostCallback, {
  //  body: ''
  //});

  //const [values, setValues] = useState('');
  const [texts, setTexts] = useState('');
  const [thoughtArea, setThoughtArea] = useState('default');
  //const [state,setState] = useState({options});
  //const [currentValues,setCurrentValues] = useState([]);

  const on_change_for_text = (event) => {
    //setValues({ ...values, [event.target.name]: event.target.value });
    setTexts({ ...texts, [event.target.name]: event.target.value });
    console.log("=========for_input_text========");
    //console.log(event.target.name);
    //console.log(event.target.value);
    //console.log({ ...texts, [event.target.name]: event.target.value });
    //console.log(texts);

    setThoughtArea({ ...thoughtArea, ["thoughtArea"]: area });
    console.log({ ...thoughtArea, ["thoughtArea"]: area });
  };

  //const on_change_for_thought_area = (e, { value }) => 
  //{
    //console.log(value);
  //  setCurrentValues(value)
  //};

//  const onSubmit = (event) => {
//    event.preventDefault();
    //console.log("=========1.0========");
//    createPost();
    //createPost3({
    //  variables: {thoughtArea3},
    //});
//  };

  /*
  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY
      });
      data.getPosts = [result.data.createPost, ...data.getPosts];
      proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
      values.body = '';
    }
  });
//*/

//  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION);


  const [createAreaPost, { error }] = useMutation(CREATE_AREA_POST_MUTATION,{
    variables: { body: texts.body, thoughtArea: thoughtArea.thoughtArea },
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_AREA_QUERY,
        variables:{ thoughtArea : thoughtArea.thoughtArea}
      });
      //console.log("=========1========");
      //console.log(data);
      data.getAreaPosts = [result.data.createAreaPost, ...data.getAreaPosts];
      //console.log("=========2========");
      //console.log(data);
      proxy.writeQuery({ 
        query: FETCH_AREA_QUERY, 
        variables:{ thoughtArea : thoughtArea.thoughtArea}, 
        data 
      });
      texts.body = '';
    }
  });

  const submit = (event) => {

    event.preventDefault();
    //console.log("=========1.0.0========");
    //console.log(texts,thoughtArea);
    //createPost3({
    //  variables: {thoughtArea3},
    //});
    //addTodo({ variables: { type: input.value } });
    //updateTodo({ variables: { id, type: input.value } });
    //createAreaPost({ variables: { body: texts.body, thoughtArea: thoughtArea.thoughtArea } });
    createAreaPost();

  };

//  function createPostCallback() {
    //console.log("=========1.0.1.1========");
//    createPost();
    //createPost3({
    //  variables: {thoughtArea3},
    //});
//  }



    // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
      console.log("====useEffect1.0======");
      console.log(area);
  });


  //const handleAddition = (e, { value }) => {

  //  console.log("=========1.0==========");   
  //  console.log(value);
    //setState((prevState) => ({
    //  options: [{ text: value, value }, ...prevState.options],
    //}))
  //}


  return (
    <>
      <Form onSubmit={submit}>
          <Divider horizontal>
            <Header as='h3'>
              <Icon name='comments' color="blue"/>
                发表 你的 思想
            </Header>
          </Divider>
        <Form.Field>
          <Form.Input
            placeholder="世界 你好!"
            name="body"
            onChange={on_change_for_text}
            value={texts.body}
            error={error ? true : false}
          />
          <Button type="submit" color="blue">
            发布
          </Button>
        </Form.Field>
      </Form>
      {error && (
        <div className="ui error message" style={{ marginBottom: 20 }}>
          <ul className="list">
            <li>{error.graphQLErrors[0].message}</li>
          </ul>
        </div>
      )}
    </>
  );
}

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
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
    }
  }
`;

const CREATE_AREA_POST_MUTATION = gql`
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

export default PostForm;
