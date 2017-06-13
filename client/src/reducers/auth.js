import * as constants from '../constants';
import { fromJS } from 'immutable';
import createReducer from '../utils/createReducer';

const initialState = {
  inProgress: false, 
  accessToken: localStorage.getItem('access_token')
}

export default createReducer(fromJS(initialState), {
  [constants.LOGIN_STARTED]: (state, action) =>
    state.merge({
      accessToken: null,
      inProgress: true
    }),
  [constants.LOGIN_FAILED]: (state, action) =>
    state.merge({
      accessToken: null,
      inProgress: false
    }),
  [constants.LOGIN_COMPLETED]: (state, action) =>
    state.merge({
      inProgress: false,
      accessToken: action.accessToken
    }),
  [constants.LOGOUT]: (state, action) =>
    state.merge({
      accessToken: ''
    })
});