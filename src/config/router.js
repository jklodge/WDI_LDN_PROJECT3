secureState.$inject = ['$q', '$state', '$auth', '$rootScope'];

function secureState($q, $state, $auth, $rootScope){
  return new $q((resolve) => {
    if($auth.isAuthenticated()) return resolve();

    $rootScope.$broadcast('flashMessage', {
      type: 'danger',
      content: 'You must be logged in'
    });

    $state.go('login');
  });
}

Router.$inject = ['$stateProvider', '$urlRouterProvider'];


function Router($stateProvider, $urlRouterProvider) {

  // $locationProvider.html5mode(true);

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'views/home.html',
      controller: 'BathroomsIndexCtrl as home'
    })
    .state('bathroomsIndex', {
      url: '/bathrooms',
      templateUrl: 'views/bathrooms/index.html',
      controller: 'BathroomsIndexCtrl as bathroomsIndex'
    })
    .state('bathroomsMapIndex', {
      url: '/bathrooms/map',
      templateUrl: 'views/bathrooms/indexMap.html',
      controller: 'BathroomsIndexMapCtrl as bathroomsMapIndex'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'views/auth/login.html',
      controller: 'AuthLoginCtrl as authLogin'
    })
    .state('register', {
      url: '/register',
      templateUrl: 'views/auth/register.html',
      controller: 'AuthRegisterCtrl as authRegister'
    })
    .state('bathroomsNew', {
      url: '/bathrooms/new',
      templateUrl: 'views/bathrooms/new.html',
      controller: 'BathroomsNewCtrl as bathroomsNew',
      resolve: {secureState}
    })
    .state('bathroomsShow', {
      url: '/bathrooms/:id',
      templateUrl: 'views/bathrooms/show.html',
      controller: 'BathroomsShowCtrl as bathroomsShow'
    })
    .state('bathroomsEdit', {
      url: '/bathrooms/:id/edit',
      templateUrl: 'views/bathrooms/edit.html',
      controller: 'BathroomsEditCtrl as bathroomsEdit',
      resolve: {secureState}
    })
    .state('usersIndex', {
      url: '/users',
      templateUrl: 'views/users/index.html',
      controller: 'UsersIndexCtrl as usersIndex',
      resolve: {secureState}
    })
    .state('usersShow', {
      url: '/users/:id',
      templateUrl: 'views/users/show.html',
      controller: 'UsersShowCtrl as usersShow',
      resolve: {secureState}
    })
    .state('usersEdit', {
      url: '/users/:id/edit',
      templateUrl: 'views/users/edit.html',
      controller: 'UsersEditCtrl as usersEdit',
      resolve: {secureState}
    });

  $urlRouterProvider.otherwise('/bathrooms');

}

export default Router;
