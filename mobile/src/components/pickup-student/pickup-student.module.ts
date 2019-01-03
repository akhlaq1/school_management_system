import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PickupStudent } from './pickup-student';

@NgModule({
  declarations: [
    PickupStudent,
  ],
  imports: [
    IonicPageModule.forChild(PickupStudent),
  ],
  exports: [
    PickupStudent
  ]
})
export class PickupStudentModule {}
