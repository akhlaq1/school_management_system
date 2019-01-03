"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var ionic_angular_1 = require("ionic-angular");
var firebase_service_1 = require("../../providers/firebase-service");
var Login = (function () {
    function Login(http, navCtrl, navParams, af) {
        this.http = http;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.af = af;
    }
    Login.prototype.ionViewDidLoad = function () {
    };
    Login.prototype.login = function (username, password) {
        var _this = this;
        this.af.Login(username, password)
            .then(function (res) {
            _this.http.post('https://eschoolweb.herokuapp.com/FindAuthentication', { data: { uid: res['uid'] } })
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                if (data && data.data) {
                    var currentuser = data;
                    window.localStorage.setItem('currentuser', JSON.stringify(currentuser));
                    _this.navCtrl.pop();
                }
                else {
                    console.log(data);
                }
            });
        });
    };
    return Login;
}());
Login = __decorate([
    ionic_angular_1.IonicPage(),
    core_1.Component({
        selector: 'page-login',
        templateUrl: 'login.html',
        providers: [firebase_service_1.FirebaseService]
    })
], Login);
exports.Login = Login;
