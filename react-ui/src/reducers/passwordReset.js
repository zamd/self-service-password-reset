import * as constants from '../constants';
import { fromJS } from 'immutable';
import createReducer from '../utils/createReducer';

const initialState = {
  inProgress: false,
  error: {},
  infoMessage: ""
}

export default createReducer(fromJS(initialState), {
  [constants.PASSWORD_RESET_REQUESTED]: (state, action) =>
    state.merge({
      ...initialState,
      inProgress: true
    }),
  [constants.LOG_PASSWORD_RESET_ERROR]: (state, action) =>
    state.merge({
      ...initialState,
      error: action.error,
    }),
  [constants.CLEAR_PASSWORD_RESET_ALERT]: (state, action) =>
    state.merge({
      ...initialState
    }),
  [constants.PASSWORD_RESET_COMPLETED]: (state, action) =>
    state.merge({
      ...initialState,
      infoMessage: action.message
    })
});