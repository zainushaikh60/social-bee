import React, { useReducer } from 'react';
import ShowFnContext from './showFnContext';
import showFnReducer from './alertReducer';
import { SHOW_FN_LAYOUT } from '../types';

const ShowFnState = (props) => {
  const initialState = false;

  // Set Alert
  const showFnLayout = () => {
    const id = uuid();
    dispatch({
      type: SET_ALERT,
      payload: { msg, type, className, id },
    });

    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
  };

  const [state, dispatch] = useReducer(showFnReducer, initialState);

  return (
    <ShowFnContext.Provider
      value={{
        alerts: state,
        setAlert,
      }}
    >
      {props.children}
    </ShowFnContext.Provider>
  );
};

export default ShowFnState;
