UsersShowCtrl.$inject = ['User', '$state', '$auth'];
function UsersShowCtrl(User, $state, $auth) {
  this.user = {};

  User.findById($auth.getPayload().sub)
    .then(res => this.user = res.data);


}

export default UsersShowCtrl;
