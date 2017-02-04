import { CALL_API, Schemas } from './../middleware/API';
import * as types from './ActionTypes';

const fetchUser = (login) => ({
  [CALL_API]: {
    types: [ types.USER_REQUEST, types.USER_SUCCESS, types.USER_FAILURE ],
    endpoint: `users/${login}`,
    schema: Schemas.USER,
  }
});

export const loadUser = (login, requiredFields = []) => (dispatch, getState) => {
  const user = getState().entities.user[login];
  if (user && requiredFields.every(key => user.hasOwnProperty(key))) {
    return null;
  }

  return dispatch(fetchUser(login));
}

const fetchRepo = (fullName) => ({
  [CALL_API]: {
    types: [ types.REPO_REQUEST, types.REPO_SUCCESS, types.REPO_FAILURE ],
    endpoint: `repos/${fullName}`,
    schema: Schemas.REPO,
  }
});

export const loadRepo = (fullName, requiredFields = []) => (dispatch, getState) => {
  const repo = getState().entities.repos[fullName];
  if (repo && requiredFields.every(key => repo.hasOwnProperty(key))) {
    return null;
  }

  return dispatch(fetchRepo(fullName));
}

const fetchStarred = (login, nextPageUrl) => ({
  login,
  [CALL_API]: {
    types: [ types.STARRED_REQUEST, types.STARRED_SUCCESS, types.STARRED_FAILURE ],
    endpoint: nextPageUrl,
    schema: Schemas.REPO_ARRAY,
  }
});

export const loadStarred = (login, nextPage) => (dispatch, getState) => {
  const {
    nextPage = `users/${login}/starred`,
    pageCount = 0
  } = getState().pagination.starredByUser[login] || {};

  if (pageCount > 0 && !nextPage) {
    return null;
  }

  return dispatch(fetchStarred(login, nextPageUrl));
}

const fetchStargazers = (fullName, nextPageUrl) => ({
  fullName,
  [CALL_API]: {
    types: [ types.STARGAZERS_REQUEST, types.STARGAZERS_SUCCESS, types.STARGAZERS_FAILURE ],
    endpoint: nextPageUrl,
    schema: Schemas.USER_ARRAY,
  }
})

export const loadStargazers = (fullName, nexPage) => (dispatch, getState) => {
  const {
    nextPageUrl = `users/${login}/stargazers`,
    pageCount = 0
  } = getState().pagination.stargazersByRepo[fullName] || {};

  if (pageCount > 0 && !nextPage) {
    return null;
  }

  return dispatch(fetchStargazers(fullName, nextPageUrl));
}

export const resetErrorMessage = () => ({
  type: types.RESET_ERROR_MESSAGE,
})
