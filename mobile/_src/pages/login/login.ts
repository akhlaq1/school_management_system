import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseService } from '../../providers/firebase-service'
import { Http } from '@angular/http'
import { HomePage } from '../home/home'

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [FirebaseService]

})
export class Login {

  constructor(
    private http: Http,
    public navCtrl: NavController,
    public navParams: NavParams,
    private af: FirebaseService
  ) {

  }

  ionViewDidLoad() {

  }
  login(username, password) {


    this.af.Login(username, password)
      .then(res => {
       
        this.http.post('https://eschoolweb.herokuapp.com/FindAuthentication', { data: { uid: res['uid'] } })
          .map(res => res.json())
          .subscribe(data => {
            if (data && data.data) {
              let currentuser = data;
              window.localStorage.setItem('currentuser', JSON.stringify(currentuser));
              this.navCtrl.pop();
            }
            else{
              console.log(data)
            }
          })
      })
  }
}