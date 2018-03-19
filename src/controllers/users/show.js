UsersShowCtrl.$inject = ['Bathroom', 'User', '$state', '$auth'];
function UsersShowCtrl(Bathroom, User, $state, $auth) {
  const vm = this;
  vm.user = {};

  User.findById($auth.getPayload().sub)
    .then(res => {
      console.log(res);
      vm.user = res.data;
    });

  function acceptRequest(bathroom, request) {
    Bathroom.acceptRequest(bathroom, request)
      .then(() => $state.go('usersShow'));
  }

  function rejectRequest(bathroom, request) {
    Bathroom.rejectRequest(bathroom, request)
      .then(() => $state.go('usersShow'));
  }
  this.acceptRequest = acceptRequest;
  this.rejectRequest = rejectRequest;
}

export default UsersShowCtrl;
