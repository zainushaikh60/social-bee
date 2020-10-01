import React, { Fragment, useContext } from 'react';
import UserContext from '../context/user/userContext';
import AuthContext from '../context/auth/authContext';

const AddPost = () => {
  const userContext = useContext(UserContext);
  const authContext = useContext(AuthContext);

  const { profilePicture } = userContext;
  const { user } = authContext;

  return (
    <Fragment>
      <div className='add-post-container'>
        <div className='add-post-text'>
          <a href='#!'>
            <img
              src={
                user && profilePicture === null ? user.avatar : profilePicture
              }
              className='user-img'
            />
          </a>

          <input
            type='text'
            placeholder={`What's on your mind, ${user && user.name}`}
          />
        </div>
        <div className='add-post-options'>
          <button className='btn btn-primary'>Add Post</button>
          <button className='btn btn-primary btn-post-img'>Attach Image</button>
        </div>
      </div>
    </Fragment>
  );
};

export default AddPost;
