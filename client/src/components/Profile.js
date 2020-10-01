import React, { Fragment, useContext, useState } from 'react';
import AuthContext from '../context/auth/authContext';
import UserContext from '../context/user/userContext';

const Profile = () => {
  const authContext = useContext(AuthContext);
  const userContext = useContext(UserContext);

  const { user } = authContext;

  const {
    profilePicture,
    cover,
    uploadProfilePicture,
    uploadCoverPhoto,
  } = userContext;

  const coverInitialState = null;
  const profilePictureInitialState = null;

  const [profilePhoto, setProfilePhoto] = useState(profilePictureInitialState);
  const [coverPhoto, setCoverPhoto] = useState(coverInitialState);

  const onUploadProfilePicture = () => {
    setProfilePhoto(profilePictureInitialState);
    uploadProfilePicture(profilePhoto);
  };

  const onUploadCoverPhoto = () => {
    setCoverPhoto(coverInitialState);
    uploadCoverPhoto(coverPhoto);
  };

  return (
    <Fragment>
      <div className='profile'>
        <div className='profile-info'>
          {user && cover === null && coverPhoto === null && (
            <div className='no-cover'>
              <input
                type='file'
                name='cover-photo'
                id='cover-photo'
                accept='.jpg, .jpeg, .png'
                onChange={(e) => setCoverPhoto(e.target.files[0])}
              />

              <label for='cover-photo' className='btn btn-primary btn-upload'>
                Add Cover Photo
              </label>
            </div>
          )}

          {user && cover === null && coverPhoto !== null && (
            <div className='no-cover'>
              <label
                className='btn btn-primary btn-upload'
                onClick={onUploadCoverPhoto}
              >
                Upload Selected Cover Photo
              </label>
            </div>
          )}

          {user && cover !== null && coverPhoto === null && (
            <div className='profile-cover'>
              <a href='#!'>
                <img src={user && cover} />
              </a>

              <label for='cover-photo' className='btn btn-primary'>
                Change Cover Photo
              </label>

              <input
                type='file'
                name='cover-photo'
                id='cover-photo'
                accept='.jpg, .jpeg, .png'
                onChange={(e) => setCoverPhoto(e.target.files[0])}
              />
            </div>
          )}

          {user && cover !== null && coverPhoto !== null && (
            <div className='profile-cover'>
              <a href='#!'>
                <img src={user && cover} />
              </a>
              <label className='btn btn-primary' onClick={onUploadCoverPhoto}>
                Upload Selected Cover Photo
              </label>
            </div>
          )}

          {user && profilePicture === null && (
            <div className='profile-picture'>
              <a href='#!'>
                <img src={user.avatar} />
              </a>
            </div>
          )}

          {user && profilePicture !== null && (
            <div className='profile-picture'>
              <a href='#!'>
                <img src={profilePicture} />
              </a>
            </div>
          )}

          {user && profilePicture === null && profilePhoto === null && (
            <div className='profile-user'>
              <label for='profile-photo' className='btn btn-primary'>
                Add Profile Picture
              </label>

              <input
                type='file'
                name='profile-photo'
                id='profile-photo'
                accept='.jpg, .jpeg, .png'
                onChange={(e) => setProfilePhoto(e.target.files[0])}
              />

              <h3>{user && user.name}</h3>
            </div>
          )}

          {user && profilePicture === null && profilePhoto !== null && (
            <div className='profile-user'>
              <label
                className='btn btn-primary'
                onClick={onUploadProfilePicture}
              >
                Upload Selected Profile Picture
              </label>

              <h3>{user && user.name}</h3>
            </div>
          )}

          {user && profilePicture !== null && profilePhoto === null && (
            <div className='profile-user'>
              <label for='profile-photo' className='btn btn-primary'>
                Change Profile Picture
              </label>

              <input
                type='file'
                name='profile-photo'
                id='profile-photo'
                accept='.jpg, .jpeg, .png'
                onChange={(e) => setProfilePhoto(e.target.files[0])}
              />

              <h3>{user && user.name}</h3>
            </div>
          )}

          {user && profilePicture !== null && profilePhoto !== null && (
            <div className='profile-user'>
              <label
                className='btn btn-primary'
                onClick={onUploadProfilePicture}
              >
                Upload Selected Profile Picture
              </label>

              <h3>{user && user.name}</h3>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Profile;
