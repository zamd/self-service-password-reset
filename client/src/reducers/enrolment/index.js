import { combineReducers } from 'redux'
import sms from './sms'
import email from './email';

export default combineReducers({
    smsEnrolment: sms,
    emailEnrolment: email
})