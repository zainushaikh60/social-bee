import React, { Fragment, useContext } from 'react';
import PostCard from '../layout/PostCard';
import PostContext from '../context/post/postContext';
import AuthContext from '../context/auth/authContext';

const MyPosts = () => {
  const postContext = useContext(PostContext);
  const authContext = useContext(AuthContext);

  const { user } = authContext;

  const { posts } = postContext;

  return (
    <Fragment>
      {user && posts.length === 0 ? (
        <h4>You have no posts.</h4>
      ) : posts.length > 0 &&
        posts
          .filter((post) => post.user._id.toString() === user._id)
          .map((post) => post).length === 0 ? (
        <h4>You have no posts.</h4>
      ) : (
        posts
          .filter((post) => post.user._id.toString() === user._id)
          .map((post) => <PostCard key={post._id} post={post} />)
      )}
    </Fragment>
  );
};

export default MyPosts;
