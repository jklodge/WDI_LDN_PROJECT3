/* global google */

function googleMapAutofill(){
  return{
    restrict: 'C',
    scope: {
      location: '=',
      address: '='
    },
    link($scope, $element){
      const input = $element[0];
      const autocomplete = new google.maps.places.Autocomplete(input);
      autocomplete.addListener('place_changed', () => {
        const address = autocomplete.getPlace().formatted_address;
        const location = autocomplete.getPlace().geometry.location;
        const lat = location.lat();
        const lng = location.lng();
        $scope.location.lat = lat;
        $scope.location.lng = lng;
        if($scope.bathroomsNew){
          $scope.address = address;
        } else if($scope.bathroomsEdit) {
          $scope.address = address;
        }
      });
    }
  };
}

export default googleMapAutofill;
