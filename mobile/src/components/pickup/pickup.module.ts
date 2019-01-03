import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Pickup } from './pickup';

@NgModule({
  declarations: [
    Pickup,
  ],
  imports: [
    IonicPageModule.forChild(Pickup),
  ],
  exports: [
    Pickup
  ]
})
export class PickupModule {}
