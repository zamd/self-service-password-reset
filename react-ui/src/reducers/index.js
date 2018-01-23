import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { smsEnrolment, emailEnrolment } from './enrolment/'
import auth from './auth';
import passwordChange from './passwordChange'
import passwordReset from './passwordReset'

export default combineReducers({
  routing: routerReducer,
  smsEnrolment,
  emailEnrolment,
  passwordChange,
  passwordReset,
  auth
})