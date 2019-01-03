"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var smsService = (function () {
    function smsService(http) {
        this.http = http;
    }
    smsService.prototype.getAllTeacher = function () {
        return this.http
            .get('/FindAllTeacher')
            .map(function (r) { return r.json().data; });
    };
    smsService.prototype.getAllStudent = function () {
        return this.http
            .get('/FindAllStudent')
            .map(function (r) { return r.json().data; });
    };
    smsService.prototype.sendAllSMS = function (phone, body) {
        return this.http
            .post('/SendAllsms', { data: { body: body, phone: phone } })
            .map(function (r) { return r.json().data; });
    };
    return smsService;
}());
smsService = __decorate([
    core_1.Injectable()
], smsService);
exports.smsService = smsService;
