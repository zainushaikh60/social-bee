import React, { Fragment, useContext, useEffect, useState } from 'react';
import Navbar from '../layout/Navbar';
import Sidebar from './Sidebar';
import AddPost from '../layout/AddPost';
import Posts from './Posts';
import MyProfile from './MyProfile';
import AuthContext from '../context/auth/authContext';
import UserContext from '../context/user/userContext';

const Home = () => {
  const authContext = useContext(AuthContext);
  const userContext = useContext(UserContext);

  const {
    getUsers,
    getFriends,
    getFriendRequestsTo,
    getFriendRequestsBy,
    getNotifications,
    getProfilePicture,
    getCoverPhoto,
  } = userContext;

  useEffect(() => {
    authContext.loadUser();
    getUsers();
    getProfilePicture();
    getCoverPhoto();
    getFriends();
    getFriendRequestsTo();
    getFriendRequestsBy();
    getNotifications();
  }, []);

  const [profile, setProfile] = useState(false);

  const [fnLayout, setFnLayout] = useState(false);

  const onSetProfile = () => {
    setProfile((profile) => !profile);
  };

  const onSetFnLayout = () => {
    setFnLayout((fnLayout) => !fnLayout);
  };

  return (
    <Fragment>
      <Navbar
        onClick={onSetProfile}
        profile={profile}
        onSetLayout={onSetFnLayout}
        fnLayout={fnLayout}
      />
      {profile ? <></> : <Sidebar fnLayout={fnLayout} />}

      <div className='wrapper'>
        <div className='container'>
          {profile ? (
            <MyProfile />
          ) : (
            <Fragment>
              <AddPost />
              <Posts />
            </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
