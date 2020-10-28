import React, { Fragment, useContext } from 'react';
import PostCard from '../layout/PostCard';
import PostContext from '../context/post/postContext';
import AuthContext from '../context/auth/authContext';

import FriendPosts from '../layout/FriendPosts';

const Post = () => {
  const postContext = useContext(PostContext);
  const authContext = useContext(AuthContext);

  const { posts } = postContext;
  const { user } = authContext;

  return (
    <Fragment>
      {user &&
      posts
        .filter((post) => post.user._id.toString() === user._id)
        .map((post) => post).length === 0 &&
      posts
        .filter((post) =>
          post.user.friends.find((friend) => friend.toString() === user._id)
        )
        .map((post) => post).length === 0 ? (
        <h4 className='no-posts-h4'>
          Add a post or add friends to see their posts.
        </h4>
      ) : (
        user &&
        posts
          .filter((post) => post.user._id.toString() === user._id)
          .map((post) => <PostCard key={post._id} post={post} />)
      )}
      <FriendPosts />
    </Fragment>
  );
};

export default Post;
