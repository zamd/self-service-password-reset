import React, { Component } from 'react';
import Home from './containers/Home'
import Enrolment from './containers/Enrolment'
import NotFound from './containers/NotFound'
import ChangePassword from './containers/ChangePassword'
import ResetPassword from './containers/ResetPassword'
import Auth0Auth from './containers/Auth0Auth'
import { Route, Switch } from 'react-router-dom'

export default () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/enrolment" component={Enrolment} />
    <Route path="/change-password" component={ChangePassword} />
    <Route path="/reset-password" component={ResetPassword} />

    <Route path='/login' component={Auth0Auth} />
    <Route path='/logout' component={Auth0Auth} />
    <Route path='/callback' component={Auth0Auth} />
    
    <Route component={NotFound} />
  </Switch>
)