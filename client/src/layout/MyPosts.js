import React, { useContext, useEffect } from 'react';
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
    <div className='container'>
      {posts && posts !== null && posts.length === 0 ? (
        <h3>You have no posts</h3>
      ) : (
        posts.length > 0 &&
        posts.map(
          (post) =>
            post.user._id.toString() === user._id && (
              <PostCard key={post._id} post={post} />
            )
        )
      )}
    </div>
  );
};

export default MyPosts;
