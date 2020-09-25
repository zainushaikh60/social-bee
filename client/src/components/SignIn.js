import React, { Fragment, useState } from 'react';

const SignIn = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const { email, password } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('Login Submit');
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
