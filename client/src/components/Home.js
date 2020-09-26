import React, { Fragment, useContext, useEffect, useState } from 'react';
import Navbar from '../layout/Navbar';
import Sidebar from './Sidebar';
import AddPost from '../layout/AddPost';
import PostCard from '../layout/PostCard';
import Profile from './Profile';
import AuthContext from '../context/auth/authContext';

const Home = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
  }, []);

  const [profile, setProfile] = useState(false);

  const onSetProfile = () => {
    setProfile((profile) => !profile);
  };

  return (
    <Fragment>
      <Navbar onClick={onSetProfile} profile={profile} />
      {profile ? <></> : <Sidebar />}

      <div className='wrapper'>
        <div className='container'>
          {profile && <Profile />}
          <AddPost />
          <PostCard />
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
