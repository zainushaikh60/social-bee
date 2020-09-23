import React from 'react';

const Navbar = () => {
  return (
    <nav>
      <div className='logo-container'>
        <a href='#!' className='logo'>
          <img src='/images/bee.svg'></img>
          <h1>Social Bee</h1>
        </a>
      </div>

      <div className='left-menu-container'>
        <a href='#!'>
          <img src='/images/zain.jpg' className='user-img' /> Zain
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
