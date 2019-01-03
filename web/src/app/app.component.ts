import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router'
import { firebaseService } from './app.firebaseService'
import * as firebase from 'firebase';
import { FirebaseApp } from "angularfire2"


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})

export class AppComponent {

  type;
  uid;
  isLogin = false;
  private _messaging: firebase.messaging.Messaging;
  constructor(
    @Inject(FirebaseApp) private _firebaseApp: firebase.app.App,
    private router: Router,
    private _firebaseService: firebaseService) {



    const messaging = firebase.messaging();
    /*  
        messaging.requestPermission()
          .then(function () {
            console.log('Notification permission granted.');
            // TODO(developer): Retrieve an Instance ID token for use with FCM.
            // ...
          })
          .catch(function (err) {
            console.log('Unable to get permission to notify.', err);
          });
    
    
        messaging.getToken()
          .then(function (currentToken) {
            if (currentToken) {
              console.log(currentToken)
              /* sendTokenToServer(currentToken);
               updateUIForPushEnabled(currentToken);
            } else {
              // Show permission request.
              console.log('No Instance ID token available. Request permission to generate one.');
              // Show permission UI.
              /*updateUIForPushPermissionRequired();
              setTokenSentToServer(false);
            }
          })
          .catch(function (err) {
            console.log('An error occurred while retrieving token. ', err);
            /*showToken('Error retrieving Instance ID token. ', err);
            setTokenSentToServer(false);
          });
    
    
    
        /*this.isLogin = this._firebaseService.isAuthenticated();
        console.log(this.isLogin);
        if (localStorage.getItem('status')) {
          this.type = JSON.parse(localStorage.getItem('status'))['type']
          this.uid = JSON.parse(localStorage.getItem('status'))['uid']
    
          if ((this.type == 'teacher' && this.uid)) {
            this.type = 'teacher';
    
          }
          else if ((this.type == 'student' && this.uid)) {
            this.type = 'student';
          }
          else if ((this.type == 'admin' && this.uid)) {
            this.type = 'admin';
    
          }
        }*/

    /* else {
       this.type = 'visitor';
       this.router.navigate(['/login'])
     }*/


    messaging.onMessage(function (payload) {
      console.log("Message received. ", payload);
      // ...
    });

  }

  logout() {
    this._firebaseService.Logout();

  }
}