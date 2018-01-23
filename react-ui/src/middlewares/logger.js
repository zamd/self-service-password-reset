import { Iterable } from 'immutable';
import { createLogger } from 'redux-logger';

const toJS = state => (s, key) => {
  const mappedState = s;
  if (Iterable.isIterable(state[key])) {
    mappedState[key] = state[key].toJS();
  } else {
    mappedState[key] = state[key];
  }
  return mappedState;
};

export default () => createLogger({
  stateTransformer: (state) => {
    if (Iterable.isIterable(state)) {
      return state.toJS();
    }

    return Object.keys(state).reduce(toJS(state), { });
  },
  // predicate: () => process.env.NODE_ENV !== 'production'
});