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
        center: $scope.center,
        styles: [
          {
            "featureType": "all",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "saturation": 36
              },
              {
                "color": "#000000"
              },
              {
                "lightness": 40
              }
            ]
          },
          {
            "featureType": "all",
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "visibility": "on"
              },
              {
                "color": "#000000"
              },
              {
                "lightness": 16
              }
            ]
          },
          {
            "featureType": "all",
            "elementType": "labels.icon",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "administrative",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "lightness": 20
              }
            ]
          },
          {
            "featureType": "administrative",
            "elementType": "geometry.stroke",
            "stylers": [
              {
                "color": "#000000"
              },
              {
                "lightness": 17
              },
              {
                "weight": 1.2
              }
            ]
          },
          {
            "featureType": "administrative.province",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#e3b141"
              }
            ]
          },
          {
            "featureType": "administrative.locality",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#e0a64b"
              }
            ]
          },
          {
            "featureType": "administrative.locality",
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "color": "#0e0d0a"
              }
            ]
          },
          {
            "featureType": "administrative.neighborhood",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#d1b995"
              }
            ]
          },
          {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#000000"
              },
              {
                "lightness": 20
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#000000"
              },
              {
                "lightness": 21
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "color": "#12120f"
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "lightness": "-77"
              },
              {
                "gamma": "4.48"
              },
              {
                "saturation": "24"
              },
              {
                "weight": "0.65"
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [
              {
                "lightness": 29
              },
              {
                "weight": 0.2
              }
            ]
          },
          {
            "featureType": "road.highway.controlled_access",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#f6b044"
              }
            ]
          },
          {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#4f4e49"
              },
              {
                "weight": "0.36"
              }
            ]
          },
          {
            "featureType": "road.arterial",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#c4ac87"
              }
            ]
          },
          {
            "featureType": "road.arterial",
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "color": "#262307"
              }
            ]
          },
          {
            "featureType": "road.local",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#a4875a"
              },
              {
                "lightness": 16
              },
              {
                "weight": "0.16"
              }
            ]
          },
          {
            "featureType": "road.local",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#deb483"
              }
            ]
          },
          {
            "featureType": "transit",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#000000"
              },
              {
                "lightness": 19
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#0f252e"
              },
              {
                "lightness": 17
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#080808"
              },
              {
                "gamma": "3.14"
              },
              {
                "weight": "1.07"
              }
            ]
          }
        ]
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
