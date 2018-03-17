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

  // function requestSubmit(){
  //   Bathroom.request(vm.bathroom.requests);
  // }

  function handleSubmit() {
    console.log(vm.bathroom.requests);
    Bathroom.create(vm.bathroom.requests);
    vm.bathroom.requests.content = {};
    $state.go('bathroomsShow');
  }
  vm.handleSubmit = handleSubmit;

  vm.remove = remove;
  // vm.requestSubmit = requestSubmit;

}

export default BathroomsShowCtrl;
