import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Driver } from './driver';

@NgModule({
  declarations: [
    Driver,
  ],
  imports: [
    IonicPageModule.forChild(Driver),
  ],
  exports: [
    Driver
  ]
})
export class DriverModule {}
