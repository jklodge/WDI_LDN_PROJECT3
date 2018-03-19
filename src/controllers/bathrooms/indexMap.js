BathroomsIndexMapCtrl.$inject = ['Bathroom'];

function BathroomsIndexMapCtrl(Bathroom) {

  const vm = this;

  vm.bathrooms = [];

  Bathroom.find()
    .then(res => vm.bathrooms = res.data);

}

export default BathroomsIndexMapCtrl;
