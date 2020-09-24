import React from 'react';

const Navbar = () => {
  return (
    <nav>
      <div className='right-side-container'>
        <a href='#!' className='logo'>
          <img src='/images/bee.svg' /> Social Bee
        </a>
      </div>

      <div className='right-menu-container'>
        <a href='#!'>
          <img src='/images/zain.jpg' className='user-img' />
          Zain
        </a>
        <a href='#!'>
          <i className='fas fa-home'></i> Home
        </a>
        <a href='#!'>
          <i className='fas fa-sign-out-alt'></i> Sign Out
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
