"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var firebase_service_1 = require("../../providers/firebase-service");
var login_1 = require("../login/login");
var HomePage = (function () {
    function HomePage(_http, af, navCtrl, navParam) {
        var _this = this;
        this._http = _http;
        this.af = af;
        this.navCtrl = navCtrl;
        this.navParam = navParam;
        this.isLogin = false;
        this.isPickUpRequested = false;
        if (!this.isLoggedin()) {
            console.log('You are not logged in');
            this.navCtrl.push(login_1.Login);
        }
        else {
            if (JSON.parse(localStorage.getItem('currentuser'))['data']) {
                console.log(JSON.parse(localStorage.getItem('currentuser')));
                if (JSON.parse(localStorage.getItem('currentuser'))['data']['roll'] == 'driver') {
                    this.isDriver = true;
                    this.af.setPosition();
                }
                else if (JSON.parse(localStorage.getItem('currentuser'))['data']['roll'] == 'parent') {
                    var object = { emailid: JSON.parse(localStorage.getItem('currentuser'))['data']['email'] };
                    this._http.post('https://eschoolweb.herokuapp.com/FindSingleParent', { data: object })
                        .map(function (res) { return res.json(); })
                        .subscribe(function (data) {
                        console.log('parents', data.data);
                        console.log('a', data.data['vanId']);
                        var object = { _id: data.data['vanId'] };
                        _this._http.post('https://eschoolweb.herokuapp.com/GetAllVanDoc', { data: { object: object } })
                            .map(function (res) { return res.json(); })
                            .subscribe(function (data) {
                            localStorage.setItem('driverUid', data.driverId.uid);
                            _this.af.getPosition(data.driverId.uid);
                        });
                    });
                    console.log(JSON.parse(localStorage.getItem('currentuser')));
                    this.isDriver = false;
                }
                else {
                    console.log('somthing went wrong');
                }
            }
        }
    }
    HomePage.prototype.confirmPickUp = function () {
        this.isPickUpRequested = true;
    };
    HomePage.prototype.cancelPickUp = function () {
        this.isPickUpRequested = false;
    };
    HomePage.prototype.isLoggedin = function () {
        if (window.localStorage.getItem('currentuser')) {
            return true;
        }
    };
    HomePage.prototype.logout = function () {
        localStorage.clear();
    };
    HomePage.prototype.refresh = function () {
        window.location.reload();
    };
    return HomePage;
}());
HomePage = __decorate([
    core_1.Component({
        selector: 'page-home',
        templateUrl: 'home.html',
        providers: [firebase_service_1.FirebaseService]
    })
], HomePage);
exports.HomePage = HomePage;
