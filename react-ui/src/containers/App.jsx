import React, {Component} from 'react';
import Sidebar from '../components/Sidebar'
import EnsureLoggedIn from './EnsureLoggedIn'
import Routes from '../routes';

import css from './app.css'

const App = () => (
  <EnsureLoggedIn>
    <div className="auth0-react-styleguide">
      <Sidebar/>

      <div className="styleguide-content">
        <Routes/>
      </div>
    </div>
  </EnsureLoggedIn>
)

export default App;