import { Component, OnInit } from '@angular/core';

import { routesService } from './routesService'

@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.css'],
  providers: [routesService]
})
export class RoutesComponent implements OnInit, OnInit {


  directionService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  waypts = [];
  map;
  origin;
  _waypts = [];
 destination;

  geocoder = new google.maps.Geocoder;




  constructor(private _routeService: routesService) {

      this.geocoder.geocode(
      {
        'location':
        {
          lat: parseFloat(JSON.parse(localStorage.getItem('Info'))['coordX']),
          lng: parseFloat(JSON.parse(localStorage.getItem('Info'))['coordY'])
        }
      },
      (results, status) => {
        if (results[0]) {
          console.log(results[0].formatted_address)
          this.origin = results[0].formatted_address
        }
      })

     console
     .log(this.origin);


    //  this.map = new google.maps.Map(document.getElementById('map'), {
    //         zoom: 6,
    //         center: {lat: 41.85, lng: -87.65}
    //  });
    //  


  }

  ngOnInit() {

   console.log(this.origin)

    this._routeService.FindBusStop().subscribe((data) => {

      this.waypts = data
    })

    //  this.waypts.push({
    //             location: 'Darulislam',
    //             stopover: true
    //           }
    //           );

    this.map = this.createMap({ lat: JSON.parse(localStorage.getItem('Info'))['coordX'], lng: JSON.parse(localStorage.getItem('Info'))['coordY']})

    this.directionsDisplay.setMap(this.map);

  }

  createMap(location?) {
    let mapOption = {
      center: location,
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true
    }

    let mapEl = document.getElementById('map')
    let map = new google.maps.Map(mapEl, mapOption);

    return map;
  }

  submit(waypoints) {
    console.log(waypoints);

    for (var i = 0; i < waypoints.length; i++) {
      if (waypoints.options[i].selected) {
        this._waypts.push({
          location: waypoints[i].value,
          stopover: true
        });
      }
    }

   this.calculateAndDisplayRoute(this.directionService, this.directionsDisplay);
  }

  updateSelectedValue(event) {
    console.log(event);
  }



  calculateAndDisplayRoute(directionsService, directionsDisplay) {




    directionsService.route({
      origin: this.origin,
      destination: this.destination,
      waypoints: this._waypts,
      optimizeWaypoints: true,
      travelMode: google.maps.TravelMode.DRIVING
    }, (response, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
        var route = response.routes[0];
        var summaryPanel = document.getElementById('directions-panel');
        summaryPanel.innerHTML = '';
        // For each route, display summary information.
        for (var i = 0; i < route.legs.length; i++) {
          var routeSegment = i + 1;
          summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment +
            '</b><br>';
          summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
          summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
          summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
        }
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    })

  }
  saveStop(routeName) {
    this._routeService.saveBusStop(routeName)
      .subscribe((res) => {
        console.log(res)
      })
  }
  saveRoute(title){


  // console.log(  title.value,this._waypts,this.origin , this.destination );
   this._routeService.saveRoute(title.value,this._waypts,this.origin,this.destination)
     .subscribe((item)=>{
        console.log(item)
     })

  }


}
