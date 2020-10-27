import React, { Fragment, useRef, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import AlertContext from '../context/alert/alertContext';

const AddCommentCard = ({
  user,
  postId,
  commentOnPost,
  profileUser,
  profilePicture,
}) => {
  const alertContext = useContext(AlertContext);

  const { setAlert } = alertContext;

  const clearInput = useRef();

  const clear = () => {
    clearInput.current.value = '';
  };

  const commentTextState = '';

  const [comment, setComment] = useState({ text: commentTextState });

  const { text } = comment;

  const onChange = (e) =>
    setComment({ ...comment, [e.target.name]: e.target.value });

  const onClick = () => {
    if (text === null) {
      setAlert('Comment can not be left empty', 'danger', 'info-circle');
    } else {
      commentOnPost(postId, { text });
      setComment(commentTextState);
    }
  };

  let isCommentEmpty = true;

  if (comment && comment !== null) {
    isCommentEmpty = false;
  }

  return (
    <Fragment>
      <div className='post-add-comment'>
        <div className='add-comment'>
          <Link to='/my-profile'>
            <img
              src={
                user && profileUser !== null
                  ? profilePicture === null
                    ? user.avatar
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
              name='text'
              value={text}
              placeholder='Write a comment'
              onChange={onChange}
              ref={clearInput}
            />

            <button
              className={
                isCommentEmpty
                  ? 'btn-comment-disabled'
                  : 'btn btn-primary btn-comment'
              }
              disabled={isCommentEmpty}
              onClick={() => {
                onClick();
                clear();
              }}
            >
              Comment
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AddCommentCard;
