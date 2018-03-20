/* global filestack */
BathroomsNewCtrl.$inject = ['Bathroom', '$state'];
function BathroomsNewCtrl(Bathroom, $state,) {
  const vm = this;
  const client = filestack.init('AB6Lmdk1RRjG0sQAhRSpsz');
  let image = '';
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
    $state.go('bathroomsIndex');
  }

  function uploadImage() {
    client.pick({})
      .then(function(result) {
        console.log(JSON.stringify(result));
        image = result.filesUploaded[0].url;
        console.log(image);
        document.querySelector('.imgPreview').setAttribute('src', image);
      });
  }

  vm.handleSubmit = handleSubmit;
  vm.uploadImage = uploadImage;
  vm.toggleAll = toggleAll;
}

export default BathroomsNewCtrl;
