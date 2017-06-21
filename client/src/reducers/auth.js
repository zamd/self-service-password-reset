import * as constants from '../constants';
import { fromJS } from 'immutable';
import createReducer from '../utils/createReducer';

const initialState = {
  inProgress: false, 
  accessToken: localStorage.getItem('access_token'),
  idToken: localStorage.getItem('id_token'),
  scope: localStorage.getItem('scope')
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
      ...initialState
    }),
  [constants.LOGIN_COMPLETED]: (state, action) =>
    state.merge({
      ...initialState,
      ...action.payload
    }),
  [constants.LOGOUT]: (state, action) =>
    state.merge({
      ...initialState,
      accessToken: ''
    })
});