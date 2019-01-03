import { Component, Input, OnChanges, OnInit, } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'pickup',
  templateUrl: 'pickup.html'
})
export class Pickup implements OnInit, OnChanges {

  @Input() isPinSet: boolean;
  @Input() isLoaded: boolean;
  constructor(private geoLocation: Geolocation) {

  }

  ngOnChanges() {

    console.log(this.isLoaded)
    this.showPickupMarker();
  }



  ionViewWillEnter() {
    console.log("I'm alive!");
    // this.showPickupMarker();



  }
  ionViewWillLeave() {
    console.log("Looks like I'm about to leave :(");
  }


  ngOnInit() {
    this.showPickupMarker();


  }

  isMapLoaded(data) {
    console.log(data);
  }


  private pickupMarker: google.maps.Marker;
  @Input() map: google.maps.Map;

  showPickupMarker() {

    let listOfCord = JSON.parse(localStorage.getItem('coordinates'))

    if (listOfCord) {
      this.pickupMarker = listOfCord.map((localtion) => {
        return new google.maps.Marker({
          map: this.map,
          position: new google.maps.LatLng(+localtion.coordX, +localtion.coordY),
          icon: 'img/person-icon.png'
        })
      })
    }
    else{

      this.showMyPosition();



    }

  }

    showMyPosition(){
    let options = { timeout: 10000, enableHighAccuracy: true }
    this.geoLocation.getCurrentPosition(options).then((res) => {
      let lat = res.coords.latitude
      let lng = res.coords.longitude;

      this.pickupMarker = 
         new google.maps.Marker({
          map: this.map,
          position: new google.maps.LatLng(lat,lng),
          icon: 'img/person-icon.png'
        })

    })


    

  }


  /*  ngOnChanges(changes) {
      if (this.isPinSet) {
        this.showPickupMarker();
      }
      else {
        this.removePickupMarker();
      }
  
    }
    showPickupMarker() {
      this.pickupMarker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.BOUNCE,
        position:this.map.getCenter(),
        icon:'img/person-icon.png'
      })
      setTimeout(()=>{
        this.pickupMarker.setAnimation(null);
  
      },750)
    }
    removePickupMarker() {
      if(this.pickupMarker){
        this.pickupMarker.setMap(null)
      }
    }*/

}
