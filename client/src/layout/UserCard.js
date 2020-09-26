import React, { Fragment } from 'react';

const UserCard = ({ user }) => {
  const { _id, name, avatar } = user;

  return (
    <Fragment>
      <div className='user-card in-active'>
        <div className='user-info'>
          <a href='#!'>
            <img src={avatar} className='user-img' />
            {name}
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
