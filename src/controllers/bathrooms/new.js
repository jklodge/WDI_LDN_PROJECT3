BathroomsNewCtrl.$inject = ['Bathroom', '$state', '$rootScope'];
function BathroomsNewCtrl(Bathroom, $state, $rootScope) {
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
    Bathroom.create(vm.bathroom);
    vm.bathroom = {};
    $rootScope.$broadcast('flashMessage', {
      type: 'info',
      content: 'Thanks for your contribution to Poober'
    });
    $state.go('bathroomsIndex');
  }
  vm.handleSubmit = handleSubmit;
  vm.toggleAll = toggleAll;
}

export default BathroomsNewCtrl;
