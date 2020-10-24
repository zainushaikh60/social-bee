import React, { Fragment } from 'react';

const NotificationCard = ({ notification, removeNotification }) => {
  return (
    <Fragment>
      <div className='user-card user-notification in-active'>
        <div className='notification-container'>
          <div className='user-info'>
            <a>
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

        <a
          className='remove-notification'
          onClick={() => removeNotification(notification._id)}
        >
          <i class='fas fa-times'></i>
        </a>
      </div>
    </Fragment>
  );
};

export default NotificationCard;
