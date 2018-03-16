AuthLoginCtrl.$inject = ['$auth', '$state', '$rootScope'];

function AuthLoginCtrl($auth, $state, $rootScope){
  this.credentials = {};

  function handleSubmit(){
    $auth.login(this.credentials)
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

export default AuthLoginCtrl;
