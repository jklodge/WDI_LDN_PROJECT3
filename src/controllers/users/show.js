UsersShowCtrl.$inject = ['Bathroom', 'User', '$state', '$auth'];
function UsersShowCtrl(Bathroom, User, $state, $auth) {
  const vm = this;
  vm.user = { users: [] };
  vm.user.requests = [];


  function getUserData() {
    User.findById($auth.getPayload().sub)
      .then(res => {
        vm.user = res.data;
        Bathroom.find()
          .then(res => {
            res.data.forEach(bathroom => {
              if(bathroom.requests.length > 0 && bathroom.requests[0].user === $auth.getPayload().sub) {
                vm.user.requests.push(bathroom);
              }
            });
          });
        findPreviousUsers();
        // console.log(vm.user);
      });
  }

  function findPreviousUsers() {
    User.find()
      .then(res => {
        //filter all users to check if their id matches those in the current users previous users
        vm.user.previousUsersObject = res.data.filter(user => vm.user.previousUsers.includes(user._id));
        console.log('previous users', vm.user.previousUsersObject);

      });
  }




  function acceptRequest(bathroom, request) {
    bathroom.isAvailable = true;
    bathroom.previousUsers.push(request.user._id);
    vm.user.previousUsers.push(request.user._id);
    Bathroom.update(bathroom)
      .then(() => {
        Bathroom.acceptRequest(bathroom, request)
          .then(() => request.status = 'accepted');
      })
      .then(() => User.update(vm.user))
      .then(() => $state.go($state.current, {id: $state.params.id}, {reload: true}));
    // console.log(vm.user.previousUsers);
    getUserData();
  }



  function rejectRequest(bathroom, request) {
    Bathroom.rejectRequest(bathroom, request)
      .then(() => request.status = 'rejected');
  }

  function handleComment(id) {
    // console.log(vm.user.previousUsersObject.comments);
    User.commentCreate(id, vm.user.previousUsersObject.comments)
      .then(() => $state.go($state.current, {id: $state.params.id}, {reload: true}))
      .then(() => {
        vm.user.previousUsersObject.comments.rating = '';
        getUserData();
      });
    vm.user.previousUsers.splice(id, 1);
    User.update(vm.user);
  }


  this.acceptRequest = acceptRequest;
  this.rejectRequest = rejectRequest;
  this.handleComment = handleComment;

  getUserData();

}

export default UsersShowCtrl;
