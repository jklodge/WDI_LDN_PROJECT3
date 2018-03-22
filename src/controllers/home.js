HomeCtrl.$inject = ['$state'];

function HomeCtrl($state){


  function homeLogin(){
    $state.go('login');
  }

  function homeRegister(){
    $state.go('register');
  }

  this.homeLogin = homeLogin;
  this.homeRegister = homeRegister;
}


export default HomeCtrl;
