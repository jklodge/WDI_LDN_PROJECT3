HomeCtrl.$inject = ['$state', '$location', '$anchorScroll'];

function HomeCtrl($state, $location, $anchorScroll){


  function homeLogin(){
    $state.go('login');
  }

  function homeRegister(){
    $state.go('register');
  }

  function gotoAbout(){
    $location.hash('about');
    // call $anchorScroll()
    $anchorScroll();

  }

  this.gotoAbout = gotoAbout;
  this.homeLogin = homeLogin;
  this.homeRegister = homeRegister;
}

export default HomeCtrl;
