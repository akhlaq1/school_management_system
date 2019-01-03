import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FirebaseService } from '../../providers/firebase-service'
import { Login } from '../login/login';
import { Http } from '@angular/http';

import { Geolocation } from '@ionic-native/geolocation';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [FirebaseService]

})
export class HomePage {

  public isPickUpRequested: boolean;
  public isDriver;
  private isLogin = false;
  constructor(private _http: Http, private af: FirebaseService,private geoLocation: Geolocation, public navCtrl: NavController, private navParam: NavParams) {
    this.isPickUpRequested = false;
    if (!this.isLoggedin()) {
      console.log('You are not logged in');
      this.navCtrl.push(Login);
    }
    else {

      if (JSON.parse(localStorage.getItem('currentuser'))['data']) {
        console.log(JSON.parse(localStorage.getItem('currentuser')))
        if (JSON.parse(localStorage.getItem('currentuser'))['data']['roll'] == 'driver') {
          this.isDriver = true;
          this.af.setPosition()
        }
        else if (JSON.parse(localStorage.getItem('currentuser'))['data']['roll'] == 'parent') {
          let object = { emailid: JSON.parse(localStorage.getItem('currentuser'))['data']['email'] }

          this._http.post('https://eschoolweb.herokuapp.com/FindSingleParent', { data: object })
            .map(res => res.json())
            .subscribe(data => {
              console.log('parents', data.data)
              console.log('a', data.data['vanId']);
              let object = { _id: data.data['vanId'] }

              


              this._http.post('https://eschoolweb.herokuapp.com/GetAllVanDoc', { data: { object } })
                .map(res => res.json())
                .subscribe(data => {

                  localStorage.setItem('driverUid', data.data.driverId.uid);
                  this.af.getPosition(data.data.driverId.uid);
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
    localStorage.clear();
  }
  refresh() {
    window.location.reload();
  }
  setLocation(){
    let id =  JSON.parse(localStorage.getItem('currentuser'))['data']['_id'];

    let options = { timeout: 10000, enableHighAccuracy: true }


     this.geoLocation.getCurrentPosition(options).then((res) => {

       let lat = res.coords.latitude
        let lng = res.coords.longitude;


      this._http.post('https://eschoolweb.herokuapp.com/UpdateCoordinates', { data: { match  : id , coordX : lat , coordY : lng  }  }  )
             .map(res => res.json())
          .subscribe(data => {
            if (data) {
              console.log(data)
            }
          })

      console.log(id);
     })
    

  }

}
