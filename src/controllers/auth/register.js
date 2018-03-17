AuthRegisterCtrl.$inject = ['$auth', '$state', '$rootScope'];

function AuthRegisterCtrl($auth, $state, $rootScope){
  this.user = {};

  function handleSubmit(){
    $auth.signup(this.user)
      .then(res => {
        $rootScope.$broadcast('flashMessage', {
          type: 'success',
          content: res.data.message
        });
        $state.go('bathroomsIndex');
      });
  }

  this.handleSubmit = handleSubmit;
}

export default AuthRegisterCtrl;
