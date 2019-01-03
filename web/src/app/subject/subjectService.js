"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var subjectService = (function () {
    function subjectService(http) {
        this.http = http;
    }
    subjectService.prototype.SaveSubject = function (name) {
        return this.http
            .post('/SaveSubject', { data: { name: name } })
            .map(function (r) { return r.json().data; });
    };
    subjectService.prototype.assignSubject = function (subject, teacher) {
        return this.http
            .post('/AssignSubject', { data: { id: subject, teacherid: teacher } })
            .map(function (r) { return r.json().data; });
    };
    subjectService.prototype.getAllSubjects = function () {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this.http
            .get('/FindAllSubject')
            .map(function (r) { return r.json().data; });
    };
    subjectService.prototype.getAllAssignSubjects = function () {
        return this.http
            .get('/FindAllSubjectAssign')
            .map(function (r) { return r.json().data; });
    };
    subjectService.prototype.updateSubject = function (data) {
        return this.http
            .post('/UpdateSubject', { data: { id: data.id, name: data.name } })
            .map(function (r) { return r.json().data; });
    };
    return subjectService;
}());
subjectService = __decorate([
    core_1.Injectable()
], subjectService);
exports.subjectService = subjectService;
