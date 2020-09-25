import React, { Fragment } from 'react';
import Users from './Users';
import Friends from './Friends';
import Notifications from '../layout/NotificationCard';

const Sidebar = () => {
  return (
    <Fragment>
      <div className='sidebar sidebar__users'>
        <h2>All users</h2>
        <Users />
      </div>

      <div className='sidebar sidebar__friends'>
        <h2>Friends</h2>
        <Friends />
      </div>

      <div className='sidebar sidebar__notifications'>
        <h2>Notifications</h2>
        <Notifications />
      </div>
    </Fragment>
  );
};

export default Sidebar;
