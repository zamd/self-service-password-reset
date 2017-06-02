import React, { Component } from 'react';
import Home from '../Home'
import About from '../About'
import NotFound from '../NotFound'
import Sidebar from '../../components/Sidebar'
import { Route, Switch } from 'react-router-dom'

import css from './app.css'

class App extends Component {

  render() {
    return (
      <div className="auth0-react-styleguide">
        <Sidebar />

        <div className="styleguide-content">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about-us" component={About} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
    )
  }
}


export default App;