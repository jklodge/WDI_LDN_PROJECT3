UsersShowCtrl.$inject = ['User', '$state', '$auth'];
function UsersShowCtrl(User, $state, $auth) {
  const vm = this;
  vm.user = {};

  User.findById($auth.getPayload().sub)
    .then(res => {
      console.log(res);
      vm.user = res.data;
    });
}

export default UsersShowCtrl;
