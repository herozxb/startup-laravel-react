import ReactDOM from 'react-dom';
import React, { Component, useState, useContext, useRef, useEffect } from 'react';
import { Grid, Transition, Divider, Header, Icon, Image } from 'semantic-ui-react';
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { ApolloProvider } from '@apollo/react-hooks';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { FETCH_POSTS_QUERY, FETCH_AREA_QUERY } from './util/graphql';
import PostCard from './components/PostCard';
import { Card, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import moment from 'moment';
import { useSnackbar } from 'notistack';


import Chat from './components/Chat2/Chat';

const HomePageApp = (props) => { 

  console.log("============1================")
  console.log(props)

  const link = createHttpLink({ uri: 'http://127.0.0.1:5000/' });

  //const link = createHttpLink({ uri: 'http://192.168.1.103:5000/' });
  const cache = new InMemoryCache();
  const client = new ApolloClient({ link, cache });
  const user = "True"

  //////////////////////////////////////////////////////////
  //Thought Area
  const [areaValues,setAreaValues] = useState("Self_improvement");
  const [posts,setPosts] = useState([]);
  const [loading,setLoading] = useState(true);

  console.log("====areaValues=1.0===");
  console.log(areaValues);
  const on_change_for_thought_area = (e, { value }) => 
  {
    //console.log(value);
    setAreaValues(value)
  };


  let thoughtArea = "Self_improvement";
  console.log(thoughtArea);


const QUERY = gql`
  query {
    getAreaPosts(thoughtArea:$thoughtArea,limit:$limit,skip:$skip) {
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



const useHandleResponse = () => {

    const handleResponse = response => {
        return response.text().then(text => {
            const data = text && JSON.parse(text);
            if (!response.ok) {
                if ([401, 403].indexOf(response.status) !== -1) {

                }

                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }

            return data;
        });
    };

    return handleResponse;
};

    const handleResponse = useHandleResponse();


    const login = (username, password) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        };

        console.log(requestOptions)

        return fetch(
            `http://192.168.10.48:5002/api/users/login`,
            requestOptions
        ).then(handleResponse)
        .then(user => {

          console.log(user);
            })

    };

  useEffect(() => {

    login(props.name,props.password);
	
	client
	  .query({
	    query: FETCH_AREA_QUERY,

	      variables: {
		      thoughtArea : areaValues,
          limit:100,
          skip:0,
	    },
	  }).then(result => {setPosts(result.data.getAreaPosts);setLoading(result.data.loading) } );

/*
  client.mutate({
      mutation: CREATE_AREA_POST_MUTATION,
      variables: { body: "Take pain to do it!", thoughtArea: "Self_improvement" }
  }).then(() => {
   console.log("WithStaticCache upvotedPost then");
  })
  .catch(err => {
   console.log("catch 1", err);
  });;
//*/

  },[]);




  const pathname = window.location.pathname;

  const path = pathname === '/' ? 'home' : pathname.substr(1);

  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (name) => {

  setActiveItem(name);
  
  };


  const [texts, setTexts] = useState('');
  const [thoughtAreaMutation, setThoughtAreaMutation] = useState('default');


  const area = "Self_improvement"

  const on_change_for_text = (event) => {
    setTexts({ ...texts, [event.target.name]: event.target.value });
    console.log("=========for_input_text========");

    setThoughtAreaMutation({ ...thoughtAreaMutation, ["thoughtArea"]: area });
    console.log({ ...thoughtAreaMutation, ["thoughtArea"]: area });
    //console.log(texts);
    console.log("=========for_input_text_end========");
  };





  return (
		<Grid>
		      <Grid.Row centered>

    				<DropdownButton id="dropdown-basic-button" title="       搜索行业领域       " size='lg' style={{ width: '300px', transform:' translateX(30px)', zIndex: 100}} >
    				  <Dropdown.Item href="#/action-1">教育</Dropdown.Item>
    				  <Dropdown.Item href="#/action-2">医疗</Dropdown.Item>
    				  <Dropdown.Item href="#/action-3">科学</Dropdown.Item>
              <Dropdown.Item href="#/action-4">技术</Dropdown.Item>
              <Dropdown.Item href="#/action-5">服饰</Dropdown.Item>
              <Dropdown.Item href="#/action-6">美食</Dropdown.Item>
              <Dropdown.Item href="#/action-7">租房</Dropdown.Item>
              <Dropdown.Item href="#/action-8">旅游</Dropdown.Item>
    				</DropdownButton>

          </Grid.Row>

          <Grid.Row centered>
            <div class="input-group mb-3" style={{ width: '80%', transform:' translateX(30px)'}}>
              <div class="input-group-prepend">
                <button class="btn btn-primary btn-lg" type="button"> 发布 </button>
              </div>
              <input type="text" class="form-control" placeholder="世界 你好！" aria-label="" aria-describedby="basic-addon1" onChange={on_change_for_text} />
            </div>


          </Grid.Row>
		      <Grid.Row centered>
          {
			       loading ?   (
			  		               <h1>loading...</h1> ) 
                        : 
				                (

			  		               posts.map((post) => ( 
                  								<Card style={{ width: '15rem', transform:' translateX(30px)' }}>
                  								  <Card.Img variant="top" src="https://react.semantic-ui.com/images/avatar/large/molly.png" />
                  								  <Card.Body>
                  								    <Card.Title>{post.username}</Card.Title>
                  								    <Card.Text>
                  								      {post.body}
                  								    </Card.Text>
                     								    <a href="/dashboard" >
                  								        <Button variant="primary">联系他</Button>
                     								    </a>  
                                        <Card.Text>
                                          <small className="text-muted">{moment(post.createdAt).fromNow(true)}</small>
                                        </Card.Text>
                  								  </Card.Body>
                  								</Card>					
						              ))


				              ) 
          }
          </Grid.Row>
		</Grid>
    );

}

export default HomePageApp

if (document.getElementById('HomePage')) {
    //ReactDOM.render(<HomePageApp />, document.getElementById('HomePage'));

    // find element by id
    const element = document.getElementById('HomePage')
      
    // create new props object with element's data-attributes
    // result: {tsId: "1241"}
    const props = Object.assign({}, element.dataset)

    // render element with props (using spread)
    ReactDOM.render(<HomePageApp {...props}/>, element);
}
