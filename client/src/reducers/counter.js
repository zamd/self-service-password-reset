import * as constants from '../constants';
import { fromJS } from 'immutable';
import createReducer from '../utils/createReducer';

const initialState = {
  count: 0,
  isIncrementing: false,
  isDecrementing: false
}

export default createReducer(fromJS(initialState), {
  [constants.INCREMENT_REQUESTED]: (state, action) =>
    state.merge({
      isIncrementing: true
    }),
  [constants.INCREMENT]: (state, action) =>
    state.merge({
      ...initialState,
      count: state.get('count') + 1,
      isIncrementing: false
    }),
  [constants.DECREMENT_REQUESTED]: (state, action) =>
    state.merge({
      ...initialState,
      isDecrementing: true
    }),
  [constants.DECREMENT]: (state, action) =>
    state.merge({
      ...initialState,
      count: state.get('count') - 1,
      isDecrementing: false
    })
});