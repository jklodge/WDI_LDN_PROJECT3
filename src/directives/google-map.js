/* global google */

function googleMap() {
  let currentLocation ={};
  return {
    restrict: 'E',
    template: '<div class="google-map"></div>',
    replace: true,
    scope: {
      center: '=',
      zoom: '=',
      bathroom: '=',
      origin: '='
    },
    link($scope, $element) {
      const map = new google.maps.Map($element[0], {
        zoom: $scope.zoom,
        center: $scope.center
      });

      navigator.geolocation.getCurrentPosition(pos => {
        console.log(pos.coords.latitude);
        console.log(pos.coords.longitude);
        const userCurrentLat = pos.coords.latitude;
        const userCurrentLng = pos.coords.longitude;

        currentLocation = { lat: userCurrentLat, lng: userCurrentLng };
        displayRoute();
        $scope.$apply();
      });

      const directionsDisplay = new google.maps.DirectionsRenderer();
      const directionsService = new google.maps.DirectionsService();
      // const origin = currentLocation;
      // console.log(origin);

      directionsDisplay.setMap(map);

      function displayRoute() {

        directionsService.route({
          origin: currentLocation,
          destination: $scope.center,
          travelMode: 'DRIVING'
        }, (response) => {
          directionsDisplay.setDirections(response);
        });
      }

      const marker = new google.maps.Marker({
        position: $scope.center,
        map: map,
        title: 'Hello World!'
      });
      //this makes sure that the show page loads up first before google maps otherwise nothing shows
      $scope.$watch('center', () => {
        map.setCenter($scope.center);
        marker.setPosition($scope.center);
      }, true);

      const infoWindow = new google.maps.InfoWindow();

      $scope.$watch('bathroom', () => {
        infoWindow.setContent(`<div><h1>${$scope.bathroom.description}</h1><h1>${$scope.bathroom.address}</h1></div>`);
      }, true);

      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });
    }
  };
}

export default googleMap;
