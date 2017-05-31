import * as constants from '../constants';

export const decrementAsync = () => {
  return dispatch => {
    dispatch({
      type: constants.DECREMENT_REQUESTED
    })

    return setTimeout(() => {
      dispatch({
        type: constants.DECREMENT
      })
    }, 1500)
  }
}

export const increment = () => {
  return dispatch => {
    dispatch({
      type: constants.INCREMENT
    })
  }
}

export const decrement = () => {
  return dispatch => {
    dispatch({
      type: constants.DECREMENT
    })
  }
}

export const incrementAsync = () => {
  return dispatch => {
    dispatch({
      type: constants.INCREMENT_REQUESTED
    })

    return setTimeout(() => {
      dispatch({
        type: constants.INCREMENT
      })
    }, 1500)
  }
}