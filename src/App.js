import React from 'react';
// import firebase from 'firebase/app';
// simport 'firebase/firestore';

import PostListFire from './article/PostListFire'
import Login from './authentication/Login'
import SingleArticleFire from './singleArticle/SingleArticleFire'

const App = () => {
  return (
    <div className="App">
      Share
      <PostListFire />
      <hr />
      <Login />
      <SingleArticleFire />
		</div>
  );
}

export default App;
