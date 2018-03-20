BathroomsShowCtrl.$inject = ['Bathroom', 'User', '$state', '$auth'];

function BathroomsShowCtrl(Bathroom, User, $state, $auth) {
  const vm = this;

  vm.bathroom = {};
  vm.user = null;
  vm.message = '';


  Bathroom.findById($state.params.id)
    .then(res => {
      vm.bathroom = res.data;
      console.log(vm.bathroom);
    });

  if($auth.getPayload()){
    User.findById($auth.getPayload().sub)
      .then(res =>  {
        vm.user = res.data;
      });
  }

  function remove() {
    Bathroom.remove(vm.bathroom)
      .then(() => $state.go('bathroomsIndex'));
  }

  function handleRequest() {
    vm.bathroom.isAvailable = false;
    Bathroom.update(vm.bathroom)
      .then(res => {
        Bathroom.createRequest(vm.bathroom, {user: vm.bathroom.requests._id});
        vm.bathroom = res.data;
        console.log(vm.bathroom);
      });
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
