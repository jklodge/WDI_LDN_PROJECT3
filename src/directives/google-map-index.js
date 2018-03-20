/* global google */

function googleMapIndex() {
  return {
    restrict: 'E',
    replace: true,
    template: '<div class="google-map-index is-full-desktop"></div>',
    scope: {
      center: '=',
      bathroom: '='
    },
    link($scope, $element) {

      const map = new google.maps.Map($element[0], {
        zoom: 8,
        center: { lat: 51.515328, lng: -0.072031 }
      });

      $scope.$watch('bathroom', () => {
        console.log($scope.bathroom);
        $scope.bathroom.forEach(bathroom => showMarkers(bathroom));
      });

      function showMarkers(bathroom){
        const marker = new google.maps.Marker({
          position: {lat: bathroom.location.lat, lng: bathroom.location.lng},
          map: map
        });
        marker.addListener('click', () => {
          showInfoWindow(bathroom, marker);
        });
      }
      function showInfoWindow(bathroom, marker){
        if(infoWindow) infoWindow.close();
        const infoWindow = new google.maps.InfoWindow();
        infoWindow.setContent(`<div><img class="info-marker" src=${bathroom.image}><h1>${bathroom.description}</h1><h1>${bathroom.address}</h1><a href="/#!/bathrooms/${bathroom._id}">Show More</a></div>`);
        infoWindow.open(map, marker);
        map.setCenter(marker.getPosition());
      }
    }
  };
}

export default googleMapIndex;
