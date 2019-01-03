"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var rxjs_1 = require("rxjs");
var CustomHttp = (function (_super) {
    __extends(CustomHttp, _super);
    function CustomHttp(backend, defaultOptions) {
        return _super.call(this, backend, defaultOptions) || this;
    }
    CustomHttp.prototype.request = function (url, options) {
        console.log('request...');
        return _super.prototype.request.call(this, url, options)
            .map(function (res) { return res.json(); })
            .catch(function (res) {
            return rxjs_1.Observable.throw(res.json());
        });
    };
    CustomHttp.prototype.get = function (url, options) {
        console.log('get...');
        return _super.prototype.get.call(this, url, options)
            .map(function (res) { return res.json(); })
            .catch(function (res) {
            return rxjs_1.Observable.throw(res.json());
        });
    };
    return CustomHttp;
}(http_1.Http));
CustomHttp = __decorate([
    core_1.Injectable()
], CustomHttp);
exports.CustomHttp = CustomHttp;
