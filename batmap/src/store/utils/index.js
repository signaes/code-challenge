import { merge } from 'ramda';

export const getCurrentState = state => merge({}, state);

export const createReducer = types => (state, { type }) => (
  types[type] ? types[type](getCurrentState(state)) : getCurrentState(state)
);

export const getNewState = (currentState, newState) => (
  merge(currentState, newState)
);
