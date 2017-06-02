import * as constants from '../constants';

export const enroll = () => {
  return dispatch => {
    dispatch({
      type: constants.ENROLMENT_REQUESTED
    })

    // Simulate an API call.
    return setTimeout(() => {
      dispatch({
        type: constants.ENROLLED
      })
    }, 1500)
  }
}