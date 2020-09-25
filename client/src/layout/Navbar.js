import React from 'react';

const Navbar = () => {
  return (
    <nav>
      <div className='right-side-container'>
        <a href='/' className='logo'>
          <img src='/images/bee.svg' /> Social Bee
        </a>
      </div>

      <div className='center-menu-container'>
        <a href='/' className='active'>
          <i className='fas fa-home'></i>
        </a>
        <a href='#!' className='in-active'>
          <i class='fab fa-facebook-messenger'></i>
        </a>
      </div>

      <div className='right-menu-container'>
        <a href='/profile' className='in-active'>
          <img src='/images/zain.jpg' className='user-img' />
          Zain
        </a>

        <a href='#!' className='in-active'>
          <i class='far fa-bell'></i> Notifications
        </a>

        <a href='#!' className='active'>
          <i class='fas fa-user-friends'></i> Friends
        </a>

        <a href='#!' className='in-active'>
          <i className='fas fa-sign-out-alt'></i> Sign Out
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
