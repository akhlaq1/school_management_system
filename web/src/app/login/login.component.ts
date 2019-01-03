import { Component, OnInit } from '@angular/core';
import { firebaseService } from './../app.firebaseService';
import { appService } from './../app.Service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { MdSnackBar } from '@angular/material';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [firebaseService, appService]
})
export class LoginComponent implements OnInit {

  private isLogin = false;

  type;
  uid;
  isLoading = false;

  ngOnInit() {

  }
  constructor(
    private snackBar: MdSnackBar,
    private _firebaseService: firebaseService,
    private _appService: appService,
    private router: Router
  ) {

    if (this._firebaseService.isAuthenticated() && localStorage.getItem('status')) {
      this.type = JSON.parse(localStorage.getItem('status'))['type']
      this.uid = JSON.parse(localStorage.getItem('status'))['uid']
      if (this.type == 'teacher') {
        this.router.navigate(['/teacher']);
      }
      else if (this.type == 'student') {
        this.router.navigate(['student-profile', this.uid]);
      }
      else if (this.type == 'admin') {
        this.router.navigate(['dashboard']);
      }
      else if (this.type == 'parent') {
        this.router.navigate(['schoolranking']);
      }

    }



    /*let _status = JSON.parse(localStorage.getItem('status'));
    console.log(_status);
    if (_status.type == 'student') {
      this.router.navigate(['student-profile'], _status.uid);
    }
*/

    /*if (!this._firebaseService.af.auth) {
      this.isLogin = false;
    }*/
  }

  registration(): void {
    this.router.navigate(['registration']);
  }
  login(email, pass): any {

    this.isLoading = true
    const messaging = firebase.messaging();
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

          localStorage.setItem('token', currentToken);
          console.log(currentToken)
          /* sendTokenToServer(currentToken);
           updateUIForPushEnabled(currentToken); */
        } else {
          // Show permission request.
          console.log('No Instance ID token available. Request permission to generate one.');
          // Show permission UI.
          /*updateUIForPushPermissionRequired();
          setTokenSentToServer(false);*/
        }
      })
      .catch(function (err) {

        console.log('An error occurred while retrieving token. ', err);
        /*showToken('Error retrieving Instance ID token. ', err);
        setTokenSentToServer(false);*/
      });






    this._firebaseService.Login(email, pass)
      .then((res) => {
        if (res) {

          this._appService.isauthenticate(email, pass)


            .subscribe((res) => {

              if (res) {

                this.isLoading = false;
                localStorage.setItem('_id', res['_id'])

                let obj = JSON.stringify({
                  type: res.roll,
                  uid: res.uid
                });

                let token = localStorage.getItem('token')
                this._appService.sendTokenToServer(token, email)
                  .subscribe((res) => {

                    localStorage.setItem('Info',JSON.stringify(res))


                    

                    console.log(res);
                  })




                //if (res.roll == 'student') {

                //}
                localStorage.setItem('status', obj);

                if (res.roll == 'student') {


                  let uid = JSON.parse(localStorage.getItem('status'))['uid']
                  this.router.navigate(['student-profile', uid]);
                }
                else if (res.roll == 'teacher') {
                  let uid = JSON.parse(localStorage.getItem('status'))['uid']
                  this.router.navigate(['teacher-profile', uid]);
                }
                else if (res.roll == 'admin') {
                  let uid = JSON.parse(localStorage.getItem('status'))['uid']
                  this.router.navigate(['dashboard']);
                }
                else if (res.roll == 'parent') {

                  localStorage.setItem('image', res.img)
                  this.router.navigate(['schoolranking']);
                }
              }
            }, (error) => {
              this.isLoading = false;
              alert(error);
              console.log(error);
            })
        }

      }, (error) => {
        this.isLoading = false;
        alert(error);
        console.log(error);
      })



  }
  logout(): any {
    this._firebaseService.Logout();
    localStorage.clear();
  }



}
