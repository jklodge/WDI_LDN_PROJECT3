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
        zoom: 16,
        center: $scope.center,
        styles: [
          {
            'featureType': 'all',
            'elementType': 'labels.text.fill',
            'stylers': [
              {
                'saturation': 36
              },
              {
                'color': '#000000'
              },
              {
                'lightness': 40
              }
            ]
          },
          {
            'featureType': 'all',
            'elementType': 'labels.text.stroke',
            'stylers': [
              {
                'visibility': 'on'
              },
              {
                'color': '#000000'
              },
              {
                'lightness': 16
              }
            ]
          },
          {
            'featureType': 'all',
            'elementType': 'labels.icon',
            'stylers': [
              {
                'visibility': 'off'
              }
            ]
          },
          {
            'featureType': 'administrative',
            'elementType': 'geometry.fill',
            'stylers': [
              {
                'lightness': 20
              }
            ]
          },
          {
            'featureType': 'administrative',
            'elementType': 'geometry.stroke',
            'stylers': [
              {
                'color': '#000000'
              },
              {
                'lightness': 17
              },
              {
                'weight': 1.2
              }
            ]
          },
          {
            'featureType': 'administrative.province',
            'elementType': 'labels.text.fill',
            'stylers': [
              {
                'color': '#e3b141'
              }
            ]
          },
          {
            'featureType': 'administrative.locality',
            'elementType': 'labels.text.fill',
            'stylers': [
              {
                'color': '#e0a64b'
              }
            ]
          },
          {
            'featureType': 'administrative.locality',
            'elementType': 'labels.text.stroke',
            'stylers': [
              {
                'color': '#0e0d0a'
              }
            ]
          },
          {
            'featureType': 'administrative.neighborhood',
            'elementType': 'labels.text.fill',
            'stylers': [
              {
                'color': '#d1b995'
              }
            ]
          },
          {
            'featureType': 'landscape',
            'elementType': 'geometry',
            'stylers': [
              {
                'color': '#000000'
              },
              {
                'lightness': 20
              }
            ]
          },
          {
            'featureType': 'poi',
            'elementType': 'geometry',
            'stylers': [
              {
                'color': '#000000'
              },
              {
                'lightness': 21
              }
            ]
          },
          {
            'featureType': 'road',
            'elementType': 'labels.text.stroke',
            'stylers': [
              {
                'color': '#12120f'
              }
            ]
          },
          {
            'featureType': 'road.highway',
            'elementType': 'geometry.fill',
            'stylers': [
              {
                'lightness': '-77'
              },
              {
                'gamma': '4.48'
              },
              {
                'saturation': '24'
              },
              {
                'weight': '0.65'
              }
            ]
          },
          {
            'featureType': 'road.highway',
            'elementType': 'geometry.stroke',
            'stylers': [
              {
                'lightness': 29
              },
              {
                'weight': 0.2
              }
            ]
          },
          {
            'featureType': 'road.highway.controlled_access',
            'elementType': 'geometry.fill',
            'stylers': [
              {
                'color': '#f6b044'
              }
            ]
          },
          {
            'featureType': 'road.arterial',
            'elementType': 'geometry',
            'stylers': [
              {
                'color': '#4f4e49'
              },
              {
                'weight': '0.36'
              }
            ]
          },
          {
            'featureType': 'road.arterial',
            'elementType': 'labels.text.fill',
            'stylers': [
              {
                'color': '#c4ac87'
              }
            ]
          },
          {
            'featureType': 'road.arterial',
            'elementType': 'labels.text.stroke',
            'stylers': [
              {
                'color': '#262307'
              }
            ]
          },
          {
            'featureType': 'road.local',
            'elementType': 'geometry',
            'stylers': [
              {
                'color': '#a4875a'
              },
              {
                'lightness': 16
              },
              {
                'weight': '0.16'
              }
            ]
          },
          {
            'featureType': 'road.local',
            'elementType': 'labels.text.fill',
            'stylers': [
              {
                'color': '#deb483'
              }
            ]
          },
          {
            'featureType': 'transit',
            'elementType': 'geometry',
            'stylers': [
              {
                'color': '#000000'
              },
              {
                'lightness': 19
              }
            ]
          },
          {
            'featureType': 'water',
            'elementType': 'geometry',
            'stylers': [
              {
                'color': '#0f252e'
              },
              {
                'lightness': 17
              }
            ]
          },
          {
            'featureType': 'water',
            'elementType': 'geometry.fill',
            'stylers': [
              {
                'color': '#080808'
              },
              {
                'gamma': '3.14'
              },
              {
                'weight': '1.07'
              }
            ]
          }
        ]
      });

      let infoWindow = null;
      const mapMarkers = [];

      $scope.$watch('center', () => map.setCenter($scope.center), true);

      $scope.$watch('bathroom', () => {
        $scope.bathroom;
        console.log('bathrooms scope', $scope.bathroom);
        infoWindow = new google.maps.InfoWindow();
        mapMarkers.forEach(marker => marker.setMap(null));
        $scope.bathroom.forEach(bathroom => showMarkers(bathroom));
      });

      function showMarkers(bathroom){
        const marker = new google.maps.Marker({
          position: {lat: bathroom.location.lat, lng: bathroom.location.lng},
          icon: 'https://findicons.com/files/icons/2698/free_mobile_icon_kit/48/restrooms.png',
          map: map
        });
        mapMarkers.push(marker);
        marker.addListener('click', () => {
          showInfoWindow(bathroom, marker);
        });
      }
      function showInfoWindow(bathroom, marker){
        infoWindow.close();
        infoWindow.setContent(`<div><img class='info-marker' src=${bathroom.image}><h1>${bathroom.description}</h1><h1>${bathroom.address}</h1><a href='/#!/bathrooms/${bathroom._id}'>Show More</a></div>`);
        infoWindow.open(map, marker);
        map.setCenter(marker.getPosition());
      }
    }
  };
}

export default googleMapIndex;
