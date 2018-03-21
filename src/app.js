import angular from 'angular';
import '@uirouter/angularjs';
import 'satellizer';
import 'filepicker-js';
import 'angular-filepicker/dist/angular_filepicker';

import Router from './config/router';
import Auth from './config/auth';
import Upload from './config/filestack';

import './assets/scss/style.scss';

import MainCtrl from './controllers/main';
import AuthLoginCtrl from './controllers/auth/login';
import AuthRegisterCtrl from './controllers/auth/register';
import BathroomsIndexCtrl from './controllers/bathrooms/index';
import BathroomsIndexMapCtrl from './controllers/bathrooms/indexMap';
import BathroomsShowCtrl from './controllers/bathrooms/show';
import BathroomsNewCtrl from './controllers/bathrooms/new';
import BathroomsEditCtrl from './controllers/bathrooms/edit';
import UsersShowCtrl from './controllers/users/show';
import UsersEditCtrl from './controllers/users/edit';
import UsersIndexCtrl from './controllers/users/index';
import googleMapAutofill from './directives/google-map-autofill';
import googleMap from './directives/google-map';
import googleMapIndex from './directives/google-map-index';
import uploadImage from './directives/upload-image';

import Bathroom from './services/bathroom';
import User from './services/user';

import rangeFilter from './filters/range';

import 'bulma';

angular.module('pooberApp', ['ui.router', 'satellizer', 'angular-filepicker'])
  .config(Router)
  .config(Auth)
  .config(Upload)
  .controller('MainCtrl', MainCtrl)
  .controller('AuthLoginCtrl', AuthLoginCtrl)
  .controller('AuthRegisterCtrl', AuthRegisterCtrl)
  .controller('BathroomsIndexCtrl', BathroomsIndexCtrl)
  .controller('BathroomsIndexMapCtrl', BathroomsIndexMapCtrl)
  .controller('BathroomsShowCtrl', BathroomsShowCtrl)
  .controller('BathroomsNewCtrl', BathroomsNewCtrl)
  .controller('BathroomsEditCtrl', BathroomsEditCtrl)
  .controller('UsersShowCtrl', UsersShowCtrl)
  .controller('UsersEditCtrl', UsersEditCtrl)
  .controller('UsersIndexCtrl', UsersIndexCtrl)
  .directive('googleMapAutofill', googleMapAutofill)
  .directive('googleMap', googleMap)
  .directive('googleMapIndex', googleMapIndex)
  .directive('uploadImage', uploadImage)
  .service('Bathroom', Bathroom)
  .service('User', User)
  .filter('rangeFilter', rangeFilter);
