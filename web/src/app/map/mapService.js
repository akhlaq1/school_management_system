"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
require("rxjs/add/operator/map");
var GeocodingApiService = (function () {
    function GeocodingApiService(http) {
        this.http = http;
    }
    //findFromAddress(address: string, postalCode?: string, place?: string, province?: string, region?: string, country?: string): Observable<any> {
    GeocodingApiService.prototype.findFromAddress = function (address, country) {
        var compositeAddress = [address];
        // if (postalCode) compositeAddress.push(postalCode);
        // if (place) compositeAddress.push(place);
        // if (province) compositeAddress.push(province);
        // if (region) compositeAddress.push(region);
        //if (country) compositeAddress.push(country);
        var _address = compositeAddress.join(',');
        //let url = 'https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyAWubVBlol2njoEldMQK5FQ7W2nXua1MsE&address=karachi,pakistan'
        //   console.log(url)
        var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + _address + "&key=AIzaSyBZVs2PkDv9btc_nqQvBytm_JFTVzjyd4k&callback=initMap";
        return this.http.get(url).map(function (response) { return response.json(); });
    };
    return GeocodingApiService;
}());
GeocodingApiService = __decorate([
    core_1.Injectable()
], GeocodingApiService);
exports.GeocodingApiService = GeocodingApiService;
