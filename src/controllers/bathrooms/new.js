BathroomsNewCtrl.$inject = ['Bathroom', '$state'];
function BathroomsNewCtrl(Bathroom, $state) {
  this.bathroom = {
    location: {
      lat: 0,
      lng: 0
    },
    facilities: {}
  };


  function toggleAll() {
    console.log(this);
    this.bathroom.facilities.toilet = !this.bathroom.facilities.toilet;
    this.bathroom.facilities.shower = !this.bathroom.facilities.shower;
    this.bathroom.facilities.bidet = !this.bathroom.facilities.bidet;
    this.bathroom.facilities.sanitaryProducts = !this.bathroom.facilities.sanitaryProducts;
    this.bathroom.facilities.babyChanging = !this.bathroom.facilities.babyChanging;
  }

  function handleSubmit() {
    Bathroom.create(this.bathroom);
    this.bathroom = {};
    $state.go('bathroomsIndex');
  }
  this.handleSubmit = handleSubmit;
  this.toggleAll = toggleAll;
}

export default BathroomsNewCtrl;
