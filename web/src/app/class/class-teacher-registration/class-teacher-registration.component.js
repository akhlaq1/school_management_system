"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var teacherService_1 = require("./../../teacher/teacherService");
var classService_1 = require("./../classService");
var ClassTeacherRegistrationComponent = (function () {
    function ClassTeacherRegistrationComponent(snackBar, _classService, _teacherService) {
        this.snackBar = snackBar;
        this._classService = _classService;
        this._teacherService = _teacherService;
    }
    ClassTeacherRegistrationComponent.prototype.ngOnInit = function () {
        this.getClasses();
        this.getAllTeacher();
    };
    ClassTeacherRegistrationComponent.prototype.getClasses = function () {
        var _this = this;
        this._classService.getAllClasses()
            .subscribe(function (res) {
            console.log(res);
            _this.classes = res;
        });
    };
    ClassTeacherRegistrationComponent.prototype.getAllTeacher = function () {
        var _this = this;
        this._teacherService.getAllTeacher()
            .subscribe(function (res) {
            _this.teachers = res;
        });
    };
    ClassTeacherRegistrationComponent.prototype.assignTeacher = function (classid, teacherid) {
        var _this = this;
        this._classService.AssignTeacher(classid, teacherid)
            .subscribe(function (res) {
            _this.snackBar.open(name, 'Teacher Assign', {
                duration: 2000
            });
        });
    };
    ClassTeacherRegistrationComponent.prototype.getAllAssignTeachers = function () {
    };
    ClassTeacherRegistrationComponent.prototype.updateClass = function () {
        var _this = this;
        this._classService.getAllClasses()
            .subscribe(function (res) {
            console.log(res);
            _this.classes = res;
        });
    };
    ClassTeacherRegistrationComponent.prototype.updateTeacher = function () {
        var _this = this;
        this._teacherService.getAllTeacher()
            .subscribe(function (res) {
            _this.teachers = res;
        });
    };
    return ClassTeacherRegistrationComponent;
}());
ClassTeacherRegistrationComponent = __decorate([
    core_1.Component({
        selector: 'app-class-teacher-registration',
        templateUrl: './class-teacher-registration.component.html',
        styleUrls: ['./class-teacher-registration.component.css'],
        providers: [teacherService_1.teacherService, classService_1.classService]
    })
], ClassTeacherRegistrationComponent);
exports.ClassTeacherRegistrationComponent = ClassTeacherRegistrationComponent;
