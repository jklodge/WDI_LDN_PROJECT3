Router.$inject = ['$stateProvider', '$urlRouterProvider'];

function Router($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('bathroomsIndex', {
      url: '/bathrooms',
      templateUrl: 'views/bathrooms/index.html',
      controller: 'BathroomsIndexCtrl as bathroomsIndex'
    })
    .state('bathroomsNew', {
      url: '/bathrooms/new',
      templateUrl: 'views/bathrooms/new.html',
      controller: 'BathroomsNewCtrl as bathroomsNew'
    })
    .state('bathroomsShow', {
      url: '/bathrooms/:id',
      templateUrl: 'views/bathrooms/show.html',
      controller: 'BathroomsShowCtrl as bathroomsShow'
    })
    .state('bathroomsEdit', {
      url: '/bathrooms/:id/edit',
      templateUrl: 'views/bathrooms/edit.html',
      controller: 'BathroomsEditCtrl as bathroomsEdit'
    });

  $urlRouterProvider.otherwise('/bathrooms');

}

export default Router;
