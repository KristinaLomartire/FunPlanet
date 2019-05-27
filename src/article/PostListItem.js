import React from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';


const PostListItem = ({post}) => {

  const deletePost = () => {
    firebase.firestore().collection('post').doc(post.id).delete()

  }
  
  let maybePost = post.content;
  let maybeTimestamp = 'Waiting for server...';
  if( post.timestamp ) {
     maybeTimestamp = post.timestamp.toDate().toLocaleDateString();
  }
  let deleteButton = (
    <span role="img" aria-label="delete" onClick={deletePost}>🗑️</span>
  )

  return (
    <li className="postListItem">
      {maybePost} <br />
      {maybeTimestamp} <br />
      {deleteButton}
    </li>
  )

}



export default PostListItem;
