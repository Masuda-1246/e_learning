import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient, InMemoryCache } from '@apollo/react-hooks';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import SignInSide from './components/SignInSide';
import SignUpSide from './components/SignUpSide';
import MainPage from './components/MainPage';
import RegisterLecture from './components/RegisterLecture';
import MyPage from './components/MyPage';
import LecturePage from './components/LecturePage';
import TestPage from './components/TestPage';
import PassPage from './components/PassPage';
import CertificatePage from './components/CertificatePage';

const client = new ApolloClient({
  uri: 'https://eee.lux-ai-e-learning.net/graphql/',
  headers: {
    authorization: localStorage.getItem('token') ? `JWT ${localStorage.getItem('token')}` : '',
  },
  cache: new InMemoryCache(),
});
function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<SignInSide />} />
            <Route path="/signup" element={<SignUpSide />} />
            <Route path="/register" element={<RegisterLecture />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/lecture" element={<LecturePage />} />
            <Route path="/test" element={<TestPage />} />
            <Route path="/pass" element={<PassPage />} />
            <Route path="/certificate" element={<CertificatePage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ApolloProvider>
  );
}

export default App;
