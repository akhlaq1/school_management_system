import { Component } from '@angular/core';
import { FirebaseService } from '../../providers/firebase-service'
import { NavController, Events } from 'ionic-angular';
import { HomePage } from '../../pages/home/home'

@Component({
  selector: 'history',
  templateUrl: 'history.html'
})
export class History {

  dates = [];

  constructor(private events : Events , private fb: FirebaseService, public navCtrl: NavController) {


    this.getAllVanData();
  }

  getAllVanData() {
    this.fb.getDriver().subscribe((data) => {
      let d = Object.keys(data);
      
      this.dates = d;
      //this.dates = data;   
      // this.dates =  Object.keys(data).map(function (key) { return data[key]; });
    })
  }
  getHistory(date) {
    this.events.publish('user:history', date, Date.now());
    this.navCtrl.pop(); 

  }




}
