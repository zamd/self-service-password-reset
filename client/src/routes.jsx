import React, { Component } from 'react';
import Home from './containers/Home'
import Enrolment from './containers/Enrolment'
import NotFound from './containers/NotFound'
import ChangePassword from './containers/ChangePassword'
import ResetPassword from './containers/ResetPassword'
import { Route, Switch } from 'react-router-dom'

export default () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/enrolment" component={Enrolment} />
    <Route path="/change-password" component={ChangePassword} />
    <Route path="/reset-password" component={ResetPassword} />
    
    <Route component={NotFound} />
  </Switch>
)