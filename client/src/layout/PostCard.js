import React, { Fragment, useContext } from 'react';
import AuthContext from '../context/auth/authContext';
import PostContext from '../context/post/postContext';

const PostCard = ({ post }) => {
  const authContext = useContext(AuthContext);
  const postContext = useContext(PostContext);

  const { user } = authContext;

  const {
    deletePost,
    likePost,
    unlikePost,
    commentOnPost,
    deleteCommentOnPost,
  } = postContext;

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
            {post.likes.find((e) => e.toString() === user._id) ? (
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

        {post.comments && post.comments.length > 0 && (
          <div className='post-comments'>
            <div className='comment-by'>
              <div>
                <a href='#!'>
                  <img
                    src={
                      post.comments.profilePicture === null
                        ? post.comments.avatar
                        : post.comments.profilePicture
                    }
                    className='user-img'
                  />
                </a>
                <div className='comment-body'>
                  <a href='#!'>{post.name}</a>
                  <p>{post.text}</p>

                  {post.comments.image !== null && (
                    <div className='comment-image'>
                      <a href='#!'>
                        <img
                          src={post.comments.image}
                          className='comment-img'
                        ></img>
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {user &&
                post.comments.user.find((e) => e.toString() === user._id) && (
                  <a
                    href='#!'
                    className='delete-comment'
                    onClick={(e) =>
                      deleteCommentOnPost(post._id, post.comment._id)
                    }
                  >
                    <i class='far fa-trash-alt'></i>
                  </a>
                )}
            </div>
            <div className='hr-line'></div>
          </div>
        )}

        <div className='post-add-comment'>
          <a href='#!'>
            <img
              src={
                post.profilePicture === null ? post.avatar : post.profilePicture
              }
              className='user-img'
            />
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
