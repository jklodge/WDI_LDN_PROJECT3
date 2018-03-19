/* global google */

function googleMap() {
  return {
    restrict: 'E',
    template: '<div class="google-map"></div>',
    replace: true,
    scope: {
      center: '=',
      zoom: '=',
      bathroom: '='
    },
    link($scope, $element) {
      const map = new google.maps.Map($element[0], {
        zoom: $scope.zoom,
        center: $scope.center
      });

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
