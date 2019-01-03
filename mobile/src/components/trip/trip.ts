import { Component, Input , OnChanges } from '@angular/core';
import { FirebaseService } from '../../providers/firebase-service'
/**
 * Generated class for the Trip component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'trip',
  templateUrl: 'trip.html',
  providers: [FirebaseService]
})
export class Trip  implements OnChanges {


  @Input() startTrip : boolean;

  constructor(private af: FirebaseService) {

    console.log(this.startTrip)
 
  }

  ngOnChanges(){

     if(this.startTrip){
       this.af.setPosition()
     }
  }

}
