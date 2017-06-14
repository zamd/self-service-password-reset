import * as constants from '../constants';

export const enrollEmail = (email, accessToken) => {
  return dispatch => {
    dispatch({type: constants.ENROLMENT_REQUESTED})

//    fetch(`${process.env.REACT_APP_API}/api/enrolment/email`, {
    fetch(`/api/enrollment/email`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
        body: JSON.stringify({email: email})
      })
      .then(res=>handleEnrolmentResponse(res, email, dispatch))
      .catch(err=>handleError(err,dispatch))
  }
}

export const enrollSMS = (phone, accessToken) => {
  return dispatch => {
    dispatch({type: constants.ENROLMENT_REQUESTED})

    fetch(`/api/enrollment/sms`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
        body: JSON.stringify({phone_number: phone})
      })
      .then(res=>handleEnrolmentResponse(res, phone, dispatch))
      .catch(err=>handleError(err,dispatch))
  }
}

export const verifyEmail = (email, otp, accessToken) => {
  return dispatch => {
    dispatch({type: constants.ENROLMENT_VERIFICATION_REQUESTED})

    fetch(`/api/enrollment/verify/email`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
        body: JSON.stringify({email,otp})
      })
      .then(res=>handleVerificationResponse(res, dispatch))
      .catch(err=>handleError(err,dispatch))
  }
}

export const verifySMS = (phone_number, otp, accessToken) => {
  return dispatch => {
    dispatch({type: constants.ENROLMENT_VERIFICATION_REQUESTED})

    fetch(`/api/enrollment/verify/sms`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
        body: JSON.stringify({phone_number,otp})
      })
      .then(res=>handleVerificationResponse(res, dispatch))
      .catch(err=>handleError(err,dispatch))
  }
}


const handleError = (err, dispatch) => {
  dispatch({
    type: constants.ENROLMENT_FAILED,
    error: err.toString()
  })
}

const handleEnrolmentResponse = (res, emailOrPhone, dispatch) => {
  if (res.status === 200) {
    dispatch({type: constants.ENROLMENT_STARTED, username: emailOrPhone})
  } else {
    res
      .text()
      .then(txt => {
        dispatch({type: constants.ENROLMENT_FAILED, error: `Failed with status code ${res.status}`})
      })
  }
}

const handleVerificationResponse = (res, dispatch) => {
  if (res.status === 200) {
    dispatch({type: constants.ENROLLED})
  } else {
    res
      .text()
      .then(txt => {
        dispatch({type: constants.ENROLMENT_FAILED, error: `Failed with status code ${res.status}`})
      })
  }
}