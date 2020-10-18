import React, { Fragment, useRef } from 'react';
import { Link } from 'react-router-dom';

const AddCommentCard = ({
  user,
  profileUser,
  profilePicture,
  setComment,
  comment,
  clearInput,
  maxAllowedSize,
  setAlert,
  setCommentImage,
  commentImage,
  onClearImage,
  onClick,
  clear,
}) => {
  let url = null;
  let isCommentEmpty = true;

  if (comment && comment !== null) {
    isCommentEmpty = false;
  }

  if (commentImage && commentImage !== null) {
    url = URL.createObjectURL(commentImage);
  }

  const clearImageInput = useRef();

  const clearImage = () => {
    clearImageInput.current.value = '';
  };

  return (
    <Fragment>
      <div className='post-add-comment'>
        <div className='add-comment'>
          <Link to='/my-profile'>
            <img
              src={
                user && profileUser !== null
                  ? profilePicture === null
                    ? `/${user.avatar}`
                    : `/${profilePicture}`
                  : profilePicture === null
                  ? user.avatar
                  : profilePicture
              }
              className='user-img'
            />
          </Link>

          <div className='post-add-comment-text'>
            <input
              type='text'
              placeholder='Write a comment'
              onChange={(e) => setComment(e.target.value)}
              ref={clearInput}
            />

            <input
              ref={clearImageInput}
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

            {!isCommentEmpty && (
              <label
                for='post-comment'
                className='btn btn-primary btn-comment btn-comment-image'
              >
                <i class='far fa-image'></i>
              </label>
            )}

            <button
              className={
                isCommentEmpty
                  ? 'btn-comment-disabled'
                  : 'btn btn-primary btn-comment'
              }
              disabled={isCommentEmpty}
              onClick={() => {
                url = null;
                onClick();
                clear();
                clearImage();
              }}
            >
              Comment
            </button>
          </div>
        </div>

        {commentImage !== null && (
          <div className='comment-image-preview'>
            <p className='preview-heading'>Attached Image Preview:</p>
            <div className='image-preview'>
              <img src={url} />
              <Link
                className='comment-image-cancel'
                onClick={() => {
                  onClearImage();
                  clearImage();
                }}
              >
                <i class='fas fa-times'></i>
              </Link>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default AddCommentCard;
