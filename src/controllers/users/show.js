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
        });
    });



  function acceptRequest(bathroom, request) {
    bathroom.isAvailable = true;
    bathroom.previousUsers.push(request.user._id);
    Bathroom.update(bathroom)
      .then(() => {
        Bathroom.acceptRequest(bathroom, request)
          .then(() => request.status = 'accepted');
      });
  }



  function rejectRequest(bathroom, request) {
    Bathroom.rejectRequest(bathroom, request)
      .then(() => request.status = 'rejected');
  }


  this.acceptRequest = acceptRequest;
  this.rejectRequest = rejectRequest;

}

export default UsersShowCtrl;
