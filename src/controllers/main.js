MainCtrl.$inject = ['$auth', '$state', '$rootScope', '$timeout'];

function MainCtrl($auth, $state, $rootScope, $timeout){
  const vm = this;
  vm.isAuthenticated = $auth.isAuthenticated;
  vm.flashMessage = null;
  vm.clicked = false;



  $rootScope.$on('flashMessage', (e, data) => {
    vm.flashMessage = data;

    $timeout(() => vm.flashMessage = null, 2000);
  });


  function logout(){
    $auth.logout();
    $state.go('bathroomsIndex');
  }
  vm.logout = logout;
}

export default MainCtrl;
