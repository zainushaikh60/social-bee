import React, { useContext, useState } from 'react';
import AuthContext from '../context/auth/authContext';

const Navbar = ({ onClick }) => {
  const authContext = useContext(AuthContext);

  const { logout, user } = authContext;

  const onLogout = () => {
    logout();
  };

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
        <a href='#!' className='in-active' onClick={onClick}>
          <img src={user && user.avatar} className='user-img' />
          {user && user.name}
        </a>

        <a href='#!' className='in-active'>
          <i class='far fa-bell'></i> Notifications
        </a>

        <a href='#!' className='active'>
          <i class='fas fa-user-friends'></i> Friends
        </a>

        <a href='#!' className='in-active' onClick={onLogout}>
          <i className='fas fa-sign-out-alt'></i> Sign Out
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
