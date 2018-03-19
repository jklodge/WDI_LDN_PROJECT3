UsersShowCtrl.$inject = ['User', '$state', '$auth'];
function UsersShowCtrl(User, $state, $auth) {
  const vm = this;
  vm.user = {};
  vm.bathrooms = {};
  vm.ownedBathrooms = [];

  User.findById($auth.getPayload().sub)
    .then(res => vm.user = res.data);


  User.findBathroom($state.params.id)
    .then(res => {
      vm.bathrooms = res.data;
      vm.bathrooms.forEach(bathroom => {
        // console.log(bathroom);
        if(vm.user._id === bathroom.user) vm.ownedBathrooms.push(bathroom);
      });
      console.log(vm.ownedBathrooms);
    });
}

export default UsersShowCtrl;
