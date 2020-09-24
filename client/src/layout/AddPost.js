import React, { Fragment } from 'react';

const AddPost = () => {
  return (
    <Fragment>
      <div className='add-post-container'>
        <div className='add-post-text'>
          <img src='/images/zain.jpg' className='user-img' />
          <input type='text' placeholder='What is on your mind, Zain?' />
        </div>
        <div className='add-post-options'>
          <button className='btn btn-primary'>Add Post</button>
          <button className='btn btn-primary btn-post-img'>Attach Image</button>
        </div>
      </div>
    </Fragment>
  );
};

export default AddPost;
