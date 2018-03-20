BathroomsNewCtrl.$inject = ['Bathroom', '$state'];
function BathroomsNewCtrl(Bathroom, $state) {
  const vm = this;
  vm.bathroom = {
    location: {
      lat: 0,
      lng: 0
    }
  };

  function toggleAll() {
    console.log(vm);
    vm.bathroom.toilet = !vm.bathroom.toilet;
    vm.bathroom.shower = !vm.bathroom.shower;
    vm.bathroom.bidet = !vm.bathroom.bidet;
    vm.bathroom.sanitaryProducts = !vm.bathroom.sanitaryProducts;
    vm.bathroom.babyChanging = !vm.bathroom.babyChanging;
  }

  function handleSubmit() {
    Bathroom.create(vm.bathroom)
      .then(() => {
        $state.go('bathroomsIndex');
        vm.bathroom = {};
      });
  }

  vm.handleSubmit = handleSubmit;
  vm.toggleAll = toggleAll;
}

export default BathroomsNewCtrl;
