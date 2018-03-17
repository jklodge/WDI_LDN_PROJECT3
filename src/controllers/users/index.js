UsersIndexCtrl.$inject = ['User'];

function UsersIndexCtrl(User) {

  const vm = this;

  vm.users = [];

  User.find()
    .then(res => vm.users = res.data);

}

export default UsersIndexCtrl;
