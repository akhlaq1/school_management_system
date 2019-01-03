"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var studentService_1 = require("./studentService");
var app_firebaseService_1 = require("./../app.firebaseService");
var app_Service_1 = require("./../app.Service");
var StudentComponent = (function () {
    function StudentComponent(_studentService, _firebaseService, _appService, snackBar) {
        this._studentService = _studentService;
        this._firebaseService = _firebaseService;
        this._appService = _appService;
        this.snackBar = snackBar;
        this.type = 'student';
    }
    StudentComponent.prototype.ngOnInit = function () {
    };
    StudentComponent.prototype.addStudent = function (name, email, password, phone) {
        var _this = this;
        this._firebaseService.CreateUser(email, password)
            .then(function (res) {
            var uid = res.uid;
            _this._studentService.SaveStudent(name, uid, phone).subscribe(function (res) {
                _this.snackBar.open(name, 'Student Added', {
                    duration: 2000
                });
            });
            _this._firebaseService.CreateFirebaseUser(uid);
            _this._appService.authentication(name, email, password, _this.type, uid)
                .subscribe(function (res) {
                console.log(res);
            });
        }, function (err) {
            console.log(err);
        });
    };
    StudentComponent.prototype.logout = function () {
        this._firebaseService.Logout();
    };
    StudentComponent.prototype.back = function () {
        this._firebaseService.back();
    };
    return StudentComponent;
}());
StudentComponent = __decorate([
    core_1.Component({
        selector: 'app-student',
        templateUrl: './student.component.html',
        styleUrls: ['./student.component.css'],
        providers: [studentService_1.studentService, app_firebaseService_1.firebaseService, app_Service_1.appService]
    })
], StudentComponent);
exports.StudentComponent = StudentComponent;
