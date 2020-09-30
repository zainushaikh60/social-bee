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
          {user && !cover ? (
            <div className='no-cover'>
              <label for='cover-photo' className='btn btn-primary btn-upload'>
                Add Cover Photo
              </label>

              <input
                type='file'
                name='cover-photo'
                id='cover-photo'
                accept='.jpg, .jpeg, .png'
                onChange={(e) => setCoverPhoto(e.target.files[0])}
              />

              {coverPhoto !== null && (
                <button
                  className='btn btn-primary btn-upload'
                  onClick={onUploadCoverPhoto}
                >
                  Upload
                </button>
              )}
            </div>
          ) : (
            <div className='profile-cover'>
              <a href='#!'>
                <img src={user && cover} />
              </a>

              {user && cover && (
                <div>
                  {coverPhoto === null ? (
                    <div>
                      <label for='cover-photo' className='btn btn-primary'>
                        Change Cover Photo
                      </label>
                      <input
                        type='file'
                        name='cover-photo'
                        id='cover-photo'
                        onChange={(e) => setCoverPhoto(e.target.files[0])}
                      />
                    </div>
                  ) : (
                    <label
                      for='cover-photo'
                      className='btn btn-primary'
                      onClick={onUploadCoverPhoto}
                    >
                      Upload Selected Cover Photo
                    </label>
                  )}
                </div>
              )}
            </div>
          )}

          <div className='profile-picture'>
            <a href='#!'>
              <img
                src={user && !profilePicture ? user.avatar : profilePicture}
              />
            </a>
          </div>

          <div className='profile-user'>
            {profilePhoto === null ? (
              <label for='profile-photo' className='btn btn-primary'>
                Change Profile Picture
              </label>
            ) : (
              <label
                className='btn btn-primary'
                onClick={onUploadProfilePicture}
              >
                Upload Selected Profile Picture
              </label>
            )}

            <input
              type='file'
              name='profile-photo'
              id='profile-photo'
              accept='.jpg, .jpeg, .png'
              onChange={(e) => setProfilePhoto(e.target.files[0])}
            />

            <h3>{user && user.name}</h3>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Profile;
