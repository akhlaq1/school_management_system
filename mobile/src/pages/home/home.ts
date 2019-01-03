import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { FirebaseService } from '../../providers/firebase-service'
import { Login } from '../login/login';
import { Http } from '@angular/http';

import { Geolocation } from '@ionic-native/geolocation';
import { MenuController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [FirebaseService]

})
export class HomePage implements OnInit {

  public isPickUpRequested = null;
  public isDriver = false;
  private isLogin = false;
  private startTripOption = false;


  public userData;


  ngOnInit() {

  }

  constructor(public appCtrl: App, public menuCtrl: MenuController, private _http: Http, private af: FirebaseService, private geoLocation: Geolocation, public navCtrl: NavController, private navParam: NavParams) {

    //this.isPickUpRequested = false;

    if (!this.isLoggedin()) {
      console.log('You are not logged in');
      this.navCtrl.push(Login);
    }
    else {

      if (JSON.parse(localStorage.getItem('currentuser'))['data']) {
        console.log(JSON.parse(localStorage.getItem('currentuser')))
        if (JSON.parse(localStorage.getItem('currentuser'))['data']['roll'] == 'driver') {

          this.startTripOption = true;
          this.isDriver = true;

          let driverUid = JSON.parse(localStorage.getItem('currentuser'))['data']['uid']

          this._http.post(' https://eschoolweb.herokuapp.com/GetAllVanDoc', { data: { driverUid: driverUid } })
            .map(res => res.json())
            .subscribe(res => {

              console.log('1',res.data.driverUid)


              this.userData = res.data.driverUid;

              localStorage.setItem('vanInfo', JSON.stringify(res.data));


              this._http.post(' https://eschoolweb.herokuapp.com/FindAllParent', { data: { vanId: res.data._id } })
                .map(res => res.json())
                .subscribe(res => {

                  let cordArray = [];

                  res.data.forEach((item) => {
                    this._http.post(' https://eschoolweb.herokuapp.com/FindAuthentication',
                      { data: { email: item.emailid } })
                      .map(res => res.json())
                      .subscribe(res => {

                        if (res.data) {
                          let object = {
                            coordX: res.data.coordX,
                            coordY: res.data.coordY,
                            username: res.data.username
                          }

                          cordArray.push(object)
                          localStorage.setItem('coordinates', JSON.stringify(cordArray))
                        }
                      })
                  })
                })

            })
          localStorage.setItem('driverUid', driverUid);

          //  this.af.setPosition()
        }
        else if (JSON.parse(localStorage.getItem('currentuser'))['data']['roll'] == 'parent') {


          this.startTripOption = false;


          let object = { emailid: JSON.parse(localStorage.getItem('currentuser'))['data']['email'] }

          this._http.post(' https://eschoolweb.herokuapp.com/FindSingleParent', { data: object })
            .map(res => res.json())
            .subscribe(data => {

              let object = { _id: data.data['vanId'] }

              this._http.post(' https://eschoolweb.herokuapp.com/GetAllVanDoc', { data: { object } })
                .map(res => res.json())
                .subscribe(data => {

                  this.userData = data.data.driverUid;
                  localStorage.setItem('vanInfo', JSON.stringify(data.data));
                  localStorage.setItem('driverUid', data.data.driverUid);


                })

            })

          console.log(JSON.parse(localStorage.getItem('currentuser')))
          this.isDriver = false;
        }
        else {
          console.log('somthing went wrong');
        }
      }
    }
  }

  openMenu() {
    console.log('click')
    this.menuCtrl.open();
  }

  confirmPickUp() {
    this.isPickUpRequested = true;
  }
  cancelPickUp() {
    this.isPickUpRequested = false;
  }
  isLoggedin() {
    if (window.localStorage.getItem('currentuser')) {
      return true;
    }
  }
  logout() {
    this.appCtrl.getRootNav().setRoot(HomePage);
    localStorage.clear();
  }
  refresh() {
    window.location.reload();
  }
  setLocation() {
    let id = JSON.parse(localStorage.getItem('currentuser'))['data']['_id'];

    let options = { timeout: 10000, enableHighAccuracy: true }


    this.geoLocation.getCurrentPosition(options).then((res) => {

      let lat = res.coords.latitude
      let lng = res.coords.longitude;


      this._http.post(' https://eschoolweb.herokuapp.com/UpdateCoordinates', { data: { match: id, coordX: lat, coordY: lng } })
        .map(res => res.json())
        .subscribe(data => {
          if (data) {
            console.log(data)
          }
        })

      console.log(id);
    })


  }



  endTrip() {
    this.startTripOption = true;
    this.isPickUpRequested = false;
  }

  startTrip() {
    this.startTripOption = false;
    this.isPickUpRequested = true;

  }

}
