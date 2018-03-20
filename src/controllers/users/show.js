UsersShowCtrl.$inject = ['Bathroom', 'User', '$state', '$auth'];
function UsersShowCtrl(Bathroom, User, $state, $auth) {
  const vm = this;
  vm.user = {};
  vm.user.requests = [];

  User.findById($auth.getPayload().sub)
    .then(res => {
      res.data.requests = res.data.requests.filter(request => request.user === $auth.getPayload().sub);
      vm.user = res.data;
      Bathroom.find()
        .then(res => {
          res.data.forEach(bathroom => {
            if(bathroom.requests.length > 0 && bathroom.requests[0].user === $auth.getPayload().sub) {
              vm.user.requests.push(bathroom);
            }
          });
          console.log(vm.user.requests);
        });
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
