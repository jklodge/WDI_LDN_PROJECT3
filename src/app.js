import angular from 'angular';
import '@uirouter/angularjs';

import Router from './config/router';

import 'bulma';

angular.module('pooberApp', ['ui.router'])
  .config(Router);
