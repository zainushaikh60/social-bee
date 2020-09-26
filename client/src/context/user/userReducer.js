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
  GET_FRIEND_REQUESTS_TO,
  GET_FRIEND_REQUESTS_TO_FAIL,
  GET_FRIEND_REQUESTS_BY,
  GET_FRIEND_REQUESTS_BY_FAIL,
  GET_FRIENDS,
  GET_FRIENDS_FAIL,
  GET_NOTIFICATIONS,
  GET_NOTIFICATIONS_FAIL,
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
        friendRequestsBys: action.payload,
      };

    default:
      return state;
  }
};
