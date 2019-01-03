import { Component, OnInit ,Input} from '@angular/core';

@Component({
  selector: 'waypoints',
  templateUrl: 'waypoints.html'
})
export class Waypoints implements OnInit {


  directionService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
   @Input() map : google.maps.Map;
  constructor() {

  }
  ngOnInit() {
        this.directionsDisplay.setMap(this.map);
     
    this.calculateAndDisplayRoute(this.directionService, this.directionsDisplay);

    
  }




  calculateAndDisplayRoute(directionsService, directionsDisplay) {





    let van = JSON.parse(localStorage.getItem('currentVan'));
    if (van) {

       let data = van.data[0].routeId;

       console.log(data.waypoints[0]);
      directionsService.route({
        origin: data.origin,
        destination: data.destination,
        waypoints: data.waypoints[0],
        optimizeWaypoints: true,
        travelMode: google.maps.TravelMode.DRIVING
      }, (response, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(response);
          var route = response.routes[0];

        }     
    
      })

    }
   }

  }
