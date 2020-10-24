import React, { Fragment, useContext, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import CommentCard from '../layout/CommentCard';
import AddCommentCard from '../layout/AddCommentCard';
import AuthContext from '../context/auth/authContext';
import UserContext from '../context/user/userContext';
import PostContext from '../context/post/postContext';
import AlertContext from '../context/alert/alertContext';

const PostCard = ({ post, profileUser }) => {
  const authContext = useContext(AuthContext);
  const postContext = useContext(PostContext);
  const alertContext = useContext(AlertContext);
  const userContext = useContext(UserContext);

  const { user } = authContext;
  const { profilePicture } = userContext;
  const { setAlert } = alertContext;

  const {
    deletePost,
    likePost,
    unlikePost,
    commentOnPost,
    deleteCommentOnPost,
  } = postContext;

  const clearInput = useRef();

  const clear = () => {
    clearInput.current.value = '';
  };

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

  const onClearImage = () => {
    setCommentImage(commentImageState);
  };

  return (
    <Fragment>
      <div className='post-card'>
        <div className='post-info'>
          <div className='post-by-image'>
            <Link
              to={{
                pathname:
                  user && post.user._id.toString() === user._id
                    ? '/my-profile'
                    : `/profile/${post.user._id}`,
                user: post.user,
              }}
            >
              <img
                src={
                  user && post.user._id.toString() === user._id
                    ? profilePicture === null
                      ? user.avatar
                      : profilePicture
                    : post.user.profilePicture === null
                    ? post.user.avatar
                    : `/${post.user.profilePicture}`
                }
                className='user-img'
              />
            </Link>

            <div className='post-by-name-date'>
              <Link
                to={
                  user && post.user._id.toString() === user._id
                    ? '/my-profile'
                    : '/profile'
                }
              >
                {post.user.name}
              </Link>
              <p>
                <Moment fromNow>{post.date}</Moment>
              </p>
            </div>
          </div>
          {user && post.user._id === user._id && (
            <div className='post-delete' onClick={(e) => deletePost(post._id)}>
              <a>
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
            <a>
              <img src={post.image} alt='' />
            </a>
          </div>
        )}

        <div className='post-statistics'>
          <div className='hr-line'></div>
          <div className='post-likes-comments '>
            {user && post.likes.find((like) => like.user === user._id) ? (
              <a className='in-active' onClick={(e) => unlikePost(post._id)}>
                <i class='fas fa-thumbs-up liked'></i> Unlike |{' '}
                {post.likes.length} Likes
              </a>
            ) : (
              <a className='in-active' onClick={(e) => likePost(post._id)}>
                <i class='far fa-thumbs-up'></i> Like | {post.likes.length}{' '}
                Likes
              </a>
            )}

            <a className='in-active'>
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
              profilePicture={profilePicture}
              profileUser={profileUser}
            />
          ))}

        <AddCommentCard
          user={user}
          profilePicture={profilePicture}
          clear={clear}
          onClick={onClick}
          clearInput={clearInput}
          maxAllowedSize={maxAllowedSize}
          setComment={setComment}
          comment={comment}
          setCommentImage={setCommentImage}
          commentImage={commentImage}
          onClearImage={onClearImage}
          setAlert={setAlert}
          profileUser={profileUser}
        />
      </div>
    </Fragment>
  );
};

export default PostCard;
