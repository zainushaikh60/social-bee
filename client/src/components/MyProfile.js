import React, { Fragment, useContext, useState, useEffect } from 'react';
import AuthContext from '../context/auth/authContext';
import UserContext from '../context/user/userContext';
import AlertContext from '../context/alert/alertContext';
import AddPost from '../layout/AddPost';
import MyPosts from '../layout/MyPosts';
import MyProfileNavbar from '../layout/MyProfileNavbar';
import { Link } from 'react-router-dom';

const MyProfile = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
    deleteProfilePicture,
    deleteCoverPhoto,
  } = userContext;

  const maxAllowedSize = 5 * 1024 * 1024;

  const coverInitialState = null;
  const profilePictureInitialState = null;

  const [profilePhoto, setProfilePhoto] = useState(profilePictureInitialState);
  const [coverPhoto, setCoverPhoto] = useState(coverInitialState);
  const [profileModal, showProfileModal] = useState(false);
  const [coverModal, showCoverModal] = useState(false);

  const onUploadProfilePicture = () => {
    setProfilePhoto(profilePictureInitialState);
    uploadProfilePicture(profilePhoto);
  };

  const onUploadCoverPhoto = () => {
    setCoverPhoto(coverInitialState);
    uploadCoverPhoto(coverPhoto);
  };

  const showPModal = () => {
    showProfileModal((profileModal) => !profileModal);
    document.body.style.overflow = 'hidden';
  };

  const showCModal = () => {
    showCoverModal((coverModal) => !coverModal);
    document.body.style.overflow = 'hidden';
  };

  const overFlow = () => {
    document.body.style.overflow = 'scroll';
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
      <MyProfileNavbar />
      <div className='wrapper'>
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
                {coverModal && (
                  <div className='modal'>
                    <div className='modal-layout'>
                      <div className='modal-header'>
                        <div></div>
                        <h3>Delete Cover Photo?</h3>
                        <Link
                          onClick={() => {
                            showCModal();
                            overFlow();
                          }}
                        >
                          <i class='fas fa-times'></i>
                        </Link>
                      </div>
                      <div className='modal-btns'>
                        <button
                          className='btn btn-primary'
                          onClick={() => {
                            showCModal();
                            deleteCoverPhoto();
                            overFlow();
                          }}
                        >
                          Confirm
                        </button>
                        <button
                          className='btn btn-primary'
                          onClick={() => {
                            showCModal();
                            overFlow();
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <a>
                  <img src={user && cover} />
                </a>

                <label
                  for='cover-photo'
                  className='btn btn-primary change-cover'
                >
                  Change Cover Photo
                </label>

                <label className='btn btn-primary' onClick={showCModal}>
                  Delete Cover Photo
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
                <a>
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
                <a>
                  <img
                    src={
                      profilePhoto === null
                        ? user.avatar
                        : profilePicturePreview
                    }
                    className={
                      profilePhoto !== null
                        ? 'profile-picture-preview'
                        : undefined
                    }
                  />
                </a>
              </div>
            )}

            {user && profilePicture !== null && (
              <div
                className={
                  profilePhoto === null
                    ? 'profile-picture'
                    : 'profile-picture profile-picture-overlay'
                }
              >
                <a>
                  <img
                    src={
                      profilePhoto === null
                        ? profilePicture
                        : profilePicturePreview
                    }
                    className={
                      profilePhoto !== null
                        ? 'profile-picture-preview'
                        : undefined
                    }
                  />
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
                <div className='upload-profile-picture-cancel'>
                  <label
                    className='btn btn-primary'
                    onClick={onUploadProfilePicture}
                  >
                    Upload
                  </label>

                  <label
                    className='btn btn-primary'
                    onClick={() => setProfilePhoto(profilePictureInitialState)}
                  >
                    Cancel
                  </label>
                </div>

                <h3>{user && user.name}</h3>
              </div>
            )}

            {user && profilePicture !== null && profilePhoto === null && (
              <div className='profile-user'>
                {profileModal && (
                  <div className='modal'>
                    <div className='modal-layout'>
                      <div className='modal-header'>
                        <div></div>
                        <h3>Delete Profile Picture?</h3>
                        <a
                          onClick={() => {
                            showPModal();
                            overFlow();
                          }}
                        >
                          <i class='fas fa-times'></i>
                        </a>
                      </div>
                      <div className='modal-btns'>
                        <button
                          className='btn btn-primary'
                          onClick={() => {
                            showPModal();
                            deleteProfilePicture();
                            overFlow();
                          }}
                        >
                          Confirm
                        </button>
                        <button
                          className='btn btn-primary'
                          onClick={() => {
                            showPModal();
                            overFlow();
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <div className='change-delete-profile-picture'>
                  <label for='profile-photo' className='btn btn-primary'>
                    Change Profile Picture
                  </label>
                  <label className='btn btn-primary' onClick={showPModal}>
                    Delete Profile Picture
                  </label>
                </div>

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
                <div className='upload-profile-picture-cancel'>
                  <label
                    className='btn btn-primary'
                    onClick={onUploadProfilePicture}
                  >
                    Change
                  </label>

                  <label
                    className='btn btn-primary'
                    onClick={() => setProfilePhoto(profilePictureInitialState)}
                  >
                    Cancel
                  </label>
                </div>

                <h3>{user && user.name}</h3>
              </div>
            )}
          </div>
          <div className='container'>
            <AddPost />
            <MyPosts />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default MyProfile;
