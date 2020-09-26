import React, { Fragment, useContext } from 'react';
import AddPost from '../layout/AddPost';
import Posts from './Posts';
import AuthContext from '../context/auth/authContext';

const Profile = () => {
  const authContext = useContext(AuthContext);

  const { user } = authContext;

  return (
    <Fragment>
      <div className='profile'>
        <div className='profile-info'>
          <div className='profile-cover'>
            <a href='#!'>
              <img src='/images/post.jpg' />
            </a>

            <button className='btn btn-primary'>Change Cover</button>
          </div>
          <div className='profile-picture'>
            <a href='#!'>
              <img src={user && user.avatar} />
            </a>
          </div>
          <div className='profile-user'>
            <button className='btn btn-primary'>Change Profile Picture</button>
            <h3>{user && user.name}</h3>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Profile;
