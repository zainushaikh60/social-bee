import {
  GET_USER,
  GET_USERS,
  GET_USER_FAIL,
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
  GET_FRIEND_REQUESTS_TO,
  GET_FRIEND_REQUESTS_TO_FAIL,
  GET_FRIEND_REQUESTS_BY,
  GET_FRIEND_REQUESTS_BY_FAIL,
  GET_FRIENDS,
  GET_FRIENDS_FAIL,
  GET_NOTIFICATIONS,
  GET_NOTIFICATIONS_FAIL,
  CLEAR_ERRORS,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case SEND_FRIEND_REQUEST:
      return {
        ...state,
        friendRequestsTo: action.payload,
      };
    case CANCEL_FRIEND_REQUEST:
      return {
        ...state,
        friendRequestsTo: action.payload,
      };
    case ACCEPT_FRIEND_REQUEST:
      return {
        ...state,
        friends: action.payload.friends,
        friendRequestsBy: action.payload.friendRequestsBy,
        notifications: action.payload.notifications,
      };
    case REMOVE_FRIEND:
      return {
        ...state,
        friends: action.payload,
      };
    case GET_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload,
      };
    case GET_FRIENDS:
      return {
        ...state,
        friends: action.payload,
      };
    case GET_FRIEND_REQUESTS_TO:
      return {
        ...state,
        friendRequestsTo: action.payload,
      };
    case GET_FRIEND_REQUESTS_BY:
      return {
        ...state,
        friendRequestsBy: action.payload,
      };
    case REJECT_FRIEND_REQUEST:
      return {
        ...state,
        friendRequestsBy: action.payload.friendRequestsBy,
        notifications: action.payload.notifications,
      };
    case GET_USER_FAIL:
    case SEND_FRIEND_REQUEST_FAIL:
    case CANCEL_FRIEND_REQUEST_FAIL:
    case ACCEPT_FRIEND_REQUEST_FAIL:
    case REJECT_FRIEND_REQUEST_FAIL:
    case REMOVE_FRIEND_FAIL:
    case GET_FRIEND_REQUESTS_TO_FAIL:
    case GET_FRIEND_REQUESTS_BY_FAIL:
    case GET_FRIENDS_FAIL:
    case GET_NOTIFICATIONS_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
