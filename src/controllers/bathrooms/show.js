BathroomsShowCtrl.$inject = ['Bathroom', '$state'];

function BathroomsShowCtrl(Bathroom, $state) {
  const vm = this;



  vm.bathroom = {};

  Bathroom.findById($state.params.id)
    .then(res => vm.bathroom = res.data);

  function remove() {
    Bathroom.remove(vm.bathroom)
      .then(() => $state.go('bathroomsIndex'));
  }

  vm.remove = remove;

}

export default BathroomsShowCtrl;
