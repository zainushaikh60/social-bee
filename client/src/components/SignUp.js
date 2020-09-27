import React, { Fragment, useState, useContext, useEffect } from 'react';
import AuthContext from '../context/auth/authContext';
import AlertContext from '../context/alert/alertContext';

const SignUp = (props) => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const { setAlert } = alertContext;
  const { register, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }

    if (error === 'User already exists') {
      setAlert(error);
      clearErrors();
    }
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (name === '' || email === '' || password === '' || password2 === '') {
      setAlert('Please enter all fields');
    } else if (password !== password2) {
      setAlert('Passwords do not match');
    } else {
      register({
        name,
        email,
        password,
      });
    }
  };

  return (
    <Fragment>
      <div className='signup-page'>
        <div className='heading-container'>
          <h1>Make Friends & Enjoy</h1>
        </div>
        <div className='form-container'>
          <form onSubmit={onSubmit} className='form'>
            <div className='form-header'>
              <a href='#!' className='form-logo'>
                <img src='/images/bee-blue.svg' /> Social Bee&nbsp;|
              </a>
              <h4 className='form-logo'>&nbsp;Sign Up</h4>
            </div>
            <input
              type='text'
              placeholder='Name'
              name='name'
              value={name}
              onChange={onChange}
            />
            <input
              type='email'
              placeholder='Email'
              name='email'
              value={email}
              onChange={onChange}
            ></input>
            <input
              type='password'
              placeholder='Choose password'
              name='password'
              value={password}
              onChange={onChange}
            ></input>
            <input
              type='password'
              placeholder='Confirm password'
              name='password2'
              value={password2}
              onChange={onChange}
            ></input>
            <button type='submit' className='btn-form'>
              Sign Up
            </button>
            <div className='sign-in'>
              <h3>Already have an account?</h3>{' '}
              <a href='/signin'>&nbsp;Sign In</a>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default SignUp;
