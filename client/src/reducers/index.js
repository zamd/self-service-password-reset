import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import counter from './counter'
import enrolment from './enrolment/'
import auth from './auth';
import password from './password'

export default combineReducers({
  routing: routerReducer,
  counter,
  enrolment,
  password,
  auth
})