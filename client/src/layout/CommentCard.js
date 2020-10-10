import React, { Fragment, useContext } from 'react';
import Moment from 'react-moment';

const CommentCard = ({
  postId,
  comment,
  user,
  profilePicture,
  deleteCommentOnPost,
}) => {
  return (
    <Fragment>
      <div className='post-comments'>
        <div className='comment-by'>
          <div>
            <a href='#!'>
              <img
                src={
                  comment.user._id === user._id
                    ? profilePicture === null
                      ? user.avatar
                      : profilePicture
                    : comment.user.profilePicture === null
                    ? comment.user.avatar
                    : comment.user.profilePicture
                }
                className='user-img'
              />
            </a>
            <div className='comment-body'>
              <a href='#!'>{comment.user.name}</a>
              <p className='comment-date'>
                <Moment fromNow>{comment.date}</Moment>
              </p>

              <p className='comment-text'>{comment.text}</p>

              {comment.images !== null && (
                <div className='comment-image'>
                  <a href='#!'>
                    <img src={comment.image} className='comment-img'></img>
                  </a>
                </div>
              )}
            </div>
          </div>

          {user && comment.user._id === user._id && (
            <a
              href='#!'
              className='delete-comment'
              onClick={(e) => deleteCommentOnPost(postId, comment._id)}
            >
              <i class='far fa-trash-alt'></i>
            </a>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default CommentCard;
