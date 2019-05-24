import React from 'react';
// import firebase from 'firebase/app';
import 'firebase/firestore';

import PostListFire from './article/PostListFire'
import Login from './authentication/Login'

const App = () => {
  return (
    <div className="App">
      App works
      <PostListFire />
      <hr />
      <Login />
		</div>
  );
}

export default App;
