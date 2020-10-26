import React, { Fragment, useContext } from 'react';
import PostCard from '../layout/PostCard';
import PostContext from '../context/post/postContext';
import AuthContext from '../context/auth/authContext';

const FriendPosts = () => {
  const postContext = useContext(PostContext);
  const authContext = useContext(AuthContext);

  const { user } = authContext;
  const { posts } = postContext;

  return (
    <Fragment>
      {user &&
        user.friends.length > 0 &&
        posts.length > 0 &&
        posts
          .filter((post) =>
            post.user.friends.find((friend) => friend.toString() === user._id)
          )
          .map((post) => <PostCard key={post._id} post={post} />)}
    </Fragment>
  );
};

export default FriendPosts;
