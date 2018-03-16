import angular from 'angular';
import '@uirouter/angularjs';
import 'satellizer';

import Router from './config/router';
import Auth from './config/auth';

import 'bulma';

angular.module('pooberApp', ['ui.router', 'satellizer'])
  .config(Router)
  .config(Auth);
