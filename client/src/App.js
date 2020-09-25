import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Home from './components/Home';
import './App.css';
import Profile from './components/Profile';

function App() {
  return (
    <Router>
      <Fragment>
        <Route exact path='/signup' component={SignUp} />
        <Route exact path='/signin' component={SignIn} />
        <Route exact path='/' component={Home} />
        <Route exact path='/profile' component={Profile} />
      </Fragment>
    </Router>
  );
}

export default App;
