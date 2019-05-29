import React from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { Link } from "react-router-dom";

const PostListItem = ({post, userID,}) => {
  console.log(userID);



  const deletePost = () => {
    firebase.firestore().collection('post').doc(post.id).delete()

  }
  let maybePost = post.content;
  let maybeTimestamp = 'Waiting for server...';
  let maybeName = post.createdBy;
  let maybeTag = post.tags.map(tag => (
    <Link to="/search/{tag}">{tag}, </Link>
  ));

  if( post.timestamp ) {
     maybeTimestamp = post.timestamp.toDate().toLocaleDateString();
  }
  let deleteButton = (
    <span className="delete" role="img" aria-label="delete" onClick={deletePost}> 🗑️ </span>
  )

  return (
    <li className="postListItem">
      <p className="post">
        {maybePost}
      </p>

      <p className="information">
        <span>
          <span className="userName">
          By {maybeName}
          {(post.createdByUID === userID) ? deleteButton : null}
          </span>
          <span className="time">
            {maybeTimestamp}
          </span>
        </span>

        <span className="tags">
            Tags: <br />
            {maybeTag}
        </span>

      </p>
    </li>
  )

}



export default PostListItem;
