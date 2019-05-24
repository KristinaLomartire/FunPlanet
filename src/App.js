import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';

import PostListFire from './article/PostListFire'

const App = () => {
  return (
    <div className="App">
      App works
      <PostListFire />
		</div>
  );
}

export default App;
