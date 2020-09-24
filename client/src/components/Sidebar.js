import React, { Fragment } from 'react';
import Users from './Users';
import Friends from './Friends';

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
    </Fragment>
  );
};

export default Sidebar;
