import React from 'react';
import { Route } from 'react-router';
import {
  App,
  UserPage,
  RepoPage,
} from './../containers';

const routes = {
  path: '/',
  component: App,
  childRoutes: [
    { path: '/:login/:name', component: RepoPage },
    { path: '/:login', component: UserPage },
  ]
}

export default routes;
