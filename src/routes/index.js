import React from 'react';
import { Route } from 'react-router';
import {
  App,
  UserPage,
  RepoPage,
} from './../containers';

export default <Route path="/" component={App}>
  <Route 
    path="/:login:name"
    component={RepoPage}
  />
  <Route
    path="/:login"
    component={UserPage}
  />
</Route>
