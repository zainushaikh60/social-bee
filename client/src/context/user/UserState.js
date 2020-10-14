import React, { useReducer } from 'react';
import axios from 'axios';
import UserContext from './userContext';
import userReducer from './userReducer';

import {
  GET_USER,
  GET_USERS,
  GET_USER_FAIL,
  GET_PROFILE_PICTURE,
  GET_PROFILE_PICTURE_FAIL,
  UPLOAD_PROFILE_PICTURE,
  UPLOAD_PROFILE_PICTURE_FAIL,
  DELETE_PROFILE_PICTURE,
  DELETE_PROFILE_PICTURE_FAIL,
  GET_COVER_PHOTO,
  GET_COVER_PHOTO_FAIL,
  DELETE_COVER_PHOTO,
  DELETE_COVER_PHOTO_FAIL,
  UPLOAD_COVER_PHOTO,
  UPLOAD_COVER_PHOTO_FAIL,
  GET_FRIEND_REQUESTS_TO,
  GET_FRIEND_REQUESTS_TO_FAIL,
  GET_FRIEND_REQUESTS_BY,
  GET_FRIEND_REQUESTS_BY_FAIL,
  SEND_FRIEND_REQUEST,
  SEND_FRIEND_REQUEST_FAIL,
  CANCEL_FRIEND_REQUEST,
  CANCEL_FRIEND_REQUEST_FAIL,
  ACCEPT_FRIEND_REQUEST,
  ACCEPT_FRIEND_REQUEST_FAIL,
  REJECT_FRIEND_REQUEST,
  REJECT_FRIEND_REQUEST_FAIL,
  REMOVE_FRIEND,
  REMOVE_FRIEND_FAIL,
  GET_FRIENDS,
  GET_FRIENDS_FAIL,
  GET_NOTIFICATIONS,
  GET_NOTIFICATIONS_FAIL,
  UNREAD_NOTIFICATIONS,
  UNREAD_NOTIFICATIONS_FAIL,
  READ_NOTIFICATIONS,
  READ_NOTIFICATIONS_FAIL,
  REMOVE_NOTIFICATION,
  REMOVE_NOTIFICATION_FAIL,
  CLEAR_ERRORS,
} from '../types';

