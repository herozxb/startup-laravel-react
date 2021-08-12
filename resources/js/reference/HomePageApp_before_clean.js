import ReactDOM from 'react-dom';
import React, { Component, useState, useContext, useRef, useEffect } from 'react';
import { Grid, Transition, Divider, Header, Icon, Image } from 'semantic-ui-react';

//import {
//  ApolloClient,
//  InMemoryCache,
//  ApolloProvider,
//  useQuery,
//  gql
//} from "@apollo/client";


//import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { ApolloProvider } from '@apollo/react-hooks';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
//import { setContext } from "apollo-link-context";
//import { useQuery } from "react-apollo-hooks"

//import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

//import { setContext } from "@apollo/client/link/context";




import { FETCH_POSTS_QUERY, FETCH_AREA_QUERY } from './util/graphql';
import PostCard from './components/PostCard';
import { Card, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import moment from 'moment';


//import PostForm from './components/PostForm';

//const client = new ApolloClient({
//  uri: '127.0.0.1:5000',
//  cache: new InMemoryCache()
//});

const HomePageApp = () => { 

/*
const AUTH_TOKEN = "auth-token";

const httpLink = createHttpLink({
  uri: "http://localhost:4000"
});




const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN);

  if (!token) {
    return {
      headers
    };
  }

  return {
    headers: {
      ...headers,
      authorization: `Bearer ${token}`
    }
  };
});



const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});
*/

// 1. Create Apollo Client instance
const link = createHttpLink({ uri: 'http://192.168.1.106:5000/' });
const cache = new InMemoryCache();
const client = new ApolloClient({ link, cache });

const options = [
  { key: '1', text: '个人修养', value: 'Self_improvement' },
  { key: '2', text: '人际关系', value: 'Relationship' },
  { key: '3', text: '世界关系', value: 'Wolrd' },
  { key: '4', text: '健康', value: 'Health' },
  { key: '5', text: '成功', value: 'Success' },
  { key: '6', text: '梦想', value: 'Dream' },
  { key: '7', text: '改变世界', value: 'Change_the_world' },
  { key: '8', text: '勇敢去做', value: 'Brave_to_do' },
  { key: '9', text: 'Innovative Ideas', value: 'Innovative Ideas' },
  { key: '10', text: '工作', value: 'Job' },
  { key: '11', text: '开公司', value: 'Company' },
  { key: '12', text: '干', value: 'do' },
  { key: '13', text: '时间 Time', value: 'Time' },
  { key: '14', text: '痛苦 Pain', value: 'Pain' },
  { key: '15', text: '财富 Wealth', value: 'Wealth' },
  { key: '16', text: '说话', value: 'Speak' },
  { key: '17', text: '家庭', value: 'Family' },
  { key: '18', text: '年轻', value: 'Young' },
  { key: '19', text: '一念之差', value: 'Danger_thought' },
  { key: '20', text: '借口', value: 'Excuse' },
  { key: '21', text: '善与恶', value: 'good_or_evil' },
  { key: '22', text: '对付坏人', value: 'Enemy' },
  { key: '23', text: '正义 Justice', value: 'Justice' },
  { key: '24', text: '纪念 Memory', value: 'Memory' },
  { key: '25', text: '今天', value: 'Today' },
  { key: '26', text: '计划 Plan', value: 'Plan' },
  { key: '27', text: '科技革命', value: 'Revolution' },
]




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

  
/*
client
  .query({
    query: gql`
	  query {
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
    `
  })
  .then(result => console.log(result));
*/

  //var posts = []

  useEffect(() => {
    // Update the document title using the browser API
	
	client
	  .query({
	    query: FETCH_AREA_QUERY,

	      variables: {
		thoughtArea : areaValues
	    },
	  }).then(result => {setPosts(result.data.getAreaPosts);setLoading(result.data.loading) } );

	//console.log(data)
	  //.then(result => { setPosts(result.data.getAreaPosts);setLoading(result.data.loading)} );
  },[]);

/*
client
  .query({
    query: FETCH_AREA_QUERY,

      variables: {
        thoughtArea : areaValues
    },
  })
  .then(result => { setPosts(result.data.getAreaPosts);setLoading(result.data.loading)} );
  //.then(result => console.log(result.data.getAreaPosts));
  //.then(setPosts(result.data.getAreaPosts));
  //.then(result => console.log(result));
*/

/*
  const {
    loading,
    data: { getAreaPosts: posts } 
  } = useQuery(FETCH_AREA_QUERY,
    {
      variables: {
        thoughtArea : areaValues
    },
  }
  );
*/



  const pathname = window.location.pathname;

  const path = pathname === '/' ? 'home' : pathname.substr(1);

  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (name) => {

  setActiveItem(name);
  
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
    ReactDOM.render(<HomePageApp />, document.getElementById('HomePage'));
}
