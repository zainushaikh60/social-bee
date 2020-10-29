import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import CommentCard from '../layout/CommentCard';
import AddCommentCard from '../layout/AddCommentCard';
import AuthContext from '../context/auth/authContext';
import UserContext from '../context/user/userContext';
import PostContext from '../context/post/postContext';

const PostCard = ({ post, profileUser, postWrapper }) => {
  const authContext = useContext(AuthContext);
  const postContext = useContext(PostContext);
  const userContext = useContext(UserContext);

  const { user } = authContext;
  const { profilePicture } = userContext;

  const {
    deletePost,
    likePost,
    unlikePost,
    commentOnPost,
    deleteCommentOnPost,
  } = postContext;

  return (
    <Fragment>
      <div className={!postWrapper ? 'post-card' : 'post-card post-wrapper'}>
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
                    : { pathname: `/profile/${post.user._id}`, user: post.user }
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
                <i className='fas fa-times'></i>
              </a>
            </div>
          )}
        </div>

        <div className='post-body'>
          <p className='post-text'>{post.text}</p>
        </div>

        {post.image && post.image !== null && (
          <div className='post-image'>
            <a>
              <img
                src={
                  user && post.user._id.toString() === user._id
                    ? post.image
                    : `/${post.image}`
                }
              />
            </a>
          </div>
        )}

        <div className='post-statistics'>
          <div className='hr-line'></div>
          <div className='post-likes-comments '>
            {user && post.likes.find((like) => like.user === user._id) ? (
              <a className='in-active' onClick={(e) => unlikePost(post._id)}>
                <i className='fas fa-thumbs-up liked'></i> Unlike |{' '}
                {post.likes.length} Likes
              </a>
            ) : (
              <a className='in-active' onClick={(e) => likePost(post._id)}>
                <i className='far fa-thumbs-up'></i> Like | {post.likes.length}{' '}
                Likes
              </a>
            )}

            <a className='in-active'>
              <i className='far fa-comment-alt'></i> {post.comments.length}{' '}
              Comments
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
          postId={post._id}
          profilePicture={profilePicture}
          profileUser={profileUser}
          commentOnPost={commentOnPost}
        />
      </div>
    </Fragment>
  );
};

export default PostCard;
