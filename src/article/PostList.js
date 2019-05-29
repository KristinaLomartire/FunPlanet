import React from 'react';
import PostListItem from './PostListItem';

const PostList = props => {
  let list = null;

  if( props.list ){
    list = props.list.map(post => (
      <PostListItem key={post.id} post={post} userID={props.userID} />
    ));
  }

  return (
    <div >
      <ul className="postList"> {list} </ul>
    </div>

  )

};

export default PostList;
