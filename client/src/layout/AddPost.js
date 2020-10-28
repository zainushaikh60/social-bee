import React, { Fragment, useContext, useState, useRef } from 'react';
import UserContext from '../context/user/userContext';
import AuthContext from '../context/auth/authContext';
import PostContext from '../context/post/postContext';
import AlertContext from '../context/alert/alertContext';
import { Link } from 'react-router-dom';

const AddPost = () => {
  const userContext = useContext(UserContext);
  const authContext = useContext(AuthContext);
  const postContext = useContext(PostContext);
  const alertContext = useContext(AlertContext);

  const { profilePicture } = userContext;
  const { user } = authContext;
  const { addPost } = postContext;
  const { setAlert } = alertContext;

  const clearInput = useRef();
  const clearImageInput = useRef();

  const maxAllowedSize = 5 * 1024 * 1024;

  const postTextState = null;
  const postImageState = null;

  const [postText, setPostText] = useState(postTextState);
  const [postImage, setPostImage] = useState(postImageState);

  const onClick = () => {
    if (postImage === null) {
      addPost(postText);
      setPostText(postTextState);
    } else {
      addPost(postText, postImage);
      setPostText(postTextState);
      setPostImage(postImageState);
    }
  };

  let url = null;
  let isPostEmpty = true;

  if (postText && postText !== null) {
    isPostEmpty = false;
  }

  if (postImage && postImage !== null) {
    url = URL.createObjectURL(postImage);
  }

  const clear = () => {
    clearInput.current.value = '';
  };

  const clearImage = () => {
    clearImageInput.current.value = '';
  };

  const onClearImage = () => {
    setPostImage(postImageState);
  };

  return (
    <Fragment>
      <div className='add-post-container'>
        <div className='add-post-text'>
          <Link to='/my-profile'>
            <img
              src={
                user && profilePicture === null ? user.avatar : profilePicture
              }
              className='user-img'
            />
          </Link>

          <input
            type='text'
            placeholder={`What's on your mind, ${user && user.name}?`}
            onChange={(e) => setPostText(e.target.value)}
            ref={clearInput}
          />
        </div>

        <input
          ref={clearImageInput}
          type='file'
          name='add-post-image'
          id='add-post-image'
          accept='.jpg, .jpeg, .png, .gif'
          onChange={(e) =>
            e.target.files && e.target.files[0].size > maxAllowedSize
              ? (setAlert(
                  `Image file size should be less than 5 mb`,
                  'danger',
                  'info-circle'
                ),
                (e.target.value = ''))
              : setPostImage(e.target.files[0])
          }
        />

        {!isPostEmpty && (
          <div className='add-post-options'>
            <button
              for='add-post'
              className='btn btn-primary'
              onClick={() => {
                url = null;
                onClick();
                clear();
                clearImage();
              }}
            >
              Add Post
            </button>

            <label
              for='add-post-image'
              className='btn btn-primary btn-post-img'
            >
              Attach Image
            </label>
          </div>
        )}

        {postImage !== null && (
          <div className='comment-image-preview'>
            <p className='preview-heading'>Attached Image Preview:</p>
            <div className='image-preview'>
              <img src={url} />
              <Link
                className='comment-image-cancel'
                onClick={() => {
                  clearImage();
                  onClearImage();
                }}
              >
                <i className='fas fa-times' />
              </Link>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default AddPost;
