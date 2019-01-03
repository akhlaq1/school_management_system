import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav, App, Events } from 'ionic-angular';
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

  rootPage: any = HomePage;


  constructor(
    public events: Events,
    private http: Http,
    public navCtrl: NavController,
    public navParams: NavParams,
    private af: FirebaseService,
    public appCtrl: App
  ) {

  }

  ionViewDidLoad() {
  }

  login(username, password) {


    this.af.Login(username, password)
      .then(res => {

        this.http.post('  https://eschoolweb.herokuapp.com/FindAuthentication', { data: { uid: res['uid'] } })
          .map(res => res.json())
          .subscribe(data => {
            if (data && data.data) {
              let currentuser = data;
              window.localStorage.setItem('currentuser', JSON.stringify(currentuser));

              console.log('User Authentication')
              this.events.publish('user:created', currentuser, Date.now());


              this.http.post('https://eschoolweb.herokuapp.com/FindVanRegistration', { data: { uid: res['uid'] } })
                .map(res => res.json())
                .subscribe(data => {
                  if (data && data.data) {
                    let currentuser = data;

                    window.localStorage.setItem('currentVan', JSON.stringify(currentuser));
                    this.appCtrl.getRootNav().setRoot(HomePage);
                  }
                  else {
                    console.log(data)
                  }
                })

            }
            else {
              console.log(data)
            }
          })
      })
  }
}