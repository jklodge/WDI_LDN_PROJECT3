import angular from 'angular';
import '@uirouter/angularjs';
import 'satellizer';

import Router from './config/router';
import Auth from './config/auth';

import MainCtrl from './controllers/main';
import AuthLoginCtrl from './controllers/auth/login';
import AuthRegisterCtrl from './controllers/auth/register';
import BathroomsIndexCtrl from './controllers/bathrooms/index';
import BathroomsShowCtrl from './controllers/bathrooms/show';
import BathroomsNewCtrl from './controllers/bathrooms/new';
import BathroomsEditCtrl from './controllers/bathrooms/edit';

import Bathroom from './services/bathroom';


import 'bulma';

angular.module('pooberApp', ['ui.router'])
  .config(Router)
  .config(Auth)
  .controller('MainCtrl', MainCtrl)
  .controller('AuthLoginCtrl', AuthLoginCtrl)
  .controller('AuthRegisterCtrl', AuthRegisterCtrl)
  .controller('BathroomsIndexCtrl', BathroomsIndexCtrl)
  .controller('BathroomsShowCtrl', BathroomsShowCtrl)
  .controller('BathroomsNewCtrl', BathroomsNewCtrl)
  .controller('BathroomsEditCtrl', BathroomsEditCtrl)
  .service('Bathroom', Bathroom);
