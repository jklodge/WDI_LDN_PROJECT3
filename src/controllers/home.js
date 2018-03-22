HomeCtrl.$inject = ['$state', '$location', '$anchorScroll', '$scope'];

function HomeCtrl($state, $location, $anchorScroll, $scope){


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
  this.aboutIsActive = false;

  function toggleAbout() {
    this.aboutIsActive = !this.aboutIsActive;
    // if(this.aboutIsActive) {
    // $location.hash('about');
    // //   // call $anchorScroll()
    // $anchorScroll();
    //
    // }
    gotoAbout();
  }

  this.toggleAbout = toggleAbout;
  this.gotoAbout = gotoAbout;
  this.homeLogin = homeLogin;
  this.homeRegister = homeRegister;
}

export default HomeCtrl;
