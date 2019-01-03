import { Component, Input, OnInit } from '@angular/core';
import { FirebaseService } from '../../providers/firebase-service'

@Component({
  selector: 'driver',
  templateUrl: 'driver.html',
  providers: [FirebaseService],

})
export class Driver implements OnInit {

  @Input() map: google.maps.Map;
  @Input() isDriver: boolean;

  private driverlat;
  private driverlong;


  private pickupMarker: google.maps.Marker;

  constructor(private af: FirebaseService) {

  }
  ngOnInit() {
    this.updatePostion()

  }

  updatePostion() {
    let uid = localStorage.getItem('driverUid')
    this.af.getPosition(uid)
      .subscribe((res) => {
        if(res){
        this.driverlat = res[0]['$value'];
        this.driverlong = res[1]['$value'];
        this.showDriverMarker(this.driverlat,this.driverlong);
        }
      })
  }
  showPickupMarker() {

    let location = new google.maps.LatLng(this.driverlat, this.driverlong)

    this.pickupMarker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.BOUNCE,
      position: location,
      icon: 'img/person-icon.png'
    })
    setTimeout(() => {
      this.pickupMarker.setAnimation(null);

    }, 750)
  }

  showDriverMarker(a,b) {

    let location = new google.maps.LatLng(a,b)

    this.pickupMarker = new google.maps.Marker({
      map: this.map,
      //animation: google.maps.Animation.DROP,
      position: location,
      icon: 'img/bus-icon.png'
    })
    setTimeout(() => {
      this.pickupMarker.setAnimation(null);

    }, 750)
  }


}
