import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import API from './../middleware/API';
import rootReducer from './../reducers/';

const configureStore = preloadedState => createStore(
  rootReducer,
  preloadedState,
  applyMiddleware(thunk, API)
)

export default configureStore;
