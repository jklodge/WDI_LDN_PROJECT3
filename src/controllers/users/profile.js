UserShowCtrl.$inject = ['User', '$state'];
function UserShowCtrl(User, $state) {
  this.user = {};

  User.findById($state.params.id)
    .then(res => this.user = res.data);
}

export default UserShowCtrl;
