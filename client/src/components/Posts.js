import React, { Fragment, useContext, useEffect } from 'react';
import PostCard from '../layout/PostCard';
import PostContext from '../context/post/postContext';
import AuthContext from '../context/auth/authContext';

const Post = () => {
  const postContext = useContext(PostContext);
  const authContext = useContext(AuthContext);

  const { getPosts, posts } = postContext;
  const { user } = authContext;

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <Fragment>
      {user && posts && posts.length === 0 ? (
        <h3>No posts</h3>
      ) : (
        user &&
        posts &&
        posts.length > 0 &&
        posts.map(
          (post) =>
            post.user.friends.map((friend) => friend.toString()) === user._id
        ) &&
        posts
          .filter(
            (post) =>
              post.user.friends.map((friend) => friend).toString() === user._id
          )
          .map((post) => <PostCard key={post._id} post={post} />)
      )}
      {user &&
        posts &&
        posts.length > 0 &&
        posts
          .filter((post) => post.user._id.toString() === user._id)
          .map((post) => <PostCard key={post._id} post={post} />)}
    </Fragment>
  );
};

export default Post;
