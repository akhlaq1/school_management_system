import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'pickup',
  templateUrl: 'pickup.html'
})
export class Pickup implements OnChanges {

  @Input() isPinSet: boolean;
  constructor() {

  }
  private pickupMarker: google.maps.Marker;
  @Input() map: google.maps.Map;
  ngOnChanges(changes) {
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
  }

}
