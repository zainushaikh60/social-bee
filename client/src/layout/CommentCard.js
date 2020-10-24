import React, { Fragment } from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

const CommentCard = ({
  postId,
  comment,
  user,
  profileUser,
  profilePicture,
  deleteCommentOnPost,
}) => {
  return (
    <Fragment>
      <div className='post-comments'>
        <div className='comment-by'>
          <div>
            <Link
              to={
                comment.user._id === user._id
                  ? '/my-profile'
                  : {
                      pathname: `/profile/${comment.user._id}`,
                      user: comment.user,
                    }
              }
            >
              <img
                src={
                  user && profileUser !== null
                    ? comment.user._id === user._id
                      ? profilePicture === null
                        ? user.avatar
                        : `/${profilePicture}`
                      : comment.user.profilePicture === null
                      ? comment.user.avatar
                      : `/${comment.user.profilePicture}`
                    : comment.user._id === user._id
                    ? profilePicture === null
                      ? user.avatar
                      : profilePicture
                    : comment.user.profilePicture === null
                    ? comment.user.avatar
                    : comment.user.profilePicture
                }
                className='user-img'
              />
            </Link>
            <div className='comment-body'>
              <Link
                to={
                  comment.user._id === user._id
                    ? '/my-profile'
                    : {
                        pathname: `/profile/${comment.user._id}`,
                        user: comment.user,
                      }
                }
              >
                {comment.user.name}
              </Link>
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
