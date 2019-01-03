"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var emailService = (function () {
    function emailService(http) {
        this.http = http;
    }
    emailService.prototype.getAllTeacherEmail = function () {
        return this.http
            .post('/FindAllEmails', { data: { roll: 'teacher' } })
            .map(function (r) { return r.json().data; });
    };
    emailService.prototype.getAllStudentEmail = function () {
        return this.http
            .post('/FindAllEmails', { data: { roll: 'student' } })
            .map(function (r) { return r.json().data; });
    };
    emailService.prototype.sendAllEmail = function (emails, subject, body) {
        return this.http
            .post('/SendAllEmails', { data: { emails: emails, subject: subject, body: body } })
            .map(function (r) { return r.json().data; });
    };
    return emailService;
}());
emailService = __decorate([
    core_1.Injectable()
], emailService);
exports.emailService = emailService;
