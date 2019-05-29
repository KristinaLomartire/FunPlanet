import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';

import PostList from '../article/PostList';


const TagCloudFire = props => {

  const [postData, setPostData] = useState(null);
  const [tagSearch, setTagSearch] = useState('vel');

  useEffect(() => {
    const db = firebase.firestore();
    const postCollection = db.collection('post').orderBy('timestamp', 'desc');

    let unsubscribe = postCollection.onSnapshot(snapshot => {

      let list = [];
      snapshot.forEach(doc => {
        let obj = {
          ...doc.data(),
          id: doc.id
        };
        if( obj.tags.includes(tagSearch) )
          list.push(obj);
      })

      setPostData(list);

    })

    return unsubscribe;
  }, [])

  return (
    <div>
    <PostList list={postData} />
    </div>
  )
}

export default TagCloudFire;
