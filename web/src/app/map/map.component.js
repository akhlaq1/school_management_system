"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var mapService_1 = require("./mapService");
var MapComponent = (function () {
    function MapComponent(cd, geocodingAPIService) {
        this.cd = cd;
        this.geocodingAPIService = geocodingAPIService;
        this.lat = 51.678418;
        this.lng = 7.809007;
        this.AreaDetail = new core_1.EventEmitter();
    }
    MapComponent.prototype.updateLatLngFromAddress = function (address, country) {
        var _this = this;
        this.geocodingAPIService
            .findFromAddress(address, country)
            .subscribe(function (response) {
            // if (response.status == 'OK') {
            var data = {
                lat: response.results[0].geometry.location.lat,
                lng: response.results[0].geometry.location.lng,
            };
            _this.lat = data.lat;
            _this.lng = data.lng;
            _this.cd.markForCheck();
            _this.AreaDetail.emit(response);
            // } else if (response.status == 'ZERO_RESULTS') {
            //   console.log('geocodingAPIService', 'ZERO_RESULTS', response.status);
            // } else {
            //   console.log('geocodingAPIService', 'Other error', response.status);
            // }
        });
    };
    MapComponent.prototype.ngOnInit = function () {
    };
    return MapComponent;
}());
MapComponent = __decorate([
    core_1.Component({
        selector: 'app-map',
        templateUrl: './map.component.html',
        styleUrls: ['./map.component.css'],
        providers: [mapService_1.GeocodingApiService],
        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        outputs: ['AreaDetail']
    })
], MapComponent);
exports.MapComponent = MapComponent;
