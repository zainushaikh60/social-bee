import React, { Fragment } from 'react';
import Users from './Users';
import Friends from './Friends';
import Notifications from './Notifcations';

const Sidebar = (props) => {
  return (
    <Fragment>
      <div className='sidebar sidebar__users'>
        <h2>All users</h2>
        <Users />
      </div>

      {props.fnLayout ? (
        <div className='sidebar sidebar__notifications'>
          <h2>Notifications</h2>
          <Notifications />
        </div>
      ) : (
        <div className='sidebar sidebar__friends'>
          <h2>Friends</h2>
          <Friends />
        </div>
      )}
    </Fragment>
  );
};

export default Sidebar;
