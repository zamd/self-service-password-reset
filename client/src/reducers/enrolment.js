import * as constants from '../constants';
import { fromJS } from 'immutable';
import createReducer from '../utils/createReducer';

const initialState = {
  status: 0,
  type: '',
  inProgress: false
}

export default createReducer(fromJS(initialState), {
  [constants.ENROLLED]: (state, action) =>
    state.merge({
      ...initialState,
      inProgress: false,
      status: 1
    }),
    [constants.ENROLMENT_REQUESTED]: (state, action) =>
    state.merge({
      ...initialState,
      inProgress: true
    }),
    [constants.ENROLMENT_VERIFICATION_REQUESTED]: (state, action) =>
    state.merge({
      ...initialState,
      inProgress: true
    }),
    [constants.ENROLMENT_STARTED]: (state, action) =>
    state.merge({
      ...initialState,
      inProgress: false,
      username: action.username
    }),
    [constants.ENROLMENT_FAILED]: (state, action) =>
    state.merge({
      ...initialState,
      inProgress: false,
      error: action.error
    })
});