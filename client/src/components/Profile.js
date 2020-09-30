import React, { Fragment, useContext, useState, useEffect } from 'react';
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
              <button
                className='btn btn-primary btn-upload'
                onClick={onUploadCoverPhoto}
              >
                Upload Selected Cover Photo
              </button>
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
        </div>
      </div>
    </Fragment>
  );
};

export default Profile;
