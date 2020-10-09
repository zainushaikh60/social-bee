import React, { Fragment } from 'react';

const AddCommentCard = ({
  user,
  setComment,
  clearInput,
  maxAllowedSize,
  setAlert,
  setCommentImage,
  onClick,
  clear,
}) => {
  return (
    <Fragment>
      <div className='post-add-comment'>
        <div className='add-comm'>
          <a href='#!'>
            <img
              src={
                user.profilePicture === null ? user.avatar : user.profilePicture
              }
              className='user-img'
            />
          </a>

          <div className='post-add-comment-text'>
            <input
              type='text'
              placeholder='Write a comment'
              onChange={(e) => setComment(e.target.value)}
              ref={clearInput}
            />

            <input
              type='file'
              name='post-comment'
              id='post-comment'
              accept='.jpg, .jpeg, .png, .gif'
              onChange={(e) =>
                e.target.files && e.target.files[0].size > maxAllowedSize
                  ? (setAlert(
                      `Image file size should be less than 5 mb`,
                      'danger',
                      'info-circle'
                    ),
                    (e.target.value = ''))
                  : setCommentImage(e.target.files[0])
              }
            />

            <label
              for='post-comment'
              className='btn btn-primary btn-comment btn-comment-image'
            >
              <i class='far fa-image'></i>
            </label>

            <button
              className='btn btn-primary btn-comment'
              onClick={() => {
                onClick();
                clear();
              }}
            >
              Comment
            </button>
          </div>
        </div>

        <div className='comment-image-preview'>
          <p className='preview-heading'>Attached Image Preview:</p>
          <div className='image-preview'>
            <img src='/images/post.jpg'></img>
            <a href='#!' className='comment-image-cancel'>
              <i class='fas fa-times'></i>
            </a>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AddCommentCard;
