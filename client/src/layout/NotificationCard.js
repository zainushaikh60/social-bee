import React, { Fragment } from 'react';

const NotificationCard = () => {
  return (
    <Fragment>
      <div className='user-card in-active'>
        <div className='user-info'>
          <a href='#!'>
            <img src='/images/zain.jpg' className='user-img' />
          </a>
        </div>
        <div className='notification-text'>
          <p>You have recieved a friend request from Zain</p>
        </div>
      </div>
    </Fragment>
  );
};

export default NotificationCard;
