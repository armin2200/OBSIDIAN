import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import './App.css';
import StockBox from './components/StockBox';
import { URI, TOKEN } from './constant';

const httpLink = createHttpLink({
  uri: URI
});

const authLink = setContext((_, { headers }) => {
  const token = TOKEN;
  // return the headers to the context so httpLink can read them
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

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className='App'>
          <StockBox />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
