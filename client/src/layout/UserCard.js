import React, { Fragment, useContext } from 'react';
import UserContext from '../context/user/userContext';
import AuthContext from '../context/auth/authContext';
import AlertContext from '../context/alert/alertContext';

const UserCard = ({ currentUser }) => {
  const userContext = useContext(UserContext);
  const authContext = useContext(AlertContext);
  const alertContext = useContext(AlertContext);

  const { setAlert } = alertContext;

  const { user } = authContext;

  const {
    friends,
    friendRequestsTo,
    friendRequestsBy,
    sendFriendRequest,
    cancelFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
    error,
    clearErrors,
  } = userContext;

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
        friendRequestTo._id.toString() === currentUser._id &&
        (isFriendRequestTo = true)
    )
  );

  if (
    friendRequestsBy.length > 0 &&
    friendRequestsBy.map(
      (friendRequestBy) =>
        friendRequestBy._id.toString() === currentUser._id &&
        (isFriendRequestBy = true)
    )
  );

  const onSendFriendRequest = () => {
    if (error === 'You can not send friend request to your friend') {
      setAlert(error, 'danger', 'info-circle');
      clearErrors();
    }
    sendFriendRequest(currentUser._id);
    setAlert('Friend request sent', 'success', 'check-circle');
  };

  const onCancelFriendRequest = () => {
    if (error === 'No friend requests to this user') {
      setAlert(error, 'danger', 'info-circle');
      clearErrors();
    }
    cancelFriendRequest(currentUser._id);
    setAlert('Friend request cancelled', 'danger', 'info-circle');
  };

  const onAcceptFriendRequest = () => {
    if (error === 'No friend request by this user') {
      setAlert(error, 'danger', 'info-circle');
      clearErrors();
    }
    acceptFriendRequest(currentUser._id);
    setAlert('Friend request accepted', 'success', 'user-friends');
  };

  const onRejectFriendRequest = () => {
    if (error === 'No friend request by this user') {
      setAlert(error);
      clearErrors();
    }
    rejectFriendRequest(currentUser._id);
    setAlert('Friend request rejected', 'danger', 'info-circle');
  };

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
            <p>Respond to friend request</p>
            <a href='#!'>Accept</a>
            <a href='#!'>Reject</a>
          </div>
        )}

        {isFriendRequestTo && (
          <div className='user-badge'>
            <a href='#!' onClick={onCancelFriendRequest}>
              Cancel Friend Request
            </a>
          </div>
        )}

        {!isFriends && !isFriendRequestTo && !isFriendRequestBy && (
          <div className='user-badge'>
            <a href='#!' onClick={onSendFriendRequest}>
              Add Friend
            </a>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default UserCard;
