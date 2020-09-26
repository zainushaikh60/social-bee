import React, { Fragment, useContext } from 'react';
import AuthContext from '../context/auth/authContext';

const PostCard = () => {
  const authContext = useContext(AuthContext);

  const { user } = authContext;

  return (
    <Fragment>
      <div className='post-card'>
        <div className='post-info'>
          <div className='post-by-image'>
            <a href='#!'>
              <img src='/images/zain.jpg' className='user-img' />
            </a>
            <div className='post-by-name-date'>
              <a href='#!'>Zain</a>
              <p>Today</p>
            </div>
          </div>
          <div className='post-delete'>
            <a href='#!'>
              <i class='fas fa-times'></i>
            </a>
          </div>
        </div>

        <div className='post-body'>
          <p>Hello</p>
        </div>

        <div className='post-image'>
          <img src='/images/post.jpg' alt='' />
        </div>

        <div className='post-statistics'>
          <div className='hr-line'></div>
          <div className='post-likes-comments '>
            <a href='#!' className='in-active'>
              <i class='far fa-thumbs-up'></i> 1 Like
            </a>
            <a href='#!' className='in-active'>
              <i class='far fa-comment-alt'></i> 1 Comment
            </a>
          </div>
          <div className='hr-line'></div>
        </div>

        <div className='post-comments'>
          <div className='comment-by'>
            <div>
              <a href='#!'>
                <img src='/images/zain.jpg' className='user-img' />
              </a>
              <div className='comment-body'>
                <a href='#!'>Zain</a>
                <p>Hello how are you?</p>
              </div>
            </div>
            <a href='#!' className='delete-comment'>
              <i class='far fa-trash-alt'></i>
            </a>
          </div>
          <div className='hr-line'></div>
        </div>

        <div className='post-add-comment'>
          <a href='#!'>
            <img src={user && user.avatar} className='user-img' />
          </a>
          <div className='post-add-comment-text'>
            <input type='text' placeholder='Write a comment' />
            <button className='btn btn-primary btn-comment'>Comment</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default PostCard;
