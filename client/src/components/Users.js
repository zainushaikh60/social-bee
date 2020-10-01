import React, { Fragment, useContext, useEffect } from 'react';
import UserCard from '../layout/UserCard';
import AuthContext from '../context/auth/authContext';
import UserContext from '../context/user/userContext';

const Users = () => {
  const authContext = useContext(AuthContext);
  const userContext = useContext(UserContext);

  const { user } = authContext;

  const { users } = userContext;

  return (
    <Fragment>
      {user &&
      users.length > 0 &&
      users.filter((currentUser) => currentUser._id !== user._id).length ===
        0 ? (
        <p className='no-update'>No other users</p>
      ) : (
        user &&
        users
          .filter((currentUser) => currentUser._id !== user._id)
          .map((currentUser) => (
            <UserCard key={currentUser._id} currentUser={currentUser} />
          ))
      )}
    </Fragment>
  );
};

export default Users;
