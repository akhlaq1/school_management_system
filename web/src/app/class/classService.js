"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var classService = (function () {
    function classService(http) {
        this.http = http;
    }
    classService.prototype.getAllClasses = function () {
        return this.http
            .get('/FindAllClass')
            .map(function (r) { return r.json().data; });
    };
    classService.prototype.SaveClass = function (name) {
        return this.http
            .post('/SaveClass', { data: { name: name } })
            .map(function (r) { return r.json().data; });
    };
    classService.prototype.AssignTeacher = function (classid, teacherId) {
        return this.http
            .post('/SaveEnrollement', { data: { classid: classid, teacherId: teacherId } })
            .map(function (r) { return r.json().data; });
    };
    classService.prototype.getEnrolledTeachers = function () {
        return this.http
            .get('/FindFullEnrollement')
            .map(function (r) { return r.json().data; });
    };
    classService.prototype.AssigStudent = function (eid, studentid) {
        console.log('1', eid, '1', studentid);
        return this.http
            .post('/SaveStudentEnrolled', { data: { sId: studentid, enrolled: eid } })
            .map(function (r) { return r.json().data; });
    };
    classService.prototype.GetAllEnrolledStudents = function () {
        return this.http
            .get('/FindAllStudentEnrolled')
            .map(function (r) { return r.json().data; });
    };
    return classService;
}());
classService = __decorate([
    core_1.Injectable()
], classService);
exports.classService = classService;
