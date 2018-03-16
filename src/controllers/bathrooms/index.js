BathroomsIndexCtrl.$inject = ['Bathroom'];

function BathroomsIndexCtrl(Bathroom) {

  const vm = this;

  vm.bathrooms = [];

  Bathroom.find()
    .then(res => vm.bathrooms = res.data);

}

export default BathroomsIndexCtrl;
