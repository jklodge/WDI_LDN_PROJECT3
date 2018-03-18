import angular from 'angular';
import '@uirouter/angularjs';
import 'satellizer';

import Router from './config/router';
import Auth from './config/auth';

import './assets/scss/style.scss';

import MainCtrl from './controllers/main';
import AuthLoginCtrl from './controllers/auth/login';
import AuthRegisterCtrl from './controllers/auth/register';
import BathroomsIndexCtrl from './controllers/bathrooms/index';
import BathroomsShowCtrl from './controllers/bathrooms/show';
import BathroomsNewCtrl from './controllers/bathrooms/new';
import BathroomsEditCtrl from './controllers/bathrooms/edit';
import UsersShowCtrl from './controllers/users/show';
import UsersEditCtrl from './controllers/users/edit';
import UsersIndexCtrl from './controllers/users/index';
import googleMapAutofill from './directives/google-map-autofill';
import googleMap from './directives/google-map';

import Bathroom from './services/bathroom';
import User from './services/user';


import 'bulma';

angular.module('pooberApp', ['ui.router', 'satellizer'])
  .config(Router)
  .config(Auth)
  .controller('MainCtrl', MainCtrl)
  .controller('AuthLoginCtrl', AuthLoginCtrl)
  .controller('AuthRegisterCtrl', AuthRegisterCtrl)
  .controller('BathroomsIndexCtrl', BathroomsIndexCtrl)
  .controller('BathroomsShowCtrl', BathroomsShowCtrl)
  .controller('BathroomsNewCtrl', BathroomsNewCtrl)
  .controller('BathroomsEditCtrl', BathroomsEditCtrl)
  .controller('UsersShowCtrl', UsersShowCtrl)
  .controller('UsersEditCtrl', UsersEditCtrl)
  .controller('UsersIndexCtrl', UsersIndexCtrl)
  .directive('googleMapAutofill', googleMapAutofill)
  .directive('googleMap', googleMap)

  .service('Bathroom', Bathroom)
  .service('User', User);
