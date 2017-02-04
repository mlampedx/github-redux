import * as types from './../actions';
import merge from 'ladash/merge';
import paginate from './paginate';
import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';

const entities = ( state = { users: {}, repos: {} }, action) => {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities);
  }

  return state;
}

const errorMessage = (state = null, action) => {
  const { type, error } = action;

  if (type === types.RESET_ERROR_MESSAGE) {
    return null;
  } else if (error) {
    return error;
  }

  return state;
}

const pagination = combineReducers({
  starredByUser: paginate({
    mapActionToKey: (action) => action.login,
    types: [
      types.STARRED_REQUEST,
      types.STARRED_SUCCESS,
      types.STARRED_FAILURE
    ],
  }),
  stargazersByRepo: paginate({
    mapActionToKey: (action) => action.fullName,
    types: [
      types.STARGAZERS_REQUEST,
      types.STARGAZERS_SUCCESS,
      types.STARGAZERS_FAILURE,
    ],
  })
});

const rootReducer = combineReducers({
  entities,
  pagination,
  errorMessage,
  routing,
});

export default rootReducer;
