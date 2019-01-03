import { Component, OnInit, Input } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { LoadingController, NavController } from 'ionic-angular'
import { Observable } from 'rxjs/Observable'
@Component({
  selector: 'map',
  templateUrl: 'map.html'
})
export class Map implements OnInit {

  constructor(private loading: LoadingController, nav: NavController, private geoLocation: Geolocation) {
      

  }


  @Input() isPickUpRequested: boolean;
  @Input() isDriver: boolean;

  public map: google.maps.Map;
  public isMapIdle: boolean;

  ngOnInit() {

    this.map = this.createMap();
   // this.addEventListeners();

    this.getCurrentLocation().subscribe(location => {
      //this.map.panTo(location)
      this.centerLocation(location);
    })

  }

 /* addEventListeners() {
    google.maps.event.addListener(this.map, 'dragstart', () => {
      this.isMapIdle = false;
    })
    google.maps.event.addListener(this.map, 'idle', () => {
      this.isMapIdle = true;
    })
  }*/
  createMap(location?) {
    let mapOption = {
      center: location,
      zoom: 18,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true
    }

    let mapEl = document.getElementById('map')
    let map = new google.maps.Map(mapEl, mapOption);

    return map;
  }
  getCurrentLocation(): Observable<any> {

    let loading = this.loading.create({
      content: 'loading'
    });


    let options = { timeout: 10000, enableHighAccuracy: true }

    let locationObservable = Observable.create(observable => {
      this.geoLocation.getCurrentPosition(options).then((res) => {
        let lat = res.coords.latitude
        let lng = res.coords.longitude;

        let location = new google.maps.LatLng(lat, lng)

        console.log(lat, lng);
        observable.next(location);

        loading.dismiss();

      }, (error) => {
        console.log('geoLocation error', error)
        loading.dismiss();
      })

    })

    return locationObservable;
  }

  centerLocation(location) {
    if (location) {
      this.map.panTo(location);
    }
    else {
      this.getCurrentLocation().subscribe(currentLocation => {
        this.map.panTo(currentLocation);
      })
    }
  }



}
