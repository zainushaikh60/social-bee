import React, { Fragment } from 'react';

const UserCard = () => {
  return (
    <Fragment>
      <div className='user-card'>
        <div className='user-info'>
          <a href='#!'>
            <img src='/images/zain.jpg' className='user-img' />
            Zain
          </a>
        </div>
        <div className='user-badge'>
          <a href='#!'>Add Friend</a>
        </div>
      </div>
    </Fragment>
  );
};

export default UserCard;
