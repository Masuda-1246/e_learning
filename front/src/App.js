import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient, InMemoryCache } from '@apollo/react-hooks';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './components/Home';
import SignInSide from './components/SignInSide';
import SignUpSide from './components/SignUpSide';

const client = new ApolloClient({
  uri: 'http://127.0.0.1:8000/graphql/',
  headers: {
    authorization: localStorage.getItem('token') ? `JWT ${localStorage.getItem('token')}` : '',
  },
  cache: new InMemoryCache()
});
function App() {
  console.log(client)
  return (
    <ApolloProvider client={client}>
        <div>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<SignInSide />} />
              <Route path="/signup" element={<SignUpSide />} />
            </Routes>
          </BrowserRouter>
        </div>
    </ApolloProvider>
  );
}

export default App;
