"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
require("rxjs/add/operator/map");
var FirebaseService = (function () {
    function FirebaseService(platform, geolocation, db, af) {
        this.platform = platform;
        this.geolocation = geolocation;
        this.db = db;
        this.af = af;
    }
    FirebaseService.prototype.Login = function (username, password) {
        return this.af.auth.signInWithEmailAndPassword(username, password);
    };
    FirebaseService.prototype.updateLocation = function () {
    };
    FirebaseService.prototype.setPosition = function () {
        var _this = this;
        var uid = JSON.parse(localStorage.getItem('currentuser'))['data']['uid'];
        this.platform.ready().then(function () {
            setInterval(function () {
                _this.geolocation.getCurrentPosition()
                    .then(function (pos) {
                    console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
                });
                var watch = _this.geolocation.watchPosition().subscribe(function (pos) {
                    console.log(pos);
                    var itemObservable = _this.db.object('/position/' + uid);
                    itemObservable.set({ lat: pos.coords.latitude, lng: pos.coords.longitude });
                    console.log(pos.coords.latitude, pos.coords.longitude);
                });
            }, 1000);
            // get current position
            // to stop watching
            //watch.unsubscribe();
        });
    };
    FirebaseService.prototype.getPosition = function (uid) {
        return this.db.list('position/' + uid);
    };
    return FirebaseService;
}());
FirebaseService = __decorate([
    core_1.Injectable()
], FirebaseService);
exports.FirebaseService = FirebaseService;
