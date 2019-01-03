"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var emailService_1 = require("./emailService");
var EmailComponent = (function () {
    function EmailComponent(snackBar, _emailService, _firebaseService) {
        this.snackBar = snackBar;
        this._emailService = _emailService;
        this._firebaseService = _firebaseService;
    }
    EmailComponent.prototype.ngOnInit = function () {
        this.selectedEmails = [];
        this.getAllTeacherEmail();
        this.getAllStudentEmail();
    };
    EmailComponent.prototype.getAllTeacherEmail = function () {
        var _this = this;
        this._emailService.getAllTeacherEmail()
            .subscribe(function (res) {
            _this.teachers = res;
        });
    };
    EmailComponent.prototype.getAllStudentEmail = function () {
        var _this = this;
        this._emailService.getAllStudentEmail()
            .subscribe(function (res) {
            _this.students = res;
        });
    };
    EmailComponent.prototype.sendMail = function (subject, body) {
        var _this = this;
        this._emailService.sendAllEmail(this.selectedEmails, subject, body)
            .subscribe(function (res) {
            _this.snackBar.open(subject, 'Registered', {
                duration: 2000
            });
            //console.log(res);
        });
    };
    EmailComponent.prototype.selectTeacher = function (b) {
        this.selectedEmails.push(b.email);
    };
    EmailComponent.prototype.selectStudent = function (b) {
        this.selectedEmails.push(b.email);
    };
    EmailComponent.prototype.logout = function () {
        this._firebaseService.Logout();
    };
    EmailComponent.prototype.back = function () {
        this._firebaseService.back();
    };
    return EmailComponent;
}());
EmailComponent = __decorate([
    core_1.Component({
        selector: 'app-email',
        templateUrl: './email.component.html',
        styleUrls: ['./email.component.css'],
        providers: [emailService_1.emailService]
    })
], EmailComponent);
exports.EmailComponent = EmailComponent;
