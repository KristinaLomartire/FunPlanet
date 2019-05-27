import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';

import PostList from './PostList';
import AddPost from './AddPost';

const PostListFire = () => {

  const [postData, setPostData] = useState(null);

  useEffect(() => {
    const db = firebase.firestore();
    const postCollection = db.collection('post');
    let unsubscribe = postCollection.onSnapshot(snapshot => {
      let list = [];
      snapshot.forEach(doc => {
        let obj = {
          ...doc.data(),
          id: doc.id
        };
        list.push(obj);
      })
      console.log('PostListFire: new list =', list);
      setPostData(list);
      console.log('PostListFire done');
    })

    return unsubscribe;
  }, [])

  return (
    <div>
    <PostList list={postData} />
    <AddPost />
    </div>
  )
}

export default PostListFire;
