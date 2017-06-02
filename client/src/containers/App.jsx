import React, { Component } from 'react';
import Sidebar from '../components/Sidebar'
import Routes from '../routes';

import css from './app.css'

class App extends Component {

  render() {
    return (
      <div className="auth0-react-styleguide">
        <Sidebar />

        <div className="styleguide-content">
          <Routes />
        </div>
      </div>
    )
  }
}


export default App;