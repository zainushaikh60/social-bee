import React, { Fragment } from 'react';
import Navbar from '../layout/Navbar';
import Sidebar from './Sidebar';
import AddPost from '../layout/AddPost';
import PostCard from '../layout/PostCard';
import Profile from './Profile';

const Home = () => {
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
