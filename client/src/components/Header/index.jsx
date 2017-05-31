import React from 'react';
import { Link } from 'react-router-dom'

export default () => (
  <header className="site-header">
    <nav className="navbar navbar-default" role="navigation">
      <div className="container">
        <div className="navbar-header">
          <button className="navbar-toggle" type="button" data-toggle="collapse" data-target="#navbar-collapse">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span><span className="icon-bar"></span><span className="icon-bar"></span>
          </button>
          <h1 className="navbar-brand"><a href="/"><span>Auth0</span></a></h1>
        </div>
        <div className="collapse navbar-collapse" id="navbar-collapse">
          <ul className="nav navbar-nav navbar-left no-basic">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about-us">About</Link>
            </li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <li className="li-docs no-basic"><a href="#">Documentation</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
)