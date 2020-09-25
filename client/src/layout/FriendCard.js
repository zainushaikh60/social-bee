import React, { Fragment } from 'react';

const FriendCard = () => {
  return (
    <Fragment>
      <div className='user-card in-active'>
        <div className='user-info'>
          <a href='#!'>
            <img src='/images/zain.jpg' className='user-img' />
            Zain
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
