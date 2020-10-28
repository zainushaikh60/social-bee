import React, { Fragment, useEffect, useContext } from 'react';
import UserContext from '../context/user/userContext';
import PostCard from '../layout/PostCard';
import PostContext from '../context/post/postContext';
import ProfileNavbar from '../layout/ProfileNavbar';
import AlertContext from '../context/alert/alertContext';

const Profile = (props) => {
  const postContext = useContext(PostContext);
  const userContext = useContext(UserContext);
  const alertContext = useContext(AlertContext);

  const {
    friends,
    friendRequestsTo,
    friendRequestsBy,
    sendFriendRequest,
    cancelFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
    error,
    clearErrors,
  } = userContext;

  const { setAlert } = alertContext;

  const { getPosts, posts } = postContext;

  let postWrapper = false;

  useEffect(() => {
    window.scrollTo(0, 0);
    getPosts();
  }, []);

  let isFriends = false;
  let isFriendRequestTo = false;
  let isFriendRequestBy = false;

  if (
    props.location.user &&
    friends &&
    friends.length > 0 &&
    friends.map(
      (friend) =>
        friend._id.toString() === props.location.user._id &&
        (isFriends = !isFriends)
    )
  );

  if (
    props.location.user &&
    friendRequestsTo &&
    friendRequestsTo.length > 0 &&
    friendRequestsTo.map(
      (friendRequestTo) =>
        friendRequestTo.toString() === props.location.user._id &&
        (isFriendRequestTo = !isFriendRequestTo)
    )
  );

  if (
    props.location.user &&
    friendRequestsBy &&
    friendRequestsBy.length > 0 &&
    friendRequestsBy.map(
      (friendRequestBy) =>
        friendRequestBy.toString() === props.location.user._id &&
        (isFriendRequestBy = !isFriendRequestBy)
    )
  );

  const onSendFriendRequest = () => {
    if (error === 'You can not send friend request to your friend') {
      setAlert(error, 'danger', 'info-circle');
      clearErrors();
    }
    sendFriendRequest(props.location.user._id);
    setAlert('Friend request sent', 'success', 'user-friends');
  };

  const onCancelFriendRequest = () => {
    if (error === 'No friend requests to this user') {
      setAlert(error, 'danger', 'info-circle');
      clearErrors();
    }
    cancelFriendRequest(props.location.user._id);
    setAlert('Friend request cancelled', 'danger', 'user-friends');
  };

  const onAcceptFriendRequest = () => {
    if (error === 'No friend request by this user') {
      setAlert(error, 'danger', 'info-circle');
      clearErrors();
    }
    acceptFriendRequest(props.location.user._id);
    setAlert('Friend request accepted', 'success', 'user-friends');
  };

  const onRejectFriendRequest = () => {
    if (error === 'No friend request by this user') {
      setAlert(error, 'danger', 'info-circle');
      clearErrors();
    }
    rejectFriendRequest(props.location.user._id);
    setAlert('Friend request rejected', 'danger', 'user-friends');
  };

  return (
    <Fragment>
      <ProfileNavbar />

      <div className='wrapper'>
        <div className='profile'>
          <div className='profile-info'>
            {props.location.user && props.location.user.cover === null && (
              <div className='no-cover'>
                <h3 for='cover-photo'>No Cover Photo</h3>
              </div>
            )}

            {props.location.user && props.location.user.cover !== null && (
              <div className='profile-cover'>
                <a>
                  <img src={`/${props.location.user.cover}`} />
                </a>
              </div>
            )}

            {props.location.user &&
              props.location.user.profilePicture === null && (
                <div className='profile-picture'>
                  <a>
                    <img src={props.location.user.avatar} />
                  </a>
                </div>
              )}

            {props.location.user &&
              props.location.user.profilePicture !== null && (
                <div className='profile-picture'>
                  <a>
                    <img src={`/${props.location.user.profilePicture}`} />
                  </a>
                </div>
              )}

            {props.location.user && (
              <div className='profile-user profile-user-margin'>
                <h3>{props.location.user && props.location.user.name}</h3>
              </div>
            )}

            {isFriends && (
              <div className='user-badge profile-user-margin'>
                <a className='clearfix'>Friend</a>
              </div>
            )}

            {isFriendRequestBy && (
              <div className='user-badge profile-user-request'>
                <p>Respond to friend request</p>
                <div>
                  <a className='clearfix' onClick={onRejectFriendRequest}>
                    Reject
                  </a>
                  <a className='clearfix' onClick={onAcceptFriendRequest}>
                    Accept
                  </a>
                </div>
              </div>
            )}

            {isFriendRequestTo && (
              <div className='user-badge profile-user-margin'>
                <a className='clearfix' onClick={onCancelFriendRequest}>
                  Cancel Friend Request
                </a>
              </div>
            )}

            {!isFriends && !isFriendRequestTo && !isFriendRequestBy && (
              <div className='user-badge profile-user-margin'>
                <a className='clearfix' onClick={onSendFriendRequest}>
                  Add Friend
                </a>
              </div>
            )}

            {isFriends === false ? (
              <h4 className='no-friend-message'>{`Add ${
                props.location.user && props.location.user.name
              } as a friend to see their posts.`}</h4>
            ) : props.location.user && posts && posts.length === 0 ? (
              <h4 className='no-friend-message'>{`${
                props.location.user && props.location.user.name
              } has no posts.`}</h4>
            ) : posts.length > 0 &&
              posts
                .filter(
                  (post) => post.user._id.toString() === props.location.user._id
                )
                .map((post) => post).length === 0 ? (
              <h4 className='no-friend-message'>{`${
                props.location.user && props.location.user.name
              } has no posts.`}</h4>
            ) : (
              posts
                .filter(
                  (post) => post.user._id.toString() === props.location.user._id
                )
                .map((post) => (
                  <PostCard
                    key={post._id}
                    post={post}
                    profileUser={props.location.user}
                    postWrapper={(postWrapper = true)}
                  />
                ))
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Profile;
