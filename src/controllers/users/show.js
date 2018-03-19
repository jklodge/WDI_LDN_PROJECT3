UsersShowCtrl.$inject = ['Bathroom', 'User', '$state', '$auth'];
function UsersShowCtrl(Bathroom, User, $state, $auth) {
  const vm = this;
  vm.user = {};

  User.findById($auth.getPayload().sub)
    .then(res => {
      // console.log(res);
      vm.user = res.data;
      // console.log(vm.user.bathrooms);
    });

  function rejectRequest(bathroom, request) {
    console.log(bathroom, request);
    // vm.user.bathrooms.find(bathroom => bathroom._id = bathroomId).requests[0].status = 'rejected';
    // console.log(vm.user.bathrooms);
    // updateBathrooms();
  }

  function acceptRequest(bathroom, request) {
    // console.log(requestId, bathroomId);
    console.log(bathroom._id, request._id);
    // vm.user.bathrooms.find(bathroom => bathroom._id = bathroomId).requests[0].status = 'accepted';
    // console.log(vm.user.bathrooms);
    // updateBathrooms();
  }

  // function updateBathrooms() {
  //   vm.user.bathrooms.forEach(bathroom => {
  //     Bathroom.update(bathroom._id);
  //   });
  //   console.log(vm.user.bathrooms);
  // }

  this.rejectRequest = rejectRequest;
  this.acceptRequest = acceptRequest;

}

export default UsersShowCtrl;
