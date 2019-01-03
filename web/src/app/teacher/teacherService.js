"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var teacherService = (function () {
    function teacherService(http) {
        this.http = http;
    }
    teacherService.prototype.getAllTeacher = function () {
        return this.http
            .get('/FindAllTeacher')
            .map(function (r) { return r.json().data; });
    };
    teacherService.prototype.SaveTeacher = function (name, address, qualification, rank, emailId, uid, phoneNo, status) {
        return this.http
            .post('/SaveTeacher', { data: { name: name, address: address, qualification: qualification, rank: rank, emailId: emailId, uid: uid, phoneNo: phoneNo, status: status } })
            .map(function (r) { return r.json().data; });
    };
    teacherService.prototype.updateTeacher = function (id, name, address, qualification, emailId, uid, phoneNo, status) {
        return this.http
            .post('/UpdateTeacher', { data: { tId: id, name: name, address: address, qualification: qualification, emailId: emailId, phoneNo: phoneNo, status: status } })
            .map(function (r) { return r.json().data; });
    };
    return teacherService;
}());
teacherService = __decorate([
    core_1.Injectable()
], teacherService);
exports.teacherService = teacherService;
