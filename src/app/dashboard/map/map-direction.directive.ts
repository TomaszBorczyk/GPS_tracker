import { GoogleMapsAPIWrapper } from '@agm/core/services/google-maps-api-wrapper';
import { Component, Directive, Input, OnDestroy, OnInit } from '@angular/core';
declare var google: any;

@Directive({
    selector: 'app-sebm-google-map-directions',
    exportAs: 'mapdirection'
  })
  export class DirectionsMapDirective implements OnInit, OnDestroy {
    @Input() origin;
    @Input() destination;

    private directionsService;
    private directionsDisplay;

    constructor (private gmapsApi: GoogleMapsAPIWrapper) {}

    ngOnInit() {
      this.gmapsApi.getNativeMap()
        .then(map => {
            this.directionsService = new google.maps.DirectionsService;
            this.directionsDisplay = new google.maps.DirectionsRenderer;
            const origin = new google.maps.LatLng(this.origin.lat, this.origin.lon);
            const destination = new google.maps.LatLng(this.destination.lat, this.destination.lon);
            this.directionsDisplay.setMap(map);
            this.directionsService.route(
                  {
                    origin: origin,
                    destination: destination,
                    waypoints: [],
                    optimizeWaypoints: true,
                    travelMode: 'DRIVING'
                  },
                  (response, status) => {
                      if (status === 'OK') {
                        this.directionsDisplay.setDirections(response);
                      } else {
                        window.alert('Directions request failed due to ' + status);
                      }
                  });

        });
    }

    ngOnDestroy() {
      this.directionsDisplay.setDirections({routes: []});
    }
  }
