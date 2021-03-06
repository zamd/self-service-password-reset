import * as constants from '../constants';
import { fromJS } from 'immutable';
import createReducer from '../utils/createReducer';

const initialState = {
  inProgress: false, 
  accessToken: localStorage.getItem('access_token'),
  idToken: localStorage.getItem('id_token'),
  scope: localStorage.getItem('scope') ? JSON.parse(localStorage.getItem('scope')) : undefined,
  profile: localStorage.getItem('profile') ? JSON.parse(localStorage.getItem('profile')) : undefined
}

export default createReducer(fromJS(initialState), {
  [constants.LOGIN_STARTED]: (state, action) =>
    state.merge({
      ...initialState,
      accessToken: '',
      inProgress: true
    }),
  [constants.LOGIN_FAILED]: (state, action) =>
    state.merge({
      ...initialState,
      error: action.payload.errorDescription
    }),
  [constants.LOGIN_COMPLETED]: (state, action) =>
    state.merge({
      ...initialState,
      ...action.payload,
      profile: action.payload.profile
    }),
  [constants.LOGOUT]: (state, action) =>
    state.merge({
      ...initialState,
      accessToken: ''
    })
});