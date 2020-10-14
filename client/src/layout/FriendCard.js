import React, { Fragment, useContext } from 'react';
import UserContext from '../context/user/userContext';
import AlertContext from '../context/alert/alertContext';

const FriendCard = ({ friend }) => {
  const userContext = useContext(UserContext);
  const alertContext = useContext(AlertContext);

  const { removeFriend, error, clearErrors } = userContext;
  const { setAlert } = alertContext;

  const onRemoveFriend = () => {
    if (error === 'You are not friends with this user') {
      setAlert(error, 'danger', 'info-circle');
      clearErrors();
    }
    removeFriend(friend._id);
    setAlert('Friend removed', 'danger', 'user-friends');
  };

  return (
    <Fragment>
      <div className='user-card in-active'>
        <div className='user-info'>
          <a href='#!'>
            <img
              src={
                friend && friend.profilePicture === null
                  ? friend.avatar
                  : friend.profilePicture
              }
              className='user-img'
            />
            {friend.name}
          </a>
        </div>
        <div className='user-badge'>
          <a href='#!' onClick={onRemoveFriend}>
            Unfriend
          </a>
        </div>
      </div>
    </Fragment>
  );
};

export default FriendCard;
