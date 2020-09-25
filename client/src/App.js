import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Alerts from './layout/Alerts';
import Home from './components/Home';
import Profile from './components/Profile';

import './App.css';

function App() {
  return (
    <AuthState>
      <AlertState>
        <Router>
          <Fragment>
            <Alerts />
            <Switch>
              <Route exact path='/signup' component={SignUp} />
              <Route exact path='/signin' component={SignIn} />
              <Route exact path='/' component={Home} />
              <Route exact path='/profile' component={Profile} />
            </Switch>
          </Fragment>
        </Router>
      </AlertState>
    </AuthState>
  );
}

export default App;
