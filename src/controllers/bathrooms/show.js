BathroomsShowCtrl.$inject = ['Bathroom', 'User', '$state', '$auth'];

function BathroomsShowCtrl(Bathroom, User, $state, $auth) {
  const vm = this;

  vm.bathroom = {};
  vm.bathroom.requests = {};
  vm.userId = null;

  Bathroom.findById($state.params.id)
    .then(res => vm.bathroom = res.data);


  if($auth.getPayload()){
    User.findById($auth.getPayload().sub)
      .then(res =>  {
        vm.userId = res.data;
      });
  }

  function remove() {
    Bathroom.remove(vm.bathroom)
      .then(() => $state.go('bathroomsIndex'));
  }

  function handleSubmit() {
    if (vm.text) {
      Bathroom.createRequest(vm.bathroom, {content: vm.text, user: vm.bathroom.requests._id})
        .then(res => {
          console.log(res);
          vm.bathroom = res.data;
        });
      vm.text = '';
    }
  }
  vm.remove = remove;
  vm.handleSubmit = handleSubmit;

}

export default BathroomsShowCtrl;
