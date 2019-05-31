import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';

import PostList from '../article/PostList';


const TagCloudFire = props => {

  const [postData, setPostData] = useState(null);
  const [tagSearch, setTagSearch] = useState(props.match.params.magicURL);

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
      if( list.length > 0 && typeof list !== 'undefined'){
        setPostData(list);
      }else{
        setPostData(null);

      }
    })
    return unsubscribe;
  }, [tagSearch])

  const filterChange = event =>{
    setTagSearch(event.target.value)
  }


  return (
    <div>
    <div>
      <input type="text" value={tagSearch} onChange={filterChange} />
    </div>

    {(postData === null) ? <p>Din sökning gav inget resultat </p> : <PostList list={postData}  />}

    </div>
  )
}

export default TagCloudFire;
