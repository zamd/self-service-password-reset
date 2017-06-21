import * as constants from '../constants';
import {push} from 'react-router-redux'
import jwtDecode from 'jwt-decode';

export const changePassword = (oldPassword, newPassword, newPasswordConfirm, idToken) => {
  return dispatch => {
    if (newPassword !== newPasswordConfirm) 
      return dispatch({type: constants.LOG_PASSWORD_ERROR, error: {description: 'New and Confirm password do not match.'}});

    dispatch({type: constants.PASSWORD_CHANGE_REQUESTED})

    const url = `https://${process.env.REACT_APP_domain}/dbconnections/self_change_password`;
    const claims = jwtDecode(idToken);
    
    const payload = {
      connection: claims['https://selfserviceportal/realm'],
      client_id: claims.aud,
      username: claims.email,
      old_password: oldPassword,
      new_password: newPassword
    }

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }).then(res => {
      if (res.status === 204) {
        dispatch({type: constants.PASSWORD_CHANGE_COMPLETED, message: 'Password changed.'});
      }
      else 
        handlePasswordChangeError(res, dispatch);
      }
    ).catch(err => handlePasswordChangeError(err, dispatch))
  }
}

export const resetPassword = (username, newPassword) => {
  return dispatch => {}
}

export const clearAlert = (username, newPassword) => {
  return dispatch => {
    dispatch({type: constants.CLEAR_PASSWORD_ALERT});

  }
}



function getErrorMessage(errorOrResponse) {
  return new Promise((resolve,reject)=>{
    const {status} = errorOrResponse;
    if (status==401) {
      errorOrResponse.json()
      .then(payload=>resolve({description: payload.error_description}))
    }
    else if(status) {
      resolve({description: `Failed with response code: ${status}`});
    }
    else {
      resolve({description:errorOrResponse.toString()});
    }
  });
}

const handlePasswordChangeError = (errorOrResponse, dispatch) => {
  getErrorMessage(errorOrResponse)
  .then(error=>dispatch({type: constants.LOG_PASSWORD_ERROR, error}))
}