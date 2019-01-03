import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Login } from './login';
import {HomePage} from '../home/home'

@NgModule({
  declarations: [
    Login,
    HomePage
  ],
  imports: [
    IonicPageModule.forChild(Login),
  ],
  exports: [
    Login
  ]
})
export class LoginModule {}
