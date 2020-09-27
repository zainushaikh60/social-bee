import React, { useReducer } from 'react';
import axios from 'axios';
import UserContext from './userContext';
import userReducer from './userReducer';

import {
  GET_USER,
  GET_USERS,
  GET_USER_FAIL,
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
  GET_FRIENDS,
  GET_FRIENDS_FAIL,
  GET_NOTIFICATIONS,
  GET_NOTIFICATIONS_FAIL,
  CLEAR_ERRORS,
} from '../types';

const UserState = (props) => {
  const initialState = {
    user: null,
    users: [],
    friendRequestsBy: [],
    friendRequestsTo: [],
    friends: [],
    notifications: [],
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

  // Get friend requests to

  const getFriendRequestsTo = async () => {
    try {
      const res = await axios.get('/api/auth/friendRequestsTo/');
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
      const res = await axios.get('/api/auth/friendRequestsBy/');
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
      const res = await axios.put(`api/users/${id}/cancelFriendRequest/`);
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
      const res = axios.put(`api/users/acceptFriendRequest/${id}`);
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
      const res = axios.put(`api/users/rejecFriendRequest/${id}`);
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

  // Clear Errors

  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        users: state.users,
        friendRequestsTo: state.friendRequestsTo,
        friendRequestsBy: state.friendRequestsBy,
        friends: state.friends,
        notifications: state.notifications,
        error: state.error,
        getUser,
        getUsers,
        getFriendRequestsTo,
        getFriendRequestsBy,
        sendFriendRequest,
        cancelFriendRequest,
        acceptFriendRequest,
        rejectFriendRequest,
        getFriends,
        getNotifications,
        clearErrors,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
