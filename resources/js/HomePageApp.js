import ReactDOM from 'react-dom';
import React, { Component, useState, useContext, useRef, useEffect } from 'react';
import { Grid, Transition, Divider, Header, Icon, Image } from 'semantic-ui-react';
import { ApolloClient } from "apollo-client";
import { setContext } from '@apollo/client/link/context';
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { ApolloProvider } from '@apollo/react-hooks';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { FETCH_POSTS_QUERY, FETCH_AREA_QUERY, CREATE_AREA_POST_MUTATION } from './util/graphql';
import PostCard from './components/PostCard';
import { Card, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import moment from 'moment';
import { useSnackbar } from 'notistack';


import Chat from './components/Chat2/Chat';

const HomePageApp = (props) => { 

  //////////////////////////////////////////////////////////
  //Thought Area
  const [areaValues,setAreaValues] = useState("Self_improvement");
  const [posts,setPosts] = useState([]);
  const [loading,setLoading] = useState(true);
  const [user_login,setUser_login] = useState("");

  console.log("====areaValues=1.0===");
  console.log(areaValues);
  const on_change_for_thought_area = (e, { value }) => 
  {

    setAreaValues(value)
  };

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
              setUser_login(user)
              console.log("============2============");
              console.log(user);
          })

  };

  const link = createHttpLink({ uri: 'http://localhost:5005/graphql' });

  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    // return the headers to the context so httpLink can read them
    const token = user_login.token;
    console.log("========3===========");
    console.log(token);
    return {
      headers: {
        ...headers,
        authorization:  `${token}`,
      }
    }
  });

  const cache = new InMemoryCache();
  const client = new ApolloClient({ link: authLink.concat(link),cache });
  const user = "True"

  useEffect(() => {

    login( props.name, props.password );
	
  	client
  	  .query({
  	    query: FETCH_AREA_QUERY,

  	      variables: {
  		      thoughtArea : areaValues,
            limit:100,
            skip:0,
  	    },
  	  }).then(result => {setPosts(result.data.getAreaPosts);setLoading(result.data.loading) } );

  },[]);

  const pathname = window.location.pathname;
  const path = pathname === '/' ? 'home' : pathname.substr(1);
  const [activeItem, setActiveItem] = useState(path);
  const handleItemClick = (name) => {
    setActiveItem(name);
  };


  const [texts, setTexts] = useState();
  const [thoughtAreaMutation, setThoughtAreaMutation] = useState('default');


  const area = "Self_improvement"

  const on_change_for_text = (event) => {
    //setTexts([ ["text"] : ...texts, [event.target.name]: event.target.value ]);
    //console.log("=========for_input_text========");
    setTexts( event.target.value );

    //setThoughtAreaMutation({ ...thoughtAreaMutation, ["thoughtArea"]: area });
    //console.log({ ...thoughtAreaMutation, ["thoughtArea"]: area });
    console.log(texts);
    console.log("=========for_input_text_end========");
  };

  const upload_post = () =>{
    client.mutate({
        mutation: CREATE_AREA_POST_MUTATION,
        variables: { body: texts, thoughtArea: "Self_improvement" }
    }).then(() => {
     console.log("WithStaticCache upvotedPost then");
    })
    .catch(err => {
     console.log("catch 1", err);
    });;
    window.location.reload();
  }



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
                <button class="btn btn-primary btn-lg" type="button" onClick={upload_post}> 发布 </button>
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
