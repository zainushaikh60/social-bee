import React, { Fragment } from 'react';

const NotificationCard = ({ notification }) => {
  return (
    <Fragment>
      <div className='user-card in-active'>
        <div className='user-info'>
          <a href='#!'>
            <img
              src={
                notification && notification.user.profilePicture === null
                  ? notification.user.avatar
                  : notification.user.profilePicture
              }
              className='user-img'
            />
          </a>
        </div>
        <div className='notification-text'>
          <p>{notification && notification.notification}</p>
        </div>
      </div>
    </Fragment>
  );
};

export default NotificationCard;
