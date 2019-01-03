"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var classService_1 = require("./../classService");
var ClassDetailComponent = (function () {
    function ClassDetailComponent(_classService) {
        this._classService = _classService;
    }
    ClassDetailComponent.prototype.ngOnInit = function () {
        this.getAllEnrolledStudents();
        this.getAllEnrolledTeachers();
        this.getAllClasses();
    };
    ClassDetailComponent.prototype.getAllClasses = function () {
        var _this = this;
        this._classService.getAllClasses().subscribe(function (res) {
            _this.allClasses = res;
            console.log(res);
        });
    };
    ClassDetailComponent.prototype.getAllEnrolledTeachers = function () {
        var _this = this;
        this._classService.getEnrolledTeachers()
            .subscribe(function (res) {
            console.log('enrol', res);
            _this.enrolledTeachers = res;
        });
    };
    ClassDetailComponent.prototype.getAllEnrolledStudents = function () {
        var _this = this;
        this._classService.GetAllEnrolledStudents()
            .subscribe(function (res) {
            _this.enrolledStudents = res;
            console.log(res);
        });
    };
    return ClassDetailComponent;
}());
ClassDetailComponent = __decorate([
    core_1.Component({
        selector: 'app-class-detail',
        templateUrl: './class-detail.component.html',
        styleUrls: ['./class-detail.component.css'],
        providers: [classService_1.classService]
    })
], ClassDetailComponent);
exports.ClassDetailComponent = ClassDetailComponent;
