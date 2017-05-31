import * as constants from '../constants';

const initialState = {
  count: 0,
  isIncrementing: false,
  isDecrementing: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.INCREMENT_REQUESTED:
      return {
        ...state,
        isIncrementing: true
      }

    case constants.INCREMENT:
      return {
        ...state,
        count: state.count + 1,
        isIncrementing: false
      }

    case constants.DECREMENT_REQUESTED:
      return {
        ...state,
        isDecrementing: true
      }

    case constants.DECREMENT:
      return {
        ...state,
        count: state.count - 1,
        isDecrementing: false
      }

    default:
      return state
  }
}