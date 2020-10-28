import React, { Fragment, useContext, useEffect, useState } from 'react';
import Navbar from '../layout/Navbar';
import Sidebar from './Sidebar';
import AddPost from '../layout/AddPost';
import Posts from './Posts';
import MyProfile from './MyProfile';
import AuthContext from '../context/auth/authContext';
import UserContext from '../context/user/userContext';
import PostContext from '../context/post/postContext';

const Home = () => {
  const authContext = useContext(AuthContext);
  const userContext = useContext(UserContext);
  const postContext = useContext(PostContext);

  const {
    getUsers,
    getFriends,
    getFriendRequestsTo,
    getFriendRequestsBy,
    getNotifications,
    getProfilePicture,
    getCoverPhoto,
    unreadNotifications,
    getUnreadNotifications,
    readAllNotifications,
  } = userContext;

  const { getPosts } = postContext;

  useEffect(() => {
    authContext.loadUser();
    getUsers();
    getPosts();
    getProfilePicture();
    getCoverPhoto();
    getFriends();
    getFriendRequestsTo();
    getFriendRequestsBy();
    getNotifications();
    getUnreadNotifications();
  }, []);

  const [profile, setProfile] = useState(false);
  const [fnLayout, setFnLayout] = useState(false);
  const [sideMenu, setSideMenu] = useState(false);

  const onSetProfile = () => {
    setProfile((profile) => !profile);
  };

  const onSetFnLayout = () => {
    setFnLayout((fnLayout) => !fnLayout);
  };

  const onSetSideMenu = () => {
    setSideMenu((sideMenu) => !sideMenu);
  };

  return (
    <Fragment>
      <Navbar
        onClick={onSetProfile}
        profile={profile}
        onSetLayout={onSetFnLayout}
        onSetSideMenu={onSetSideMenu}
        sideMenu={sideMenu}
        fnLayout={fnLayout}
        unreadNotifications={unreadNotifications}
        readAllNotifications={readAllNotifications}
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
