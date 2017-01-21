import React from 'react';
import { IndexRoute, Route, Router, browserHistory } from 'react-router';

  
import Main from '../components/Main';
import FirstPage from '../components/FirstPage';
import SigninPage from '../components/signin/SigninPage'
import RegisterPage from '../components/register/RegisterPage'

module.exports = (
  <Router history={browserHistory}>
    <Route path="/" component={Main}>
  	<IndexRoute	component={FirstPage} />
  	<Route path="signin" component={SigninPage} />
  	<Route path="register" component={RegisterPage} />
    </Route>
  </Router>
);
