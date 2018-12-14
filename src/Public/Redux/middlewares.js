import { applyMiddleware } from 'redux'
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers'
import {createLogger} from 'redux-logger'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'

const middlewares = [];
// middleware react navigation
const reactNavigation = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav,
);
middlewares.push(reactNavigation);

// middlewares logger
const logger = createLogger();
middlewares.push(logger);
middlewares.push(thunk);
middlewares.push(promise())

export default applyMiddleware(...middlewares);