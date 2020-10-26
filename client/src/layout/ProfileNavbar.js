import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/auth/authContext';
import UserContext from '../context/user/userContext';

const ProfileNavbar = () => {
  const authContext = useContext(AuthContext);
  const userContext = useContext(UserContext);

  const { logout, user } = authContext;
  const { profilePicture } = userContext;

  const onLogout = () => {
    logout();
  };

  return (
    <nav>
      <div className='right-side-container'>
        <Link to='/' className='logo'>
          <img src='/images/bee.svg' /> Social Bee
        </Link>
      </div>

      <div className='center-menu-container center-menu-container-cancel-margin'>
        <Link to='/' className='in-active'>
          <i className='fas fa-home'></i>
        </Link>
      </div>

      <div className='right-menu-container'>
        <Link to='/my-profile' className='in-active'>
          <img
            src={
              user && profilePicture === null
                ? user.avatar
                : `/${profilePicture}`
            }
            className='user-img'
          />
          {user && user.name}
        </Link>

        <a href='#!' className='in-active' onClick={onLogout}>
          <i className='fas fa-sign-out-alt'></i> Sign Out
        </a>
      </div>
    </nav>
  );
};

export default ProfileNavbar;
