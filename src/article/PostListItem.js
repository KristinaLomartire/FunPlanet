import React from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { Link } from "react-router-dom";


const PostListItem = ({ post, userID }) => {
  const deletePost = () => {
    firebase.firestore().collection('post').doc(post.id).delete()
  }

  let maybePost = post.content;
  let maybeTimestamp = 'Waiting for server...';
  let maybeName = post.createdBy;
  let maybeHeader = post.header;
  let tagURL = "/search/"
  let articleURL = "/article/";

  if (post.timestamp) {
    maybeTimestamp = post.timestamp.toDate().toLocaleDateString();
  }

  let maybePostCreateMarkup = () => {
    let shorterMaybePost = maybePost.substring(0, 666) + '...<br /><br /><span style="text-decoration: underline">Read full article...</span>';

    return {
      __html: shorterMaybePost.replace(/(\r\n|\n|\r)/gm, '<br />')
    };
  };

  let maybeTag = post.tags.map(tag => (
    <Link key={tag} to={tagURL + tag}>{tag}, </Link>
  ));

  let deleteButton = (
    <span className="delete" role="img" aria-label="delete" onClick={deletePost}> 🗑️ </span>
  )

  let shortTextLink = (
    <Link to={articleURL + post.id}>
      <p className="post" dangerouslySetInnerHTML={maybePostCreateMarkup()} />
    </Link>
  )

  return (
    <li className="postListItem">
      {(maybeHeader) ? <h1>{maybeHeader}</h1> : null}
      {shortTextLink}
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
