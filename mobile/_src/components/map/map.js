"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
var Map = (function () {
    function Map(loading, nav, geoLocation) {
        this.loading = loading;
        this.geoLocation = geoLocation;
    }
    Map.prototype.ngOnInit = function () {
        var _this = this;
        this.map = this.createMap();
        this.addEventListeners();
        this.getCurrentLocation().subscribe(function (location) {
            //this.map.panTo(location)
            _this.centerLocation(location);
        });
    };
    Map.prototype.addEventListeners = function () {
        var _this = this;
        google.maps.event.addListener(this.map, 'dragstart', function () {
            _this.isMapIdle = false;
        });
        google.maps.event.addListener(this.map, 'idle', function () {
            _this.isMapIdle = true;
        });
    };
    Map.prototype.createMap = function (location) {
        if (location === void 0) { location = new google.maps.LatLng(24.810914, 67.110504); }
        var mapOption = {
            center: location,
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true
        };
        var mapEl = document.getElementById('map');
        var map = new google.maps.Map(mapEl, mapOption);
        return map;
    };
    Map.prototype.getCurrentLocation = function () {
        var _this = this;
        var loading = this.loading.create({
            content: 'loading'
        });
        var options = { timeout: 10000, enableHighAccuracy: true };
        var locationObservable = Observable_1.Observable.create(function (observable) {
            _this.geoLocation.getCurrentPosition(options).then(function (res) {
                var lat = res.coords.latitude;
                var lng = res.coords.longitude;
                var location = new google.maps.LatLng(lat, lng);
                console.log(lat, lng);
                observable.next(location);
                loading.dismiss();
            }, function (error) {
                console.log('geoLocation error', error);
                loading.dismiss();
            });
        });
        return locationObservable;
    };
    Map.prototype.centerLocation = function (location) {
        var _this = this;
        if (location) {
            this.map.panTo(location);
        }
        else {
            this.getCurrentLocation().subscribe(function (currentLocation) {
                _this.map.panTo(currentLocation);
            });
        }
    };
    return Map;
}());
__decorate([
    core_1.Input()
], Map.prototype, "isPickUpRequested", void 0);
__decorate([
    core_1.Input()
], Map.prototype, "isDriver", void 0);
Map = __decorate([
    core_1.Component({
        selector: 'map',
        templateUrl: 'map.html'
    })
], Map);
exports.Map = Map;
