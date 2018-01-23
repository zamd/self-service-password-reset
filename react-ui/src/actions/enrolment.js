import * as constants from '../constants';

export const enrollEmail = (email, accessToken) => {
  return dispatch => {
    dispatch({type: constants.EMAIL_ENROLMENT_REQUESTED})
    fetch(`/api/enrollment/email`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email: email})
    }).then(res => {
      if (res.status === 200) 
        dispatch({type: constants.EMAIL_ENROLMENT_STARTED, email});
      else 
        handleEmailEnrolmentError(res, dispatch);
      }
    ).catch(err => handleEmailEnrolmentError(err, dispatch))
  }
}

export const verifyEmail = (email, otp, accessToken) => {
  return dispatch => {
    dispatch({type: constants.EMAIL_ENROLMENT_VERIFICATION_REQUESTED})

    fetch(`/api/enrollment/verify/email`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
        body: JSON.stringify({email, otp})
      })
      .then(res => {
        if (res.status === 200)
          dispatch(loadEnrolments(accessToken))
        else handleEmailEnrolmentError(res, dispatch)
      })
      .catch(err => handleEmailEnrolmentError(err, dispatch))
  }
}

export const enrollSMS = (phoneNumber, accessToken) => {
  return dispatch => {
    dispatch({type: constants.SMS_ENROLMENT_REQUESTED})

    fetch(`/api/enrollment/sms`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({phone_number: phoneNumber})
    }).then(res => {
      if (res.status === 200) 
        dispatch({type: constants.SMS_ENROLMENT_STARTED, phoneNumber});
      else 
        handleSMSEnrolmentError(res, dispatch);
      }
    ).catch(err => handleSMSEnrolmentError(err, dispatch))
  }
}

export const verifySMS = (phoneNumber, otp, accessToken) => {
  return dispatch => {
    dispatch({type: constants.SMS_ENROLMENT_VERIFICATION_REQUESTED})

    fetch(`/api/enrollment/verify/sms`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
        body: JSON.stringify({phone_number: phoneNumber, otp})
      })
      .then(res => {
        if (res.status === 200)
          dispatch(loadEnrolments(accessToken))
        else handleSMSEnrolmentError(res, dispatch)
      })
      .catch(err => handleSMSEnrolmentError(err, dispatch))
  }
}

export const deleteSMSEnrolment = (user_id, accessToken) => {
  return dispatch => {
    dispatch({type: constants.SMS_ENROLMENT_DELETING})
    fetch(`/api/enrollments/sms/${user_id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
      })
      .then(res => {
        if (res.status === 200) {
          dispatch({type: constants.SMS_ENROLMENT_DELETED})
          dispatch(loadEnrolments(accessToken))
        }
        else handleSMSEnrolmentError(res, dispatch)
      })
      .catch(err => handleSMSEnrolmentError(err, dispatch))
  }
}

export const deleteEmailEnrolment = (user_id, accessToken) => {
  return dispatch => {
    dispatch({type: constants.EMAIL_ENROLMENT_DELETING})
    fetch(`/api/enrollments/email/${user_id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
      })
      .then(res => {
        if (res.status === 200) {
          dispatch({type: constants.SMS_ENROLMENT_DELETED})
          dispatch(loadEnrolments(accessToken))
        }
        else handleSMSEnrolmentError(res, dispatch)
      })
      .catch(err => handleSMSEnrolmentError(err, dispatch))
  }
}

export const loadEnrolments = (accessToken) => {
  return dispatch => {
    dispatch({type: constants.ENROLMENTS_FETCHING})

    fetch(`/api/enrollments`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        if (res.status===200)
          return res.json().then(enrolments => dispatch({type: constants.ENROLMENTS_FETCHED, enrolments}));
        dispatch({type: constants.ENROLMENTS_FETCHING_ERROR, error:`Enrolment fetch failed with status code: ${res.status}`})
      })
      .catch(err => dispatch({type: constants.ENROLMENTS_FETCHING_ERROR, error: err.toString()}) )
  }
}

function getErrorMessage(errorOrResponse) {
  const {status} = errorOrResponse;
  return status
    ? `Failed with response code: ${status}`
    : errorOrResponse.toString()
}
const handleEmailEnrolmentError = (errorOrres, dispatch) => {
  dispatch({type: constants.EMAIL_ENROLMENT_FAILED, error: getErrorMessage(errorOrres)})
}

const handleSMSEnrolmentError = (errorOrres, dispatch) => {
  dispatch({type: constants.SMS_ENROLMENT_FAILED, error: getErrorMessage(errorOrres)})
}