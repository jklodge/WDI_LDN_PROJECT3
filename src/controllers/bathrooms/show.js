BathroomsShowCtrl.$inject = ['Bathroom', '$state'];

function BathroomsShowCtrl(Bathroom, $state) {
  const vm = this;

  vm.bathroom = {};
  vm.bathroom.requests = {};

  Bathroom.findById($state.params.id)
    .then(res => vm.bathroom = res.data);

  function remove() {
    Bathroom.remove(vm.bathroom)
      .then(() => $state.go('bathroomsIndex'));
  }

  function handleSubmit() {
    if (vm.text) {
      Bathroom.createRequest(vm.bathroom, {content: vm.text, user: vm.bathroom.requests._id})
        .then(res => vm.bathroom = res.data)
        .then(console.log(vm.bathroom));
      vm.text = '';
    }
  }
  vm.remove = remove;
  vm.handleSubmit = handleSubmit;

}

export default BathroomsShowCtrl;
