"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var angularfire2_1 = require("angularfire2");
var core_1 = require("@angular/core");
var firebase = require("firebase");
var firebaseService = (function () {
    function firebaseService(_http, af, _router, _location) {
        this._http = _http;
        this.af = af;
        this._router = _router;
        this._location = _location;
    }
    firebaseService.prototype.UpdateFirebaseUser = function (email, password) {
        var user = firebase.auth().currentUser;
        user.updateEmail(email).then(function () {
            // Update successful.
        }, function (error) {
            // An error happened.
        });
        user.updatePassword(password).then(function () {
            // Update successful.
        }, function (error) {
            // An error happened.
        });
    };
    firebaseService.prototype.CreateFirebaseUser = function (uid) {
        var ans = this.af.database.list('/users');
        ans.push({ uid: uid });
    };
    firebaseService.prototype.back = function () {
        this._location.back();
    };
    firebaseService.prototype.isAuthenticated = function () {
        var _this = this;
        this.af.auth
            .subscribe(function (user) {
            if (user) {
                _this.login = true;
            }
            else {
                _this.login = false;
            }
        });
        return this.login;
        /*
       var user = this.af.auth().currentUser;
         if(user){
             return true;
         } else {
             return false
         }*/
    };
    firebaseService.prototype.CreateUser = function (username, password) {
        return this.af.auth.createUser({
            email: username,
            password: password,
        });
    };
    firebaseService.prototype.Login = function (username, password) {
        return this.af.auth.login({
            email: username,
            password: password,
        }, {
            provider: angularfire2_1.AuthProviders.Password,
            method: angularfire2_1.AuthMethods.Password,
        })
            .catch(function (res) {
            console.log(res);
        });
    };
    firebaseService.prototype.Logout = function () {
        this.af.auth.logout();
        //   localStorage.clear();
        this._router.navigate(['/login']);
    };
    firebaseService.prototype.createSubject = function (name) {
    };
    return firebaseService;
}());
firebaseService = __decorate([
    core_1.Injectable()
], firebaseService);
exports.firebaseService = firebaseService;
