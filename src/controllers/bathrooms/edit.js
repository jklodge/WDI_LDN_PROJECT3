BathroomsEditCtrl.$inject = ['Bathroom', '$state'];
function BathroomsEditCtrl(Bathroom, $state) {
  this.bathroom = {};

  Bathroom.findById($state.params.id)
    .then(res => this.bathroom = res.data);

  function handleSubmit() {
    Bathroom.update(this.bathroom)
      .then(() => $state.go('bathroomsShow', {
        id: $state.params.id }));
  }
  this.handleSubmit = handleSubmit;
}

export default BathroomsEditCtrl;
