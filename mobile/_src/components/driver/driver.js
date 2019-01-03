"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var firebase_service_1 = require("../../providers/firebase-service");
var Driver = (function () {
    function Driver(af) {
        this.af = af;
    }
    Driver.prototype.ngOnInit = function () {
        this.updatePostion();
    };
    Driver.prototype.updatePostion = function () {
        var uid = JSON.parse(localStorage.getItem('driverUid'));
        this.af.getPosition(uid)
            .subscribe(function (res) {
            console.log(res);
        });
    };
    Driver.prototype.showPickupMarker = function () {
        var _this = this;
        this.pickupMarker = new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.BOUNCE,
            position: this.map.getCenter(),
            icon: 'img/person-icon.png'
        });
        setTimeout(function () {
            _this.pickupMarker.setAnimation(null);
        }, 750);
    };
    return Driver;
}());
__decorate([
    core_1.Input()
], Driver.prototype, "map", void 0);
__decorate([
    core_1.Input()
], Driver.prototype, "isDriver", void 0);
Driver = __decorate([
    core_1.Component({
        selector: 'driver',
        templateUrl: 'driver.html',
        providers: [firebase_service_1.FirebaseService],
    })
], Driver);
exports.Driver = Driver;
