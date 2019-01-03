"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var app_firebaseService_1 = require("./../app.firebaseService");
var app_Service_1 = require("./../app.Service");
var firebase = require("firebase");
var LoginComponent = (function () {
    function LoginComponent(_firebaseService, _appService, router) {
        this._firebaseService = _firebaseService;
        this._appService = _appService;
        this.router = router;
        this.isLogin = false;
        if (this._firebaseService.isAuthenticated() && localStorage.getItem('status')) {
            this.type = JSON.parse(localStorage.getItem('status'))['type'];
            this.uid = JSON.parse(localStorage.getItem('status'))['uid'];
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
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent.prototype.registration = function () {
        this.router.navigate(['registration']);
    };
    LoginComponent.prototype.login = function (email, pass) {
        var _this = this;
        var messaging = firebase.messaging();
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
                console.log(currentToken);
            }
            else {
                // Show permission request.
                console.log('No Instance ID token available. Request permission to generate one.');
            }
        })
            .catch(function (err) {
            console.log('An error occurred while retrieving token. ', err);
            /*showToken('Error retrieving Instance ID token. ', err);
            setTokenSentToServer(false);*/
        });
        /*    this._firebaseService.Login(email, pass)
              .then((res) => {
                if (res) {
        */
        this._appService.isauthenticate(email, pass)
            .subscribe(function (res) {
            if (res) {
                localStorage.setItem('_id', res['_id']);
                var obj = JSON.stringify({
                    type: res.roll,
                    uid: res.uid
                });
                var token = localStorage.getItem('token');
                _this._appService.sendTokenToServer(token, email)
                    .subscribe(function (res) {
                    console.log(res);
                });
                //if (res.roll == 'student') {
                //}
                localStorage.setItem('status', obj);
                if (res.roll == 'student') {
                    var uid = JSON.parse(localStorage.getItem('status'))['uid'];
                    _this.router.navigate(['student-profile', uid]);
                }
                else if (res.roll == 'teacher') {
                    var uid = JSON.parse(localStorage.getItem('status'))['uid'];
                    _this.router.navigate(['teacher-profile', uid]);
                }
                else if (res.roll == 'admin') {
                    var uid = JSON.parse(localStorage.getItem('status'))['uid'];
                    _this.router.navigate(['dashboard']);
                }
                else if (res.roll == 'parent') {
                    _this.router.navigate(['schoolranking']);
                }
            }
        });
        /*   }
   
         }, (error) => {
           console.log(error);
         })*/
    };
    LoginComponent.prototype.logout = function () {
        this._firebaseService.Logout();
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        selector: 'app-login',
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.css'],
        providers: [app_firebaseService_1.firebaseService, app_Service_1.appService]
    })
], LoginComponent);
exports.LoginComponent = LoginComponent;
