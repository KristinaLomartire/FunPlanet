import React from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';


const PostListItem = ({post}) => {

  

  const deletePost = () => {
    firebase.firestore().collection('post').doc(post.id).delete()

  }
  let maybePost = post.content;
  let maybeTimestamp = 'Waiting for server...';
  let maybeName = post.createdBy;
  let maybeTag = post.tags;

  if( post.timestamp ) {
     maybeTimestamp = post.timestamp.toDate().toLocaleDateString();
  }
  let deleteButton = (
    <span className="delete" role="img" aria-label="delete" onClick={deletePost}>🗑️</span>
  )

  return (
    <li className="postListItem">
      <p className="post">
        {maybePost}
      </p>

      <p className="information">
        <p>
          <span className="userName">
          By {maybeName}
          </span>
          <span className="time">
            {maybeTimestamp}
          </span>
        </p>

        <p className="tags">
            Tags: <br />
            {maybeTag}
        </p>

        <p>
          {deleteButton}
        </p>
      </p>
    </li>
  )

}



export default PostListItem;
