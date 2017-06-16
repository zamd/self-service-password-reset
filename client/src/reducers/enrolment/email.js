import * as constants from '../../constants';
import {fromJS} from 'immutable';
import createReducer from '../../utils/createReducer';

const initialState = {
  inProgress: false,
  error: "",
  inProgressMessage: ""
}

export default createReducer(fromJS(initialState), {
  [constants.EMAIL_ENROLMENT_REQUESTED]: (state, action) => state.merge({
    ...initialState,
    inProgress: true
  }),
  [constants.EMAIL_ENROLMENT_VERIFICATION_REQUESTED]: (state, action) => state.merge({
    ...initialState,
    inProgress: true,
    inProgressMessage: 'Verifying email enrolment....'
  }),
  [constants.ENROLMENTS_FETCHING]: (state, action) => state.merge({
    ...initialState,
    inProgress: true,
    inProgressMessage: 'Fetching email enrolments....'
  }),
  [constants.ENROLMENTS_FETCHED]: (state, action) => {
    const {enrolments} = action;
    const newState = enrolments
      .filter(e => e.provider === 'email')
      .map(e => ({email: e.email, status: 1}))[0]
    const mergedState = state.merge({
      ...initialState,
      ...newState
    });
    return mergedState;
  },
  [constants.EMAIL_ENROLMENT_STARTED]: (state, action) => state.merge({
    ...initialState,
    email: action.email
  }),
  [constants.ENROLMENTS_FETCHING_ERROR]: (state, action) => state.merge({
    ...initialState,
    error: action.error
  }),
  [constants.EMAIL_ENROLMENT_FAILED]: (state, action) => state.merge({
    ...initialState,
    error: action.error
  })
});