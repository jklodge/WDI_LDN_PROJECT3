BathroomsIndexCtrl.$inject = ['Bathroom', 'filterFilter', 'rangeFilter', '$scope'];

function BathroomsIndexCtrl(Bathroom, filterFilter, rangeFilter, $scope) {

  const vm = this;

  vm.bathrooms = [];
  vm.bathroom = {};

  vm.toilet = false;
  vm.shower = false;
  vm.bidet = false;
  vm.sanitaryProducts = false;
  vm.babyChanging = false;

  Bathroom.find()
    .then(res => vm.bathrooms = res.data)
    .then(filterBathrooms);

  function filterBathrooms(){
    const params = {};
    // console.log(params);

    if(vm.toilet) params.toilet = vm.toilet;
    if(vm.shower) params.shower = vm.shower;
    if(vm.bidet) params.bidet = vm.bidet;
    if(vm.sanitaryProducts) params.sanitaryProducts = vm.sanitaryProducts;
    if(vm.babyChanging) params.babyChanging = vm.babyChanging;
    // console.log(params);
    vm.filtered = filterFilter(vm.bathrooms, params);

    if(vm.min) vm.filtered = rangeFilter(vm.filtered, { rating: [vm.min, 5]});
  }
  function toggleAll() {

    vm.toilet = vm.all;
    vm.shower = vm.all;
    vm.bidet = vm.all;
    vm.sanitaryProducts = vm.all;
    vm.babyChanging = vm.all;
  }

  $scope.$watch(()=> vm.all, toggleAll);

  $scope.$watchGroup([
    () => vm.toilet,
    () => vm.shower,
    () => vm.bidet,
    () => vm.sanitaryProducts,
    () => vm.babyChanging,
    () => vm.min
  ], filterBathrooms);

}
export default BathroomsIndexCtrl;
