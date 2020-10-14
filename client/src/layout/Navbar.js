import React, { useContext } from 'react';
import AuthContext from '../context/auth/authContext';
import UserContext from '../context/user/userContext';

const Navbar = ({
  onClick,
  profile,
  onSetLayout,
  fnLayout,
  notifications,
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
        <a href='/' className='logo'>
          <img src='/images/bee.svg' /> Social Bee
        </a>
      </div>

      {profile ? (
        <div className='center-menu-container center-menu-container-cancel-margin'>
          <a href='#!' className='in-active' onClick={onClick}>
            <i className='fas fa-home'></i>
          </a>

          <a href='#!' className='in-active'>
            <i class='fab fa-facebook-messenger'></i>
          </a>
        </div>
      ) : (
        <div className='center-menu-container'>
          <a href='#!' className='active'>
            <i className='fas fa-home'></i>
          </a>

          <a href='#!' className='in-active'>
            <i class='fab fa-facebook-messenger'></i>
          </a>
        </div>
      )}

      <div className='right-menu-container'>
        {profile ? (
          <a href='#!' className='active'>
            <img
              src={
                user && profilePicture === null ? user.avatar : profilePicture
              }
              className='user-img'
            />
            {user && user.name}
          </a>
        ) : (
          <a href='/my-profile' className='in-active' onClick={onClick}>
            <img
              src={
                user && profilePicture === null ? user.avatar : profilePicture
              }
              className='user-img'
            />
            {user && user.name}
          </a>
        )}

        {!profile ? (
          fnLayout ? (
            <a href='#!' className='active'>
              <i class='far fa-bell'></i>
              Notifications
            </a>
          ) : (
            !fnLayout && (
              <a
                href='#!'
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
          )
        ) : (
          <></>
        )}

        {!profile ? (
          !fnLayout ? (
            <a href='#!' className='active'>
              <i class='fas fa-user-friends'></i> Friends
            </a>
          ) : (
            fnLayout && (
              <a href='#!' className='in-active' onClick={onSetLayout}>
                <i class='fas fa-user-friends'></i> Friends
              </a>
            )
          )
        ) : (
          <></>
        )}

        <a href='#!' className='in-active' onClick={onLogout}>
          <i className='fas fa-sign-out-alt'></i> Sign Out
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
