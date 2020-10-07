import React, { Fragment } from 'react';

const PostInfo = ({ user, post, deletePost }) => {
  return (
    <Fragment>
      <div className='post-info'>
        <div className='post-by-image'>
          <a href='#!'>
            <img
              src={
                post.profilePicture === null ? post.avatar : post.profilePicture
              }
              className='user-img'
            />
          </a>
          <div className='post-by-name-date'>
            <a href='#!'>{post.name}</a>
            <p>{post.date}</p>
          </div>
        </div>
        {user && post.user === user._id && (
          <div className='post-delete' onClick={(e) => deletePost(post._id)}>
            <a href='#!'>
              <i class='fas fa-times'></i>
            </a>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default PostInfo;
