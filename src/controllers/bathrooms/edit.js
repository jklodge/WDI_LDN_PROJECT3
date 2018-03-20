
BathroomsEditCtrl.$inject = ['Bathroom', '$state', '$scope'];
function BathroomsEditCtrl(Bathroom, $state, $scope) {
  const vm = this;
  vm.bathroom = {
    location: {
      lat: 0,
      lng: 0
    }
  };

  Bathroom.findById($state.params.id)
    .then(res => vm.bathroom = res.data);

  function toggleAll() {
    console.log(vm.toilet);
    vm.bathroom.toilet = vm.all;
    vm.bathroom.shower = vm.all;
    vm.bathroom.bidet = vm.all;
    vm.bathroom.sanitaryProducts = vm.all;
    vm.bathroom.babyChanging = vm.all;
  }

  function handleSubmit() {
    Bathroom.update(vm.bathroom)
      .then(() => $state.go('bathroomsShow', {
        id: $state.params.id }));
  }

  $scope.$watch(()=> vm.all, toggleAll);
  vm.handleSubmit = handleSubmit;

}

export default BathroomsEditCtrl;
