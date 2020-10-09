import {
  ADD_POST,
  ADD_POST_FAIL,
  DELETE_POST,
  DELETE_POST_FAIL,
  LIKE_POST,
  LIKE_POST_FAIL,
  UNLIKE_POST,
  UNLIKE_POST_FAIL,
  COMMENT_ON_POST,
  COMMENT_ON_POST_FAIL,
  DELETE_COMMENT_FROM_POST,
  DELETE_COMMENT_FROM_POST_FAIL,
  GET_POSTS,
  GET_POSTS_FAIL,
  CLEAR_ERRORS,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    case LIKE_POST:
    case UNLIKE_POST:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload.id
            ? { ...post, likes: action.payload.likes }
            : post
        ),
      };
    case COMMENT_ON_POST:
    case DELETE_COMMENT_FROM_POST:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload.id
            ? { ...post, comments: action.payload.comments }
            : post
        ),
      };
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
      };
    case ADD_POST_FAIL:
    case DELETE_POST_FAIL:
    case LIKE_POST_FAIL:
    case UNLIKE_POST_FAIL:
    case COMMENT_ON_POST_FAIL:
    case DELETE_COMMENT_FROM_POST_FAIL:
    case GET_POSTS_FAIL:
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
