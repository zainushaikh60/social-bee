import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/auth/authContext';
import UserContext from '../context/user/userContext';

const Navbar = ({
  onClick,
  profile,
  onSetLayout,
  fnLayout,
  unreadNotifications,
  readAllNotifications,
}) => {
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

      {profile ? (
        <div className='center-menu-container center-menu-container-cancel-margin'>
          <Link to='/' className='in-active' onClick={onClick}>
            <i className='fas fa-home'></i>
          </Link>

          <a href='#!' className='in-active'>
            <i class='fab fa-facebook-messenger'></i>
          </a>
        </div>
      ) : (
        <div className='center-menu-container'>
          <Link to='/' className='active'>
            <i className='fas fa-home'></i>
          </Link>

          <a href='#!' className='in-active'>
            <i class='fab fa-facebook-messenger'></i>
          </a>
        </div>
      )}

      <div className='right-menu-container'>
        <Link to='/my-profile' className='in-active' onClick={onClick}>
          <img
            src={user && profilePicture === null ? user.avatar : profilePicture}
            className='user-img'
          />
          {user && user.name}
        </Link>

        {fnLayout ? (
          <a className='active'>
            <i class='far fa-bell'></i>
            Notifications
          </a>
        ) : (
          !fnLayout && (
            <a
              className='in-active'
              onClick={() => {
                onSetLayout();

                {
                  unreadNotifications &&
                    unreadNotifications > 0 &&
                    readAllNotifications();
                }
              }}
            >
              <i class='far fa-bell notification-bell'>
                {unreadNotifications && unreadNotifications > 0 ? (
                  <p className='notification-length'>{unreadNotifications}</p>
                ) : (
                  <></>
                )}
              </i>
              Notifications
            </a>
          )
        )}

        {!fnLayout ? (
          <a className='active'>
            <i class='fas fa-user-friends'></i> Friends
          </a>
        ) : (
          fnLayout && (
            <a className='in-active' onClick={onSetLayout}>
              <i class='fas fa-user-friends'></i> Friends
            </a>
          )
        )}

        <a className='in-active' onClick={onLogout}>
          <i className='fas fa-sign-out-alt'></i> Sign Out
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
