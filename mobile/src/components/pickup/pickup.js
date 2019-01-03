"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var Pickup = (function () {
    function Pickup() {
    }
    Pickup.prototype.ngOnChanges = function (changes) {
        if (this.isPinSet) {
            this.showPickupMarker();
        }
        else {
            this.removePickupMarker();
        }
    };
    Pickup.prototype.showPickupMarker = function () {
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
    Pickup.prototype.removePickupMarker = function () {
        if (this.pickupMarker) {
            this.pickupMarker.setMap(null);
        }
    };
    return Pickup;
}());
__decorate([
    core_1.Input()
], Pickup.prototype, "isPinSet", void 0);
__decorate([
    core_1.Input()
], Pickup.prototype, "map", void 0);
Pickup = __decorate([
    core_1.Component({
        selector: 'pickup',
        templateUrl: 'pickup.html'
    })
], Pickup);
exports.Pickup = Pickup;
