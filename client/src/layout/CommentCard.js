import React, { Fragment } from 'react';

const CommentCard = ({ postId, comment, user, deleteCommentOnPost }) => {
  return (
    <Fragment>
      <div className='post-comments'>
        <div className='comment-by'>
          <div>
            <a href='#!'>
              <img
                src={
                  comment.profilePicture === null
                    ? comment.avatar
                    : comment.profilePicture
                }
                className='user-img'
              />
            </a>
            <div className='comment-body'>
              <a href='#!'>{comment.name}</a>
              <p className='comment-date'>{comment.date}</p>

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

          {user && comment.user.toString() === user._id && (
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
