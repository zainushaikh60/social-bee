import React, { useReducer } from 'react';
import axios from 'axios';
import PostContext from './postContext';
import postReducer from './postReducer';

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
  GET_LIKES_ON_POST,
  GET_LIKES_ON_POST_FAIL,
  GET_COMMENTS_ON_POST,
  GET_COMMENTS_ON_POST_FAIL,
  CLEAR_ERRORS,
} from '../types';

const PostState = (props) => {
  const initialState = {
    posts: [],
    likes: [],
    comments: [],
    error: null,
  };

  // Add post

  const addPost = async (formData) => {
    const fd = new FormData();
    fd.append('formData', formData);
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    try {
      const res = await axios.post('/api/posts', fd, config);
      dispatch({
        type: ADD_POST,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: ADD_POST_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  // Delete post

  const deletePost = async (id) => {
    try {
      await axios.delete(`/api/posts/${id}`);
      dispatch({
        type: DELETE_POST,
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: DELETE_POST_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  // Like post

  const likePost = async (id) => {
    try {
      const res = await axios.put(`/api/posts/like/${id}`);
      dispatch({
        type: LIKE_POST,
        payload: { id, likes: res.data },
      });
    } catch (err) {
      dispatch({
        type: LIKE_POST_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  // Unlike post

  const unlikePost = async (id) => {
    try {
      const res = await axios.put(`/api/posts/unlike/${id}`);
      dispatch({
        type: UNLIKE_POST,
        payload: { id, likes: res.data },
      });
    } catch (err) {
      dispatch({
        type: UNLIKE_POST_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  //   Comment on post

  const commentOnPost = async (id, formData) => {
    const fd = new FormData();
    fd.append('formData', formData);
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    try {
      const res = await axios.post(`/api/posts/comment/${id}`, fd, config);
      dispatch({
        type: COMMENT_ON_POST,
        payload: { id, comments: res.data },
      });
    } catch (err) {
      dispatch({
        type: COMMENT_ON_POST_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  //   Delete comment on post

  const deleteCommentOnPost = async (id, commentId) => {
    try {
      const res = await axios.delete(`/api/posts/${id}/${commentId}`);
      dispatch({
        type: DELETE_COMMENT_FROM_POST,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: DELETE_COMMENT_FROM_POST_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  // Get all posts

  const getPosts = async () => {
    try {
      const res = await axios.get('/api/posts');
      dispatch({
        type: GET_POSTS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: GET_POSTS_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  // Clear Errors

  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  const [state, dispatch] = useReducer(postReducer, initialState);

  return (
    <PostContext.Provider
      value={{
        posts: state.posts,
        likes: state.likes,
        comments: state.comments,
        addPost,
        deletePost,
        likePost,
        unlikePost,
        commentOnPost,
        deleteCommentOnPost,
        getPosts,
        clearErrors,
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
};

export default PostState;
