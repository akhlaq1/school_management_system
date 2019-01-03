import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase';
import { Geolocation } from '@ionic-native/geolocation';
import { Platform } from 'ionic-angular';
import { Http } from '@angular/http';
import { Observable, Observer } from 'rxjs'

@Injectable()
export class FirebaseService {

  date;

  public pickup$: Observable<any>;
  private _observer: Observer<any>;

  constructor(
    private http: Http,
    private platform: Platform,
    private geolocation: Geolocation,
    private db: AngularFireDatabase,
    public af: AngularFireAuth) {

    /*
          this.pickup$ = new Observable(observer =>{
            this._observer = observer;
          })
          .share();*/

  }

  watch() {
    return this.pickup$;
  }

  Login(username, password) {
    return this.af.auth.signInWithEmailAndPassword(username, password)
  }

  updateLocation() {
  }

  getDate() {

    return this.http.get(' https://eschoolweb.herokuapp.com/getDate')
      .map(res => res.json())
  }

  getTrip(date) {
    let uid = JSON.parse(localStorage.getItem('currentuser'))['data']['uid'];
    const Trip = this.db.list(`/trip/` + uid + '/' + date)
    Trip.push({ startTime: date })
    return Trip;

  }
  getDriver(): Observable<any> {
    let driverUid = localStorage.getItem('driverUid');
    return this.db.object(`trip/${driverUid}`)

  }

  getTripPosition(response, lat, lng,pos): Observable<any> {
    console.log('response',response) 
    let tripPosition = this.db.list(`/positions/${response}`)
    tripPosition.push({ lat: lat, lng: lng,pos : pos })
    return tripPosition;
  }
  setPickedUpStudents(date,session ,students) {
    let uid = JSON.parse(localStorage.getItem('currentuser'))['data']['uid'];
    const Trip = this.db.object(`/trip/` + uid + '/' + date + '/'+session)
    Trip.set(students);
    return Trip;
  }

  setPosition() {

    let options = {
      enableHighAccuracy: false,
      timeout: 1000,
      maximumAge: 0
    };

    this.getDate()
      .subscribe((item) => {

        this.date = item.date

        /*        let uid = JSON.parse(localStorage.getItem('currentuser'))['data']['uid']
                this.platform.ready().then(() => {
                  let tripObservable = this.db.list('/trip/' + uid + '/' + this.date)
                  this.geolocation.watchPosition()
                    .subscribe(pos => {
                      tripObservable.push({ startTime: this.date })
                      tripObservable.subscribe(() => {
                      })
                    })
                })*/



        let uid = JSON.parse(localStorage.getItem('currentuser'))['data']['uid']
        this.platform.ready().then(() => {

          let tripObservable = this.db.list('/trip/' + uid + '/' + this.date)

          tripObservable.push({ startTime: this.date })

          tripObservable.subscribe((response) => {

            const watch = this.geolocation.watchPosition()

              .subscribe(pos => {
                let last = response.length - 1;

                localStorage.setItem('sessionId', response[last]['$key'])
                localStorage.setItem('date', this.date)
                localStorage.setItem('uid', uid)

                let tripPosition = this.db.list(`/positions/${response[last]['$key']}`)
                tripPosition.push({ lat: pos.coords.latitude, lng: pos.coords.longitude });
                tripPosition.subscribe((res) => {

                })

                //      this.getPosition();


              })

          })
        })

      })


  }
  getPosition(sessionId): Observable<any> {

    return this.db.list(`/positions/${sessionId}/`)

  }

  getStartedTrip(driverId): Observable<any> {

    return this.db.list(`/trip/${driverId}`);

  }
  getStartTripDate(driverId, date): Observable<any> {
    return this.db.list(`/trip/${driverId}/${date}`);
  }


  getTripHistory(driverId, date): Observable<any> {
    return this.db.object(`/trip/${driverId}/${date}`);
  }
  getTripHistroyPosition(sessionId): Observable<any> {
    return this.db.object(`/positions/${sessionId}/`)
  }

}
