import React from 'react';
import { Route, Link } from 'react-router-dom'
import Home from '../Home'
import About from '../About'
import Header from '../../components/Header'

export default () => (
  <div>
    <Header />

    <div>
      <Route exact path="/" component={Home} />
      <Route exact path="/about-us" component={About} />
    </div>
  </div>
)