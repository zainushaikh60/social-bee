import React, { Fragment, useContext } from 'react';
import UserContext from '../context/user/userContext';
import NotificationCard from '../layout/NotificationCard';

const Notifications = () => {
  const userContext = useContext(UserContext);

  const { notifications, removeNotification } = userContext;

  return (
    <Fragment>
      {notifications && notifications.length === 0 && (
        <p className='no-update'>No notifications</p>
      )}

      {notifications &&
        notifications.length > 0 &&
        notifications.map((notification) => (
          <NotificationCard
            key={notification._id}
            notification={notification}
            removeNotification={removeNotification}
          />
        ))}
    </Fragment>
  );
};

export default Notifications;
