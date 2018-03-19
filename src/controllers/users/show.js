UsersShowCtrl.$inject = ['User', '$state', '$auth'];
function UsersShowCtrl(User, $state, $auth) {
  const vm = this;
  vm.user = {};
  vm.bathroom = {};

  User.findById($auth.getPayload().sub)
    .then(res => vm.user = res.data);

  User.findBathroom($state.params.id)
    .then(res => vm.bathroom = res.data);
}

export default UsersShowCtrl;
