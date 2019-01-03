import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VanProfile } from './van-profile';

@NgModule({
  declarations: [
    VanProfile,
  ],
  imports: [
    IonicPageModule.forChild(VanProfile),
  ],
  exports: [
    VanProfile
  ]
})
export class VanProfileModule {}
