import React, { Fragment, useContext } from 'react';
import PostCard from '../layout/PostCard';
import PostContext from '../context/post/postContext';

const Post = () => {
  const postContext = useContext(PostContext);

  const { posts } = postContext;

  return (
    <Fragment>
      {posts &&
        posts.length > 0 &&
        posts.map((post) => <PostCard key={post._id} post={post} />)}
    </Fragment>
  );
};

export default Post;
