import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import counter from './counter'
import enrolment from './enrolment'

export default combineReducers({
  routing: routerReducer,
  counter,
  enrolment
})