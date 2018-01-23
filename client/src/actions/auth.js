import * as constants from '../constants';
import { push } from 'react-router-redux'
import jwtDecode from 'jwt-decode';

export const login = (auth0) => {
  return dispatch => {
    dispatch({
      type: constants.LOGIN_STARTED
    })

    auth0.authorize({scope: 'openid email profile read:enrolment create:enrolment update:enrolment reset:password change:password delete:enrolment'});
  }
}

export const loginSuccess = (authResult) => {
  return dispatch => {
    const { accessToken, idToken, expiresIn } = authResult; 
    const profile = jwtDecode(idToken);
    
    let { scope } = authResult;
    if(!scope){
      scope = profile['https://selfserviceportal/scope'];
    }

    
    const expiresAt = JSON.stringify((expiresIn * 1000) + new Date().getTime());

    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('id_token', idToken);
    localStorage.setItem('scope',  JSON.stringify(scope));
    localStorage.setItem('expires_at', expiresAt);
    localStorage.setItem('profile', JSON.stringify(profile));

    dispatch({
      type: constants.LOGIN_COMPLETED,
      payload: {
        accessToken, 
        idToken,
        scope,
        expiresIn,
        profile
      }
    });
    dispatch(push('/'));
  }
}

export const loginFailed = (error) => {
  return dispatch => {
    dispatch({
      type: constants.LOGIN_FAILED,
      payload: error
    });
    dispatch(push('/'));
  }
}

export const logout = () => {
  return dispatch => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('scope');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('profile');
    dispatch({
      type: constants.LOGOUT
    })
    dispatch(push('/login'));
  }
}