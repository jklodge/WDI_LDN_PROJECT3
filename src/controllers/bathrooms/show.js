BathroomsShowCtrl.$inject = ['Bathroom', 'User', '$state', '$auth'];

function BathroomsShowCtrl(Bathroom, User, $state, $auth) {
  const vm = this;

  vm.bathroom = {};
  vm.user = null;
  vm.message = '';
  vm.bathroom.isAvailable = true;

  Bathroom.findById($state.params.id)
    .then(res => {
      vm.bathroom = res.data;
      if((vm.bathroom.requests.length > 0) && (vm.bathroom.requests[0].status === 'pending')){
        vm.bathroom.isAvailable = false;
        console.log('hello');
      }
    })
    .then(() => console.log(vm.bathroom.isAvailable));


  if($auth.getPayload()){
    User.findById($auth.getPayload().sub)
      .then(res =>  {
        vm.user = res.data;
        // console.log(vm.user);
      });
  }

  function remove() {
    Bathroom.remove(vm.bathroom)
      .then(() => $state.go('bathroomsIndex'));
  }

  function handleRequest() {
    Bathroom.createRequest(vm.bathroom, {user: vm.bathroom.requests._id})
      .then(res => {
        vm.bathroom = res.data;
      });
    // console.log(vm.bathroom.requests);
  }


  function handleComment(){
    Bathroom.commentCreate($state.params.id, this.comments)
      .then(() => $state.go('bathroomsShow', {id: $state.params.id}));
    console.log(vm.bathroom.avgRating);
  }

  vm.remove = remove;
  vm.handleRequest = handleRequest;
  vm.handleComment = handleComment;

}

export default BathroomsShowCtrl;
