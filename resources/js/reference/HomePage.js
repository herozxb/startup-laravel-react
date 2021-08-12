import ReactDOM from 'react-dom';
import React, { Component, useState, useContext, useRef, useEffect } from 'react';
import { Menu, Dropdown, Grid } from 'semantic-ui-react';

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

//const client = new ApolloClient({
//  uri: '127.0.0.1:5000',
//  cache: new InMemoryCache()
//});

const HomePage = () => { 

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
const link = createHttpLink({ uri: 'http://localhost:5000' });
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
  console.log("====areaValues====");
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

const { loading, data } = useQuery(QUERY);
  console.log("====1====");
  console.log(data);

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
		<ApolloProvider client={client}>
			<HomePageApp />
		</ ApolloProvider>
        );

}

export default HomePage