const UserState = (props) => {
  const initialState = {
    user: null,
    users: [],
    profilePicture: null,
    cover: null,
    friendRequestsBy: null,
    friendRequestsTo: null,
    friends: null,
    notifications: null,
    unreadNotifications: null,
    error: null,
  };

  // Get all users

  const getUsers = async () => {
    try {
      const res = await axios.get('/api/users');
      dispatch({
        type: GET_USERS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: GET_USER_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  // Get user by ID

  const getUser = async (id) => {
    try {
      const res = await axios.get(`/api/user/${id}`);
      dispatch({
        type: GET_USER,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: GET_USER_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  // Get profile picture

  const getProfilePicture = async () => {
    try {
      const res = await axios.get(`/api/auth/profile-picture`);
      dispatch({
        type: GET_PROFILE_PICTURE,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: GET_PROFILE_PICTURE_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  // Get cover photo

  const getCoverPhoto = async () => {
    try {
      const res = await axios.get(`/api/auth/cover-photo`);
      dispatch({
        type: GET_COVER_PHOTO,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: GET_COVER_PHOTO_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  // upload profile picture

  const uploadProfilePicture = async (profilePicture) => {
    const fd = new FormData();
    fd.append('profilePicture', profilePicture);
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    try {
      const res = await axios.post(
        `/api/auth/uploadProfilePicture`,
        fd,
        config
      );
      dispatch({
        type: UPLOAD_PROFILE_PICTURE,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: UPLOAD_PROFILE_PICTURE_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  // delete profile picture

  const deleteProfilePicture = async () => {
    try {
      const res = await axios.put(`/api/auth/deleteProfilePicture`);
      dispatch({
        type: DELETE_PROFILE_PICTURE,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: DELETE_PROFILE_PICTURE_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  // upload cover photo

  const uploadCoverPhoto = async (cover) => {
    const fd = new FormData();
    fd.append('cover', cover);
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    try {
      const res = await axios.post(`/api/auth/uploadCoverPhoto`, fd, config);
      dispatch({
        type: UPLOAD_COVER_PHOTO,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: UPLOAD_COVER_PHOTO_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  // delete cover photo

  const deleteCoverPhoto = async () => {
    try {
      const res = await axios.put(`/api/auth/deleteCoverPhoto`);
      dispatch({
        type: DELETE_COVER_PHOTO,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: DELETE_COVER_PHOTO_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  // Get friend requests to

  const getFriendRequestsTo = async () => {
    try {
      const res = await axios.get('/api/auth/friendRequestsTo');
      dispatch({
        type: GET_FRIEND_REQUESTS_TO,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: GET_FRIEND_REQUESTS_TO_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  // Get friend requests by

  const getFriendRequestsBy = async () => {
    try {
      const res = await axios.get('/api/auth/friendRequestsBy');
      dispatch({
        type: GET_FRIEND_REQUESTS_BY,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: GET_FRIEND_REQUESTS_BY_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  // Send friend request

  const sendFriendRequest = async (id) => {
    try {
      const res = await axios.put(`/api/users/${id}/sendFriendRequest`);
      dispatch({
        type: SEND_FRIEND_REQUEST,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: SEND_FRIEND_REQUEST_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  // Cancel friend request

  const cancelFriendRequest = async (id) => {
    try {
      const res = await axios.put(`/api/users/${id}/cancelFriendRequest`);
      dispatch({
        type: CANCEL_FRIEND_REQUEST,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: CANCEL_FRIEND_REQUEST_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  // Accept friend request

  const acceptFriendRequest = async (id) => {
    try {
      const res = await axios.put(`/api/users/${id}/acceptFriendRequest`);
      dispatch({
        type: ACCEPT_FRIEND_REQUEST,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: ACCEPT_FRIEND_REQUEST_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  // Reject friend request

  const rejectFriendRequest = async (id) => {
    try {
      const res = await axios.put(`/api/users/${id}/rejectFriendRequest`);
      dispatch({
        type: REJECT_FRIEND_REQUEST,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: REJECT_FRIEND_REQUEST_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  // Remove friend

  const removeFriend = async (id) => {
    try {
      const res = await axios.put(`/api/users/${id}/removeFriend`);
      dispatch({
        type: REMOVE_FRIEND,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: REMOVE_FRIEND_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  //   Get friends

  const getFriends = async () => {
    try {
      const res = await axios.get('/api/auth/friends');
      dispatch({
        type: GET_FRIENDS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: GET_FRIENDS_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  // Get notifications

  const getNotifications = async () => {
    try {
      const res = await axios.get('/api/auth/notifications');
      dispatch({
        type: GET_NOTIFICATIONS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: GET_NOTIFICATIONS_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  // Get unread notifications

  const getUnreadNotifications = async () => {
    try {
      const res = await axios.get(`/api/auth/unread-notifications`);
      dispatch({
        type: UNREAD_NOTIFICATIONS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: UNREAD_NOTIFICATIONS_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  // Read all notifications

  const readAllNotifications = async () => {
    try {
      const res = await axios.put(`/api/auth/read-notifications`);
      dispatch({
        type: READ_NOTIFICATIONS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: READ_NOTIFICATIONS_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  // Remove notifications

  const removeNotification = async (id) => {
    try {
      const res = await axios.delete(`/api/auth/${id}/notifications`);
      dispatch({
        type: REMOVE_NOTIFICATION,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: REMOVE_NOTIFICATION_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  // Clear Errors

  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        users: state.users,
        profilePicture: state.profilePicture,
        cover: state.cover,
        friendRequestsTo: state.friendRequestsTo,
        friendRequestsBy: state.friendRequestsBy,
        friends: state.friends,
        notifications: state.notifications,
        unreadNotifications: state.unreadNotifications,
        error: state.error,
        getUser,
        getUsers,
        getProfilePicture,
        getCoverPhoto,
        uploadProfilePicture,
        deleteProfilePicture,
        uploadCoverPhoto,
        deleteCoverPhoto,
        getFriendRequestsTo,
        getFriendRequestsBy,
        sendFriendRequest,
        cancelFriendRequest,
        acceptFriendRequest,
        rejectFriendRequest,
        removeFriend,
        getFriends,
        getNotifications,
        getUnreadNotifications,
        readAllNotifications,
        removeNotification,
        clearErrors,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
