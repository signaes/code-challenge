import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import isDevelopment from '../utils/isDevelopment';

const hasDevToolsExtension = 'devToolsExtension' in window;

export const initializeStore = initialState => createStore(
  combineReducers(reducers),
  initialState,
  compose(
    applyMiddleware(thunk),
    isDevelopment && hasDevToolsExtension ? window.devToolsExtension() : f => f
  )
);
