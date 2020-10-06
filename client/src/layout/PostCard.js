import React, { Fragment, useContext, useState, useRef } from 'react';
import AuthContext from '../context/auth/authContext';
import PostContext from '../context/post/postContext';
import AlertContext from '../context/alert/alertContext';

const PostCard = ({ post }) => {
  const authContext = useContext(AuthContext);
  const postContext = useContext(PostContext);
  const alertContext = useContext(AlertContext);

  const { user } = authContext;
  const { setAlert } = alertContext;

  const {
    deletePost,
    likePost,
    unlikePost,
    commentOnPost,
    deleteCommentOnPost,
  } = postContext;

  const clearInput = useRef();

  function clear() {
    clearInput.current.value = '';
  }

  const maxAllowedSize = 5 * 1024 * 1024;

  const commentTextState = null;
  const commentImageState = null;

  const [comment, setComment] = useState(commentTextState);
  const [commentImage, setCommentImage] = useState(commentImageState);

  const onClick = () => {
    if (comment === null) {
      setAlert('Comment can not be left empty', 'danger', 'info-circle');
    } else if (commentImage === null) {
      commentOnPost(post._id, comment);
      setComment(commentTextState);
    } else {
      commentOnPost(post._id, comment, commentImage);
      setComment(commentTextState);
      setCommentImage(commentImageState);
    }
  };

  return (
    <Fragment>
      <div className='post-card'>
        <div className='post-info'>
          <div className='post-by-image'>
            <a href='#!'>
              <img
                src={
                  post.profilePicture === null
                    ? post.avatar
                    : post.profilePicture
                }
                className='user-img'
              />
            </a>
            <div className='post-by-name-date'>
              <a href='#!'>{post.name}</a>
              <p>{post.date}</p>
            </div>
          </div>
          {user && post.user === user._id && (
            <div className='post-delete' onClick={(e) => deletePost(post._id)}>
              <a href='#!'>
                <i class='fas fa-times'></i>
              </a>
            </div>
          )}
        </div>

        <div className='post-body'>
          <p>{post.text}</p>
        </div>

        {post.image && post.image !== null && (
          <div className='post-image'>
            <a href='#!'>
              <img src={post.image} alt='' />
            </a>
          </div>
        )}

        <div className='post-statistics'>
          <div className='hr-line'></div>
          <div className='post-likes-comments '>
            {post.likes.find((e) => e.user.toString() === user._id) ? (
              <a
                href='#!'
                className='in-active'
                onClick={(e) => unlikePost(post._id)}
              >
                <i class='fas fa-thumbs-up'></i> {post.likes.length} Likes
              </a>
            ) : (
              <a
                href='#!'
                className='in-active'
                onClick={(e) => likePost(post._id)}
              >
                <i class='far fa-thumbs-up'></i> {post.likes.length} Likes
              </a>
            )}

            <a href='#!' className='in-active'>
              <i class='far fa-comment-alt'></i> {post.comments.length} Comments
            </a>
          </div>
          <div className='hr-line'></div>
        </div>

        {post.comments &&
          post.comments.length > 0 &&
          post.comments.map((comment) => (
            <div className='post-comments' key={comment._id}>
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
                          <img
                            src={comment.image}
                            className='comment-img'
                          ></img>
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {user &&
                  post.comments.find(
                    (comment) => comment.user === user._id
                  ) && (
                    <a
                      href='#!'
                      className='delete-comment'
                      onClick={(e) =>
                        deleteCommentOnPost(post._id, comment._id)
                      }
                    >
                      <i class='far fa-trash-alt'></i>
                    </a>
                  )}
              </div>
            </div>
          ))}

        <div className='post-add-comment'>
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
      </div>
    </Fragment>
  );
};

export default PostCard;
