import * as constants from '../constants';
import { fromJS } from 'immutable';
import createReducer from '../utils/createReducer';

const initialState = {
  inProgress: false,
  error: {},
  infoMessage: ""
}

export default createReducer(fromJS(initialState), {
  [constants.PASSWORD_CHANGE_REQUESTED]: (state, action) =>
    state.merge({
      ...initialState,
      inProgress: true
    }),
  [constants.LOG_PASSWORD_ERROR]: (state, action) =>
    state.merge({
      ...initialState,
      error: action.error,
    }),
  [constants.CLEAR_PASSWORD_ALERT]: (state, action) =>
    state.merge({
      ...initialState
    }),
  [constants.PASSWORD_CHANGE_COMPLETED]: (state, action) =>
    state.merge({
      ...initialState,
      infoMessage: action.message
    })
});