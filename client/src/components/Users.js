import React, { Fragment, useContext, useEffect } from 'react';
import UserCard from '../layout/UserCard';
import AuthContext from '../context/auth/authContext';
import UserContext from '../context/user/userContext';

const Users = () => {
  const authContext = useContext(AuthContext);
  const userContext = useContext(UserContext);

  const { user } = authContext;
  const { getUsers, users } = userContext;

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Fragment>
      {user &&
        users.length > 0 &&
        users
          .filter((currentUser) => currentUser._id !== user._id)
          .map((user) => <UserCard key={user._id} user={user} />)}
    </Fragment>
  );
};

export default Users;
