import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Geolocation } from '@ionic-native/geolocation';
import { DeviceOrientation } from '@ionic-native/device-orientation';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Map } from '../components/map/map'
import { Pickup } from '../components/pickup/pickup'
import { Driver } from '../components/driver/driver'
import { Trip } from '../components/trip/trip'
import { Login } from '../pages/login/login';
import { Profile } from '../components/profile/profile'
import { VanProfile } from '../components/van-profile/van-profile'
import { History } from '../components/history/history'
import { Waypoints } from '../components/waypoints/waypoints'
import { PickupStudent } from '../components/pickup-student/pickup-student'
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { HttpModule } from '@angular/http';
import { FirebaseService } from '../providers/firebase-service'
import { AngularFireDatabase } from 'angularfire2/database';


export const firebaseConfig = {
  apiKey: "AIzaSyCuZRR_WkQxHZOtpZqSQUF1MogJ-eZhOT8",
  authDomain: "school-web-7d8e8.firebaseapp.com",
  databaseURL: "https://school-web-7d8e8.firebaseio.com",
  storageBucket: "school-web-7d8e8.appspot.com",
  messagingSenderId: "1049476182454"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Map,
    Pickup,
    Login,
    Driver,
    Trip,
    VanProfile,
    Profile,
    History,
    PickupStudent,
    Waypoints
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseConfig),
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Map,
    Pickup,
    Login,
    Driver,
    Trip,
    VanProfile,
    Profile,
    History,
    PickupStudent,
    Waypoints
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    FirebaseService,
    AngularFireAuth,
    AngularFireDatabase,
    DeviceOrientation,

    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
