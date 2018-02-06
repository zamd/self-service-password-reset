import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunkMiddleware from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
import rootReducer from './reducers'

import DevTools from './containers/DevTools';
import logger from './middlewares/logger';

export const history = createHistory()

const initialState = {}
const enhancers = []
const middleware = [
  thunkMiddleware,
  logger(),
  routerMiddleware(history)
]

if (process.env.NODE_ENV !== 'production') {
  enhancers.push(DevTools.instrument());
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
)

const store = createStore(
  rootReducer,
  initialState,
  composedEnhancers
)

export default store