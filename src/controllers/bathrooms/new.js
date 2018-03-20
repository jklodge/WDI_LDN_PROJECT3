BathroomsNewCtrl.$inject = ['Bathroom', '$state', '$scope'];
function BathroomsNewCtrl(Bathroom, $state, $scope) {
  const vm = this;

  vm.bathroom = {
    location: {
      lat: 0,
      lng: 0
    }
  };

  function toggleAll() {
    console.log(vm.toilet);
    vm.bathroom.toilet = vm.all;
    vm.bathroom.shower = vm.all;
    vm.bathroom.bidet = vm.all;
    vm.bathroom.sanitaryProducts = vm.all;
    vm.bathroom.babyChanging = vm.all;
  }

  function handleSubmit() {
    Bathroom.create(vm.bathroom)
      .then(() => {
        $state.go('bathroomsIndex');
        vm.bathroom = {};
      });
  }
  $scope.$watch(()=> vm.all, toggleAll);


  vm.handleSubmit = handleSubmit;
}

export default BathroomsNewCtrl;
