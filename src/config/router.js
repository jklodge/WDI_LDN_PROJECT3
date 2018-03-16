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
  $stateProvider
    .state('bathroomsIndex', {
      url: '/bathrooms',
      templateUrl: 'views/bathrooms/index.html',
      controller: 'BathroomsIndexCtrl as bathroomsIndex'
    })
    .state('login', {
      url: '/login',
      template: 'views/auth/login.html',
      controller: 'AuthLoginCtrl as authLogin'
    })
    .state('register', {
      url: '/register',
      template: 'views/auth/register.html',
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
    });

  $urlRouterProvider.otherwise('/bathrooms');

}

export default Router;