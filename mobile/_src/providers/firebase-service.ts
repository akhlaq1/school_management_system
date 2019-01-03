import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { Geolocation } from '@ionic-native/geolocation';
import { Platform } from 'ionic-angular';

@Injectable()
export class FirebaseService {


  constructor(private platform: Platform, private geolocation: Geolocation, private db: AngularFireDatabase, public af: AngularFireAuth) {


  }

  Login(username, password) {
    return this.af.auth.signInWithEmailAndPassword(username, password)
  }

  updateLocation() {
  }

  setPosition() {
    let uid = JSON.parse(localStorage.getItem('currentuser'))['data']['uid']
    this.platform.ready().then(() => {

        this.geolocation.getCurrentPosition()
          .then(pos => {
            console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
          });

        const watch = this.geolocation.watchPosition().subscribe(pos => {
          console.log(pos);
          const itemObservable = this.db.object('/position/' + uid);
          itemObservable.set({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          console.log(pos.coords.latitude, pos.coords.longitude);
        
        })
        
        
      // get current position


      // to stop watching
      //watch.unsubscribe();

    });

  }
  getPosition(uid) {
    return this.db.list('position/' + uid)
  }

}
