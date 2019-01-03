"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require("@angular/core");
var firebase = require("firebase");
var angularfire2_1 = require("angularfire2");
var AppComponent = (function () {
    function AppComponent(_firebaseApp, router, _firebaseService) {
        this._firebaseApp = _firebaseApp;
        this.router = router;
        this._firebaseService = _firebaseService;
        this.isLogin = false;
        var messaging = firebase.messaging();
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
    AppComponent.prototype.logout = function () {
        this._firebaseService.Logout();
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.css'],
    }),
    __param(0, core_1.Inject(angularfire2_1.FirebaseApp))
], AppComponent);
exports.AppComponent = AppComponent;
