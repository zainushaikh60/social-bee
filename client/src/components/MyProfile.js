import React, { Fragment, useContext, useState } from 'react';
import AuthContext from '../context/auth/authContext';
import UserContext from '../context/user/userContext';
import AlertContext from '../context/alert/alertContext';

const MyProfile = () => {
  const authContext = useContext(AuthContext);
  const userContext = useContext(UserContext);
  const alertContext = useContext(AlertContext);

  const { user } = authContext;
  const { setAlert } = alertContext;

  const {
    profilePicture,
    cover,
    uploadProfilePicture,
    uploadCoverPhoto,
  } = userContext;

  const maxAllowedSize = 5 * 1024 * 1024;

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

  let profilePicturePreview = null;
  let coverPhotoPreview = null;

  if (profilePhoto && profilePhoto !== null) {
    profilePicturePreview = URL.createObjectURL(profilePhoto);
  }

  if (coverPhoto && coverPhoto !== null) {
    coverPhotoPreview = URL.createObjectURL(coverPhoto);
  }

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
                onChange={(e) =>
                  e.target.files && e.target.files[0].size > maxAllowedSize
                    ? (setAlert(
                        `Image file size should be less than 5 mb`,
                        'danger',
                        'info-circle'
                      ),
                      (e.target.value = ''))
                    : setCoverPhoto(e.target.files[0])
                }
              />

              <label for='cover-photo' className='btn btn-primary btn-upload'>
                Add Cover Photo
              </label>
            </div>
          )}

          {user && cover === null && coverPhoto !== null && (
            <div className='no-cover'>
              <img src={coverPhotoPreview} className='cover-preview'></img>

              <label
                className='btn btn-primary btn-upload btn-no-cover'
                onClick={onUploadCoverPhoto}
              >
                Upload
              </label>
              <label
                className='btn btn-primary btn-upload btn-no-cover'
                onClick={(e) => {
                  setCoverPhoto(coverInitialState);
                }}
              >
                Cancel
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
                onChange={(e) =>
                  e.target.files && e.target.files[0].size > maxAllowedSize
                    ? (setAlert(
                        `Image file size should be less than 5 mb`,
                        'danger',
                        'info-circle'
                      ),
                      (e.target.value = ''))
                    : setCoverPhoto(e.target.files[0])
                }
              />
            </div>
          )}

          {user && cover !== null && coverPhoto !== null && (
            <div className='profile-cover'>
              <a href='#!'>
                <img
                  src={coverPhoto !== null ? coverPhotoPreview : cover}
                  className={coverPhoto !== null && 'cover-preview'}
                />
              </a>
              <div className='label-container'></div>
              <label className='btn btn-primary' onClick={onUploadCoverPhoto}>
                Change
              </label>
              <label
                className='btn btn-primary upload-cover-cancel'
                onClick={(e) => {
                  setCoverPhoto(coverInitialState);
                }}
              >
                Cancel
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
                onChange={(e) =>
                  e.target.files && e.target.files[0].size > maxAllowedSize
                    ? (setAlert(
                        `Image file size should be less than 50 kb`,
                        'danger',
                        'info-circle'
                      ),
                      (e.target.value = ''))
                    : setProfilePhoto(e.target.files[0])
                }
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
                onChange={(e) =>
                  e.target.files && e.target.files[0].size > maxAllowedSize
                    ? (setAlert(
                        `Image file size should be less than 50 kb`,
                        'danger',
                        'info-circle'
                      ),
                      (e.target.value = ''))
                    : setProfilePhoto(e.target.files[0])
                }
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

export default MyProfile;
