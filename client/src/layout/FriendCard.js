import React, { Fragment, useContext } from 'react';
import UserContext from '../context/user/userContext';

const FriendCard = ({ friend }) => {
  const userContext = useContext(UserContext);

  const { removeFriend } = userContext;

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
          <a href='#!' onClick={(e) => removeFriend(friend._id)}>
            Unfriend
          </a>
        </div>
      </div>
    </Fragment>
  );
};

export default FriendCard;
