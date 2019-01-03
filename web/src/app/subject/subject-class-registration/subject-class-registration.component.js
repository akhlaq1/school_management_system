"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var teacherService_1 = require("./../../teacher/teacherService");
var subjectService_1 = require("./../subjectService");
var SubjectClassRegistrationComponent = (function () {
    function SubjectClassRegistrationComponent(_teacherService, _subjectService) {
        this._teacherService = _teacherService;
        this._subjectService = _subjectService;
    }
    SubjectClassRegistrationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._teacherService.getAllTeacher()
            .subscribe(function (res) {
            _this.teachers = res;
        });
        this._subjectService.getAllSubjects()
            .subscribe(function (res) {
            _this.subjects = res;
        });
    };
    SubjectClassRegistrationComponent.prototype.assignSubject = function (subject, teacher) {
        var _this = this;
        this._subjectService.assignSubject(subject, teacher)
            .subscribe(function (res) {
            console.log('assignSubject', res);
            _this.assignsubjects = res;
        });
    };
    return SubjectClassRegistrationComponent;
}());
SubjectClassRegistrationComponent = __decorate([
    core_1.Component({
        selector: 'app-subject-class-registration',
        templateUrl: './subject-class-registration.component.html',
        styleUrls: ['./subject-class-registration.component.css'],
        providers: [teacherService_1.teacherService, subjectService_1.subjectService]
    })
], SubjectClassRegistrationComponent);
exports.SubjectClassRegistrationComponent = SubjectClassRegistrationComponent;
