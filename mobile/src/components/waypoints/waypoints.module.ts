import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Waypoints } from './waypoints';

@NgModule({
  declarations: [
    Waypoints,
  ],
  imports: [
    IonicPageModule.forChild(Waypoints),
  ],
  exports: [
    Waypoints
  ]
})
export class WaypointsModule {}
