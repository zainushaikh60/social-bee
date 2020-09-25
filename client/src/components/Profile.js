import React, { Fragment } from 'react';
import AddPost from '../layout/AddPost';

import Posts from './Posts';

const Profile = () => {
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
              <img src='/images/zain.jpg' />
            </a>
          </div>
          <div className='profile-user'>
            <button className='btn btn-primary'>Change Profile Picture</button>
            <h3>Zain Ul Abdin</h3>
          </div>
          <AddPost />
          <Posts />
        </div>
      </div>
    </Fragment>
  );
};

export default Profile;
