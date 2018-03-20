/* global filestack */
UsersEditCtrl.$inject = ['User', '$state'];
function UsersEditCtrl(User, $state) {
  this.user = {};
  const client = filestack.init('AB6Lmdk1RRjG0sQAhRSpsz');
  let image = '';

  User.findById($state.params.id)
    .then(res => this.user = res.data);

  function handleSubmit() {
    User.update(this.user)
      .then(() => $state.go('usersShow', {
        id: $state.params.id }));
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
  this.uploadImage  = uploadImage;
  this.handleSubmit = handleSubmit;
}

export default UsersEditCtrl;
