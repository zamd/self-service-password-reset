import * as constants from '../constants';
import { push } from 'react-router-redux'

export const login = (auth0) => {
  return dispatch => {
    dispatch({
      type: constants.LOGIN_STARTED
    })

    auth0.authorize({scope: 'openid read:enrolment create:enrolment update:enrolment reset:password change:password delete:enrolment'});
  }
}

export const loginSuccess = (authResult) => {
  return dispatch => {

    const {accessToken, idToken, scope, expiresIn} = authResult; 
    const expiresAt = JSON.stringify((expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('id_token', idToken);
    localStorage.setItem('scope', scope);
    localStorage.setItem('expires_at', expiresAt);
    
    dispatch({
      type: constants.LOGIN_COMPLETED,
      payload: {
        accessToken, 
        idToken,
        scope,
        expiresIn
      }
    })
    dispatch(push('/'));
  }
}

export const loginFailed = (error) => {
  return dispatch => {
    dispatch({
      type: constants.LOGIN_FAILED,
      error
    })
  }
}

export const logout = () => {
  return dispatch => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('scope');
    localStorage.removeItem('expires_at');

    dispatch({
      type: constants.LOGOUT
    })
    dispatch(push('/login'));
  }
}