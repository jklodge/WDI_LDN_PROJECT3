BathroomsShowCtrl.$inject = ['Bathroom', 'User', '$state', '$auth'];

function BathroomsShowCtrl(Bathroom, User, $state, $auth) {
  const vm = this;

  vm.bathroom = {};
  // vm.bathroom.requests = {};
  vm.user = null;
  vm.text = '';
  vm.message = '';

  Bathroom.findById($state.params.id)
    .then(res => {
      vm.bathroom = res.data;
      console.log(vm.bathroom);
      res.data.requests = res.data.requests.filter(request => request.user === $auth.getPayload().sub);
    });

  if($auth.getPayload()){
    User.findById($auth.getPayload().sub)
      .then(res =>  {
        vm.user = res.data;
        console.log(vm.user);
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
    vm.text = '';
    // console.log(vm.bathroom.requests);
  }

  // function handleDialogue() {
  // if(vm.message){
  //   console.log(vm.bathroom);
  //   vm.bathroom.requests.forEach(request => {
  //     request.dialogue.push(vm.message);
  //     console.log(request.dialogue);
  //   });
  //   vm.message = '';
  //   Bathroom.update(vm.bathroom);
  // }
  // }

  vm.remove = remove;
  vm.handleRequest = handleRequest;
  // vm.handleDialogue = handleDialogue;

}

export default BathroomsShowCtrl;
