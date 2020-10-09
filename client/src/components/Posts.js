import React, { Fragment, useContext, useEffect } from 'react';
import PostCard from '../layout/PostCard';
import PostContext from '../context/post/postContext';

const Post = () => {
  const postContext = useContext(PostContext);

  const { getPosts, posts } = postContext;

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <Fragment>
      {posts && posts !== null && posts.length === 0 ? (
        <h3>No posts</h3>
      ) : (
        posts.length > 0 &&
        posts.map((post) => <PostCard key={post._id} post={post} />)
      )}
    </Fragment>
  );
};

export default Post;
