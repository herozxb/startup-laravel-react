import React from 'react';
import App from './App';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import { setContext } from 'apollo-link-context';

const httpLink = createHttpLink({
  //uri: 'http://120.53.220.237:5000'
  //uri: 'http://192.168.2.115:5000'
  //uri: 'https://192.168.0.118:5000/graphql'
  //uri: 'https://192.168.0.118:5000/graphql'
  //uri: 'https://localhost:5000/graphql'
  //uri: 'https://192.168.0.118:5000/graphql'
  uri: 'https://120.53.220.237:5000/graphql'

});

const authLink = setContext(() => {
  const token = localStorage.getItem('jwtToken');
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : ''
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
