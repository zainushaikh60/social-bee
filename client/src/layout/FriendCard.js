import React, { Fragment } from 'react';

const FriendCard = ({ friend }) => {
  return (
    <Fragment>
      <div className='user-card in-active'>
        <div className='user-info'>
          <a href='#!'>
            <img src={friend.avatar} className='user-img' />
            {friend.name}
          </a>
        </div>
        <div className='user-badge'>
          <a href='#!'>Unfriend</a>
        </div>
      </div>
    </Fragment>
  );
};

export default FriendCard;
