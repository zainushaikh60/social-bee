import React, { Fragment, useContext, useEffect } from 'react';
import PostCard from '../layout/PostCard';
import PostContext from '../context/post/postContext';
import AuthContext from '../context/auth/authContext';

const MyPosts = () => {
  const postContext = useContext(PostContext);
  const authContext = useContext(AuthContext);

  const { user } = authContext;

  const { getPosts, posts } = postContext;

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <Fragment>
      {user &&
      posts.length > 0 &&
      posts
        .filter((post) => post.user._id.toString() === user._id)
        .map((post) => <PostCard key={post._id} post={post} />).length === 0 ? (
        <h3>You have no posts</h3>
      ) : (
        user &&
        posts.length > 0 &&
        posts
          .filter((post) => post.user._id.toString() === user._id)
          .map((post) => <PostCard key={post._id} post={post} />)
      )}
    </Fragment>
  );
};

export default MyPosts;
