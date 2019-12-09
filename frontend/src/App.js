import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter } from 'react-router-dom';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from 'react-apollo'

import MainRoutes from './components/Main';

const client = new ApolloClient({
  uri: "http://localhost:3001/graphql"
});

class App extends Component {
  render() {
    return (

      <BrowserRouter>
        <ApolloProvider client={client}>
          <MainRoutes />
        </ApolloProvider>
      </BrowserRouter>

    )
  }
}

export default App;
