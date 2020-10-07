import React, { Fragment, useContext, useState, useRef } from 'react';
import CommentCard from '../layout/CommentCard';
import AddCommentCard from '../layout/AddCommentCard';
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
            <CommentCard
              key={comment._id}
              comment={comment}
              postId={post._id}
              deleteCommentOnPost={deleteCommentOnPost}
              user={user}
            />
          ))}

        <AddCommentCard
          user={user}
          clear={clear}
          onClick={onClick}
          clearInput={clearInput}
          maxAllowedSize={maxAllowedSize}
          setComment={setComment}
          setCommentImage={setCommentImage}
          setAlert={setAlert}
        />
      </div>
    </Fragment>
  );
};

export default PostCard;
