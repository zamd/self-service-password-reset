import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import counter from './counter'
import { smsEnrolment, emailEnrolment } from './enrolment/'
import auth from './auth';
import password from './password'

export default combineReducers({
  routing: routerReducer,
  counter,
  smsEnrolment,
  emailEnrolment,
  password,
  auth
})