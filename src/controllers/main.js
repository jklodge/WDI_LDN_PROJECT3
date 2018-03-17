MainCtrl.$inject = ['User', '$auth', '$state', '$rootScope', '$timeout'];

function MainCtrl(User, $auth, $state, $rootScope, $timeout){
  const vm = this;
  vm.isAuthenticated = $auth.isAuthenticated;
  vm.flashMessage = null;
  vm.userId = '';

  User.findById($auth.getPayload().sub)
    .then(res => vm.userId = res.data);

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
