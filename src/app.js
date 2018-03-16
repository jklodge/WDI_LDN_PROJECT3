import angular from 'angular';
import '@uirouter/angularjs';

import Router from './config/router';

import Bathroom from './services/bathroom';

import BathroomsNewCtrl from './controllers/bathrooms/new';

import 'bulma';

angular.module('pooberApp', ['ui.router'])
  .config(Router)
  .service('Bathroom', Bathroom)
  .controller('BathroomsNewCtrl', BathroomsNewCtrl)
  .controller('BathroomsEditCtrl', BathroomsNewCtrl);
