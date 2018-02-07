import * as constants from '../../constants';
import {fromJS} from 'immutable';
import createReducer from '../../utils/createReducer';

const initialState = {
  inProgress: false,
  error: "",
  inProgressMessage: "",
  isEnrolled: false,
  profile: undefined
}

export default createReducer(fromJS(initialState), {
  [constants.SMS_ENROLMENT_REQUESTED]: (state, action) => state.merge({
    ...initialState,
    inProgress: true
  }),
  [constants.SMS_ENROLMENT_VERIFICATION_REQUESTED]: (state, action) => state.merge({
    ...initialState,
    inProgress: true,
    inProgressMessage: 'Verifying SMS enrolment...'
  }),
  [constants.ENROLMENTS_FETCHING]: (state, action) => state.merge({
    ...initialState,
    inProgress: true,
    inProgressMessage: 'Fetching SMS enrolments...'
  }),

  [constants.ENROLMENTS_FETCHED]: (state, action) => {
    const {enrolments} = action;
    const newState = enrolments
      .filter(e => e.provider === 'sms')
      .map(e => ({ profile: { phoneNumber: e.phone_number, status: 1, user_id: e.user_id }, isEnrolled: true}))[0]
    const mergedState = state.merge({
      ...initialState,
      ...newState
    });
    return mergedState;
  },
  [constants.SMS_ENROLMENT_STARTED]: (state, action) => state.merge({
    ...initialState,
    phoneNumber: action.phoneNumber
  }),
  [constants.ENROLMENTS_FETCHING_ERROR]: (state, action) => state.merge({
    ...initialState,
    inProgress: false,
    error: action.error
  }),
  [constants.SMS_ENROLMENT_FAILED]: (state, action) => state.merge({
    ...initialState,
    inProgress: false,
    error: action.error
  }),  
  [constants.SMS_ENROLMENT_DELETING]: (state,action) => state.merge({
    ...initialState,
    inProgress: true,
    inProgressMessage: 'Deleting sms enrolment....'
  }),
  [constants.SMS_ENROLMENT_DELETED]: (state,action) => state.merge({
    ...initialState,
    profile: undefined,
    isEnrolled: false,
    phoneNumber: undefined
  })
});
