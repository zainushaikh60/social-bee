import React, { Fragment, useContext, useEffect } from 'react';
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

  return (
    <Fragment>
      <Navbar />
      <Sidebar />
      <div className='wrapper'>
        <div className='container'>
          {/* <Profile /> */}
          <AddPost />
          <PostCard />
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
