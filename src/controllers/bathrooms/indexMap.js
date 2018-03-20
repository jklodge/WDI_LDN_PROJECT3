BathroomsIndexMapCtrl.$inject = ['Bathroom', 'filterFilter', '$scope'];

function BathroomsIndexMapCtrl(Bathroom, filterFilter, $scope) {

  const vm = this;

  vm.bathrooms = [];
  vm.bathroom = {};

  vm.toilet = false;
  vm.shower = false;
  vm.bidet = false;
  vm.sanitaryProducts = false;
  vm.babyChanging = false;

  Bathroom.find()
    .then(res => vm.bathrooms = res.data);

  function filterBathrooms(){
    const params = {};

    if(vm.toilet) params.toilet = vm.toilet;
    if(vm.shower) params.shower = vm.shower;
    if(vm.bidet) params.bidet = vm.bidet;
    if(vm.sanitaryProducts) params.sanitaryProducts = vm.sanitaryProducts;
    if(vm.babyChanging) params.babyChanging = vm.babyChanging;
    console.log(params);
    vm.filtered = filterFilter(vm.bathrooms, params);
  }
  function toggleAll() {
    vm.toilet = !vm.toilet;
    vm.shower = !vm.shower;
    vm.bidet = !vm.bidet;
    vm.sanitaryProducts = !vm.sanitaryProducts;
    vm.babyChanging = !vm.babyChanging;
  }
  $scope.$watchGroup([
    () => vm.toilet,
    () => vm.shower,
    () => vm.bidet,
    () => vm.sanitaryProducts,
    () => vm.babyChanging
  ], filterBathrooms);

  vm.toggleAll = toggleAll;
}


export default BathroomsIndexMapCtrl;
