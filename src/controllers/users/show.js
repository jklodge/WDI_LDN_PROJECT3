UsersShowCtrl.$inject = ['Bathroom', 'User', '$state', '$auth'];
function UsersShowCtrl(Bathroom, User, $state, $auth) {
  const vm = this;
  vm.user = {};

  User.findById($auth.getPayload().sub)
    .then(res => {
      res.data.requests = res.data.requests.filter(request => request.user === $auth.getPayload().sub);
      vm.user = res.data;
    });


  function acceptRequest(bathroom, request) {
    Bathroom.acceptRequest(bathroom, request)
      .then(() => request.status = 'accepted');
  }



  function rejectRequest(bathroom, request) {
    Bathroom.rejectRequest(bathroom, request)
      .then(() => request.status = 'rejected');
  }


  this.acceptRequest = acceptRequest;
  this.rejectRequest = rejectRequest;

}

export default UsersShowCtrl;
