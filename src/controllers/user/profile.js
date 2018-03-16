BathroomsProfileCtrl.$inject = ['User', '$state'];
function UsersShowCtrl(User, $state) {
  this.place = {};

  User.findById($state.params.id)
    .then(res => this.place = res.data);
