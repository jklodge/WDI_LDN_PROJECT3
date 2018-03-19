AuthLoginCtrl.$inject = ['User','$auth', '$state', '$rootScope'];

function AuthLoginCtrl(User, $auth, $state, $rootScope){
  const vm = this;
  vm.credentials = {};
  vm.userId = '';

  function handleSubmit(){
    $auth.login(vm.credentials)
      .then(res => {
        $rootScope.$broadcast('flashMessage', {
          type: 'success',
          content: res.data.message
        });
        $state.go('bathroomsIndex');
      });
  }

  vm.handleSubmit = handleSubmit;
}

export default AuthLoginCtrl;
