import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';

import PostList from './PostList';
import AddPost from './AddPost';

const PostListFire = props => {

  const [postData, setPostData] = useState(null);

  useEffect(() => {
    const db = firebase.firestore();
    const postCollection = db.collection('post').orderBy('timestamp', 'desc').limit(20);

    let unsubscribe = postCollection.onSnapshot(snapshot => {

      let list = [];
      snapshot.forEach(doc => {
        let obj = {
          ...doc.data(),
          id: doc.id
        };
        list.push(obj);
      })
      setPostData(list);
      console.log();
    })

    return unsubscribe;
  }, [])

  return (
    <div>
    <PostList list={postData} />
    <AddPost userID={props.userID} displayName={props.displayName}/>
    </div>
  )
}

export default PostListFire;
