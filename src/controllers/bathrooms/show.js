BathroomsShowCtrl.$inject = ['Bathroom', 'User', '$state', '$auth'];

function BathroomsShowCtrl(Bathroom, User, $state, $auth) {
  const vm = this;

  vm.bathroom = {};
  // vm.bathroom.requests = {};
  vm.userId = null;
  vm.text = '';
  vm.message = '';

  Bathroom.findById($state.params.id)
    .then(res => {
      vm.bathroom = res.data;
    });

  if($auth.getPayload()){
    User.findById($auth.getPayload().sub)
      .then(res =>  {
        vm.userId = res.data;
      });
    console.log(vm.userId);
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
    vm.text = '';
    console.log(vm.bathroom.requests);
  }

  vm.remove = remove;
  vm.handleRequest = handleRequest;

}

export default BathroomsShowCtrl;
