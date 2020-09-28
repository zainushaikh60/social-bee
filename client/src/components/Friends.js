import React, { Fragment, useContext } from 'react';
import FriendCard from '../layout/FriendCard';
import UserContext from '../context/user/userContext';

const Friends = () => {
  const userContext = useContext(UserContext);

  const { friends } = userContext;

  return (
    <Fragment>
      {friends &&
        friends.length > 0 &&
        friends.map((friend) => (
          <FriendCard key={friend._id} friend={friend} />
        ))}
    </Fragment>
  );
};

export default Friends;
