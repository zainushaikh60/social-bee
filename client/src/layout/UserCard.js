import React, { Fragment, useContext } from 'react';
import UserContext from '../context/user/userContext';

const UserCard = ({ currentUser }) => {
  const userContext = useContext(UserContext);

  const { friends, friendRequestsTo, friendRequestsBy } = userContext;

  let isFriends = null;
  let isFriendRequestTo = null;
  let isFriendRequestBy = null;

  if (
    friends.length > 0 &&
    friends.map(
      (friend) =>
        friend._id.toString() === currentUser._id && (isFriends = true)
    )
  );

  if (
    friendRequestsTo.length > 0 &&
    friendRequestsTo.map(
      (friendRequestTo) =>
        friendRequestTo.toString() === currentUser._id &&
        (isFriendRequestTo = true)
    )
  );

  if (
    friendRequestsBy.length > 0 &&
    friendRequestsBy.map(
      (friendRequestBy) =>
        friendRequestBy.toString() === currentUser._id &&
        (isFriendRequestBy = true)
    )
  );

  return (
    <Fragment>
      <div className='user-card in-active'>
        <div className='user-info'>
          <a href='#!'>
            <img src={currentUser.avatar} className='user-img' />
            {currentUser.name}
          </a>
        </div>

        {isFriends && (
          <div className='user-badge'>
            <a href='#!'>Friend</a>
          </div>
        )}

        {isFriendRequestBy && (
          <div className='user-badge'>
            <a href='#!'>Respond</a>
          </div>
        )}

        {isFriendRequestTo && (
          <div className='user-badge'>
            <a href='#!'>Pending</a>
          </div>
        )}

        {!isFriends && !isFriendRequestTo && !isFriendRequestBy && (
          <div className='user-badge'>
            <a href='#!'>Add Friend</a>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default UserCard;
