import { GoogleMapsAPIWrapper } from '@agm/core/services/google-maps-api-wrapper';
import { Component, Directive, Input, OnInit } from '@angular/core';
declare var google: any;

@Directive({
    selector: 'app-sebm-google-map-directions',
    exportAs: 'mapdirection'
  })
  export class DirectionsMapDirective implements OnInit {
    @Input() origin;
    @Input() destination;

    constructor (private gmapsApi: GoogleMapsAPIWrapper) {}

    ngOnInit() {
      this.gmapsApi.getNativeMap().then(map => {
                const directionsService = new google.maps.DirectionsService;
                const directionsDisplay = new google.maps.DirectionsRenderer;
                const origin = new google.maps.LatLng(this.origin.lat, this.origin.lon);
                const destination = new google.maps.LatLng(this.destination.lat, this.destination.lon);
                directionsDisplay.setMap(map);
                directionsService.route({
                        origin: origin,
                        destination: destination,
                        waypoints: [],
                        optimizeWaypoints: true,
                        travelMode: 'DRIVING'
                      }, function(response, status) {
                                  if (status === 'OK') {
                                    directionsDisplay.setDirections(response);
                                  } else {
                                    window.alert('Directions request failed due to ' + status);
                                  }
                });

      });
    }

    public hello() {
      console.log('hello');
    }
  }
