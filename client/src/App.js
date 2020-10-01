import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute';
import AuthState from './context/auth/AuthState';
import UserState from './context/user/UserState';
import AlertState from './context/alert/AlertState';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Alerts from './layout/Alerts';
import Home from './components/Home';
import MyProfile from './components/MyProfile';
import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <AuthState>
      <UserState>
        <AlertState>
          <Router>
            <Fragment>
              <Alerts />
              <Switch>
                <PrivateRoute exact path='/' component={Home} />
                <Route exact path='/signup' component={SignUp} />
                <Route exact path='/signin' component={SignIn} />
                <Route exact path='/my-profile' component={MyProfile} />
              </Switch>
            </Fragment>
          </Router>
        </AlertState>
      </UserState>
    </AuthState>
  );
}

export default App;
