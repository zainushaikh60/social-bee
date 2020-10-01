import React, { Fragment, useState, useContext, useEffect } from 'react';
import AlertContext from '../context/alert/alertContext';
import AuthContext from '../context/auth/authContext';

const SignIn = (props) => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { login, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }
    if (error === 'Invalid Credentials') {
      setAlert(error, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const { email, password } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      setAlert('Please enter all fields', 'danger', 'info-circle');
    } else {
      login({
        email,
        password,
      });
    }
  };

  return (
    <Fragment>
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
                <h4 className='form-logo'>&nbsp;Sign In</h4>
              </div>

              <input
                type='email'
                placeholder='Enter your email'
                name='email'
                value={email}
                onChange={onChange}
              ></input>
              <input
                type='password'
                placeholder='Enter your assword'
                name='password'
                value={password}
                onChange={onChange}
              ></input>

              <button className='btn-form'>Sign In</button>
              <div className='sign-in'>
                <h3>Don't have an account?</h3>{' '}
                <a href='/signup'>&nbsp;Sign Up</a>
              </div>
            </form>
          </div>
        </div>
      </Fragment>
    </Fragment>
  );
};

export default SignIn;
