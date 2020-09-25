import React, { Fragment } from 'react';

const SignUp = () => {
  return (
    <Fragment>
      <div className='signup-page'>
        <div className='heading-container'>
          <h1>Make Friends & Enjoy</h1>
        </div>

        <div className='form-container'>
          <form className='form'>
            <div className='form-header'>
              <a href='#!' className='form-logo'>
                <img src='/images/bee-blue.svg' /> Social Bee&nbsp;|
              </a>
              <h4 className='form-logo'>&nbsp;Sign Up</h4>
            </div>
            <input type='text' placeholder='Name' />
            <input type='email' placeholder='Email'></input>
            <input type='password' placeholder='Choose password'></input>
            <input type='password' placeholder='Confirm password'></input>
            <button className='btn-form'>Sign Up</button>
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
