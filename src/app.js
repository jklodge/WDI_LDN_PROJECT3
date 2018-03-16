import angular from 'angular';
import '@uirouter/angularjs';

import Router from './config/router';


import BathroomsIndexCtrl from './controllers/bathrooms/index';
import BathroomsShowCtrl from './controllers/bathrooms/show';
import BathroomsNewCtrl from './controllers/bathrooms/new';
import BathroomsEditCtrl from './controllers/bathrooms/edit';

import Bathroom from './services/bathroom';


import 'bulma';

angular.module('pooberApp', ['ui.router'])
  .config(Router)
  .controller('BathroomsIndexCtrl', BathroomsIndexCtrl)
  .controller('BathroomsShowCtrl', BathroomsShowCtrl)
  .controller('BathroomsNewCtrl', BathroomsNewCtrl)
  .controller('BathroomsEditCtrl', BathroomsEditCtrl)
  .service('Bathroom', Bathroom);
