import { Component, ChangeDetectorRef,ViewChild ,ChangeDetectionStrategy} from '@angular/core';
import { Platform, Events,ModalController ,Nav,NavController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {Profile} from '../components/profile/profile'
import { VanProfile } from '../components/van-profile/van-profile'
import {History} from '../components/history/history'
import {PickupStudent} from '../components/pickup-student/pickup-student'
import { HomePage } from '../pages/home/home';
import { Login } from '../pages/login/login';
@Component({
  templateUrl: 'app.html',
  
})
export class MyApp {

  @ViewChild('mycontent') nav: NavController
  rootPage: any = Login;
  userInfo = "abc123";
  

  constructor( private cd: ChangeDetectorRef, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public events: Events) {

   /* events.subscribe('user:created', (user, time) => {
      // user and time are the same arguments passed in `events.publish(user, time)`

      this.userInfo = user.data;

      this.cd.markForCheck();
      console.log(this.userInfo);

    });*/


    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

  }

  profile() {
     this.nav.push(Profile);
 }

  vanProfile() {
     this.nav.push(VanProfile);
 }

  history() {
     this.nav.push(History);
 }

  pickupStudent() {
     this.nav.push(PickupStudent);
 }

}

