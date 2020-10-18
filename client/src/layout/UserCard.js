import React, { Fragment, useContext } from 'react';
import UserContext from '../context/user/userContext';
import AuthContext from '../context/auth/authContext';
import AlertContext from '../context/alert/alertContext';
import { Link } from 'react-router-dom';

const UserCard = ({ currentUser }) => {
  const userContext = useContext(UserContext);
  const authContext = useContext(AuthContext);
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

  let isFriends = false;
  let isFriendRequestTo = false;
  let isFriendRequestBy = false;

  if (
    user &&
    friends &&
    friends.length > 0 &&
    friends.map(
      (friend) =>
        friend._id.toString() === currentUser._id && (isFriends = !isFriends)
    )
  );

  if (
    user &&
    friendRequestsTo &&
    friendRequestsTo.length > 0 &&
    friendRequestsTo.map(
      (friendRequestTo) =>
        friendRequestTo.toString() === currentUser._id &&
        (isFriendRequestTo = !isFriendRequestTo)
    )
  );

  if (
    user &&
    friendRequestsBy &&
    friendRequestsBy.length > 0 &&
    friendRequestsBy.map(
      (friendRequestBy) =>
        friendRequestBy.toString() === currentUser._id &&
        (isFriendRequestBy = !isFriendRequestBy)
    )
  );

  const onSendFriendRequest = () => {
    if (error === 'You can not send friend request to your friend') {
      setAlert(error, 'danger', 'info-circle');
      clearErrors();
    }
    sendFriendRequest(currentUser._id);
    setAlert('Friend request sent', 'success', 'user-friends');
  };

  const onCancelFriendRequest = () => {
    if (error === 'No friend requests to this user') {
      setAlert(error, 'danger', 'info-circle');
      clearErrors();
    }
    cancelFriendRequest(currentUser._id);
    setAlert('Friend request cancelled', 'danger', 'user-friends');
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
      setAlert(error, 'danger', 'info-circle');
      clearErrors();
    }
    rejectFriendRequest(currentUser._id);
    setAlert('Friend request rejected', 'danger', 'user-friends');
  };

  return (
    <Fragment>
      <div className='user-card in-active'>
        <div className='user-info'>
          <Link
            to={{
              pathname: `/profile/${currentUser._id}`,
              user: currentUser,
            }}
          >
            <img
              src={
                currentUser.profilePicture === null
                  ? currentUser.avatar
                  : currentUser.profilePicture
              }
              className='user-img'
            />
            {currentUser.name}
          </Link>
        </div>

        {isFriends && (
          <div className='user-badge'>
            <a>Friend</a>
          </div>
        )}

        {isFriendRequestBy && (
          <div className='user-badge'>
            <p>Respond to friend request</p>
            <a onClick={onRejectFriendRequest}>Reject</a>
            <a onClick={onAcceptFriendRequest}>Accept</a>
          </div>
        )}

        {isFriendRequestTo && (
          <div className='user-badge'>
            <a onClick={onCancelFriendRequest}>Cancel Friend Request</a>
          </div>
        )}

        {!isFriends && !isFriendRequestTo && !isFriendRequestBy && (
          <div className='user-badge'>
            <a onClick={onSendFriendRequest}>Add Friend</a>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default UserCard;
