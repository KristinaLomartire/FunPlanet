import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';


const PostListItem = ({post}) => {

  const [inputPost, setInputPost] = useState(post.content);

  const deletePost = () => {
    firebase.firestore().collection('post').doc(post.id).delete()
    .then(() => console.log('Delete is a success!'))
  }

  let maybePost = post.content;
  let deleteButton = (
    <span role="img" aria-label="delete" onClick={deletePost}>🗑️</span>
  )

  return (
    <li className="postListItem">
      {maybePost}
      {deleteButton}
    </li>
  )

}



export default PostListItem;
