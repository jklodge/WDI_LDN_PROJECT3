/* global filestack */

BathroomsEditCtrl.$inject = ['Bathroom', '$state'];
function BathroomsEditCtrl(Bathroom, $state) {
  const vm = this;
  const client = filestack.init('AB6Lmdk1RRjG0sQAhRSpsz');
  let image = '';
  vm.bathroom = {
    location: {
      lat: 0,
      lng: 0
    }
  };

  Bathroom.findById($state.params.id)
    .then(res => vm.bathroom = res.data);

  function handleSubmit() {
    Bathroom.update(vm.bathroom)
      .then(() => $state.go('bathroomsShow', {
        id: $state.params.id }));
  }

  function toggleAll() {
    console.log(vm);
    vm.bathroom.toilet = !vm.bathroom.toilet;
    vm.bathroom.shower = !vm.bathroom.shower;
    vm.bathroom.bidet = !vm.bathroom.bidet;
    vm.bathroom.sanitaryProducts = !vm.bathroom.sanitaryProducts;
    vm.bathroom.babyChanging = !vm.bathroom.babyChanging;
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

  vm.uploadImage = uploadImage;
  vm.handleSubmit = handleSubmit;
  vm.toggleAll = toggleAll;

}

export default BathroomsEditCtrl;
