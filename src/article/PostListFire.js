import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';

import PostList from './PostList';
import PostListItem from './PostListItem';
import AddPost from './AddPost';

const PostListFire = () => {

  const [postData, setPostData] = useState(null);

  useEffect(() => {
    const db = firebase.firestore();
    const postCollection = db.collection('post');
    postCollection.onSnapshot(snapshot => {
      console.log('We got some posts!');
      let list = [];
      snapshot.forEach(doc => {
        let obj = {
          ...doc.data(),
          id: doc.id
        };
        list.push(obj);
      })
      setPostData(list);
    })


  }, [])

  return (
    <div>
    <PostList list={postData} />
    <AddPost />
    </div>
  )
}

export default PostListFire;
