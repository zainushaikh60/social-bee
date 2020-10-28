import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/auth/authContext';
import UserContext from '../context/user/userContext';
import FriendCard from '../layout/FriendCard';
import NotificationCard from '../layout/NotificationCard';
import UserCard from '../layout/UserCard';
import { useMediaQuery } from 'react-responsive';

const Navbar = ({
  onClick,
  profile,
  onSetLayout,
  onSetSideMenu,
  sideMenu,
  fnLayout,
  unreadNotifications,
  readAllNotifications,
}) => {
  const authContext = useContext(AuthContext);
  const userContext = useContext(UserContext);

  const hideSidebar = useMediaQuery({ query: '(min-width: 1200px)' });

  const { logout, user } = authContext;

  const {
    users,
    profilePicture,
    friends,
    notifications,
    removeNotification,
  } = userContext;

  const onLogout = () => {
    logout();
  };

  const [sideFriends, setSideFriends] = useState(false);
  const [sideNotifications, setSideNotifications] = useState(false);
  const [sideUsers, setSideUsers] = useState(false);

  const onSetSideFriends = () => {
    setSideFriends((sideFriends) => !sideFriends);
  };

  const onSetSideNotifications = () => {
    setSideNotifications((sideNotifications) => !sideNotifications);
  };

  const onSetSideUsers = () => {
    setSideUsers((sideUsers) => !sideUsers);
  };

  useEffect(() => {
    {
      hideSidebar && sideMenu === true && onSetSideMenu();
    }
  }, [hideSidebar]);

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
        </div>
      ) : (
        <div className='center-menu-container'>
          <Link to='/' className='active'>
            <i className='fas fa-home'></i>
          </Link>
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
            <i className='far fa-bell'></i>
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
              <i className='far fa-bell notification-bell'>
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
            <i className='fas fa-user-friends'></i> Friends
          </a>
        ) : (
          fnLayout && (
            <a className='in-active' onClick={onSetLayout}>
              <i className='fas fa-user-friends'></i> Friends
            </a>
          )
        )}

        <a className='in-active' onClick={onLogout}>
          <i className='fas fa-sign-out-alt'></i> Sign Out
        </a>
      </div>

      <a className='hamburger' onClick={onSetSideMenu}>
        <i className='fas fa-bars'></i>
      </a>

      {sideMenu ? (
        <div className='side-menu'>
          <a
            className='close-sidemenu'
            onClick={() => {
              onSetSideMenu();
            }}
          >
            <i className='fas fa-times'></i>
          </a>

          <div className='side-menu-user-info'>
            <Link to='/my-profile' className='in-active' onClick={onClick}>
              <img
                src={
                  user && profilePicture === null ? user.avatar : profilePicture
                }
                className='user-img sidebar-user-img'
              />
              {user && user.name}
            </Link>
          </div>

          <Link
            to='/'
            className='in-active sidemenu-logout'
            onClick={onSetSideMenu}
          >
            <i className='fas fa-home'></i>
            Home
          </Link>

          <a className='in-active sidemenu-logout' onClick={onLogout}>
            <i className='fas fa-sign-out-alt'></i> Sign Out
          </a>

          <div
            className='side-menu-user-friends-toggle'
            onClick={onSetSideFriends}
          >
            <a>Friends ({friends && friends.length})</a>
            <a>
              <i
                className={sideFriends ? 'fas fa-caret-up' : 'fas fa-sort-down'}
              ></i>
            </a>
          </div>

          {sideFriends && (
            <div className='side-menu-user-friends'>
              {friends && friends.length === 0 && (
                <p className='no-update'>No friends</p>
              )}

              {friends &&
                friends.length > 0 &&
                friends.map((friend) => (
                  <FriendCard key={friend._id} friend={friend} />
                ))}
            </div>
          )}

          <div
            className='side-menu-user-friends-toggle'
            onClick={onSetSideNotifications}
          >
            <a>Notifications ({unreadNotifications && unreadNotifications})</a>
            <a>
              <i
                className={
                  sideNotifications ? 'fas fa-caret-up' : 'fas fa-sort-down'
                }
              ></i>
            </a>
          </div>

          {sideNotifications && (
            <div
              className='side-menu-user-friends'
              onClick={() => {
                unreadNotifications &&
                  unreadNotifications > 0 &&
                  readAllNotifications();
              }}
            >
              {notifications && notifications.length === 0 && (
                <p className='no-update'>No notifications</p>
              )}

              {notifications &&
                notifications.length > 0 &&
                notifications.map((notification) => (
                  <NotificationCard
                    key={notification._id}
                    notification={notification}
                    removeNotification={removeNotification}
                  />
                ))}
            </div>
          )}
          <div
            className='side-menu-user-friends-toggle'
            onClick={onSetSideUsers}
          >
            <a>
              Other Users (
              {users &&
                users.filter((currentUser) => currentUser._id !== user._id)
                  .length}
              )
            </a>
            <a>
              <i
                className={sideUsers ? 'fas fa-caret-up' : 'fas fa-sort-down'}
              ></i>
            </a>
          </div>

          {sideUsers && (
            <div className='side-menu-user-friends'>
              {user &&
              users.length > 0 &&
              users.filter((currentUser) => currentUser._id !== user._id)
                .length === 0 ? (
                <p className='no-update'>No other users</p>
              ) : (
                user &&
                users
                  .filter((currentUser) => currentUser._id !== user._id)
                  .map((currentUser) => (
                    <UserCard key={currentUser._id} currentUser={currentUser} />
                  ))
              )}
            </div>
          )}
        </div>
      ) : (
        <></>
      )}
    </nav>
  );
};

export default Navbar;
