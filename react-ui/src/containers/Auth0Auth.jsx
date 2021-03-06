import React, { Component } from "react";
import { connect } from "react-redux";

import { authActions } from "../actions";
import auth0 from "auth0-js";
import Login from "../components/Login";
import Logout from "../components/Logout";
import MessageAlert from "../components/MessageAlert";

class Auth0Auth extends Component {
  constructor(props) {
    super(props);

    this.auth0 = new auth0.WebAuth({
      domain: process.env.REACT_APP_domain,
      clientID: process.env.REACT_APP_clientID,
      redirectUri: process.env.REACT_APP_redirectUri,
      audience: process.env.REACT_APP_audience,
      responseType: "token id_token",
      scope: "openid"
    });
  }
  componentDidMount() {
    const { loginFailed, loginSuccess, isAuthenticated } = this.props;

    if (!isAuthenticated) {
      this.auth0.parseHash((err, authResult) => {
        if (err) {
          return loginFailed(err);
        }
        if (authResult) {
          loginSuccess(authResult);
        }
      });
    }
  }

  render() {
    const { isAuthenticated, login, error } = this.props;
    if (isAuthenticated) {
      return <Logout {...this.props} />
    }
    else {
      return (
        <div>
          {error && <section className="react-component-page"> <MessageAlert errorMessage={error} />  </section>}
          <Login {...{ ...this.props, login: () => login(this.auth0) }} />
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  let { inProgress, accessToken, error } = state.auth.toJS();
  inProgress = inProgress || state.routing.location.pathname === "/callback";
  return { inProgress, isAuthenticated: accessToken, error };
};

export default connect(mapStateToProps, authActions)(Auth0Auth);
