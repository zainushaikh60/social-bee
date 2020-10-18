import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute';
import AuthState from './context/auth/AuthState';
import UserState from './context/user/UserState';
import PostState from './context/post/PostState';
import AlertState from './context/alert/AlertState';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Alerts from './layout/Alerts';
import Home from './components/Home';
import Profile from './components/Profile';
import MyProfile from './components/MyProfile';
import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <AuthState>
      <UserState>
        <PostState>
          <AlertState>
            <Router>
              <Fragment>
                <Alerts />
                <Switch>
                  <Route exact path='/signup' component={SignUp} />
                  <Route exact path='/signin' component={SignIn} />
                  <PrivateRoute exact path='/' component={Home} />
                  <PrivateRoute
                    exact
                    path='/my-profile'
                    component={MyProfile}
                  />
                  <PrivateRoute exact path='/profile/:id' component={Profile} />
                </Switch>
              </Fragment>
            </Router>
          </AlertState>
        </PostState>
      </UserState>
    </AuthState>
  );
}

export default App;
