"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var studentService_1 = require("./../../student/studentService");
var classService_1 = require("./../classService");
var ClassStudentRegistrationComponent = (function () {
    function ClassStudentRegistrationComponent(snackBar, _classService, _studentService) {
        this.snackBar = snackBar;
        this._classService = _classService;
        this._studentService = _studentService;
    }
    ClassStudentRegistrationComponent.prototype.ngOnInit = function () {
        this.getAllClasses();
        this.getAllEnrolled();
        this.getAllStudent();
        this.getAllEnrolledStudents();
    };
    ClassStudentRegistrationComponent.prototype.getAllClasses = function () {
        var _this = this;
        this._classService.getAllClasses()
            .subscribe(function (res) {
            _this.classes = res;
            console.log(_this.classes);
        });
    };
    ClassStudentRegistrationComponent.prototype.updateClass = function () {
        this.getAllEnrolled();
        this.getAllClasses();
    };
    ClassStudentRegistrationComponent.prototype.updateStudent = function () {
        this.getAllStudent();
    };
    ClassStudentRegistrationComponent.prototype.getAllEnrolled = function () {
        var _this = this;
        this._classService.getEnrolledTeachers()
            .subscribe(function (res) {
            //      console.log(res);
            //console.log(res);
            _this.enrolledclass = res;
        });
    };
    ClassStudentRegistrationComponent.prototype.getAllStudent = function () {
        var _this = this;
        this._studentService.getAllStudent()
            .subscribe(function (res) {
            _this.students = res;
        });
    };
    ClassStudentRegistrationComponent.prototype.assignStudent = function (eid, studentid) {
        var _this = this;
        this._classService.AssigStudent(eid, studentid)
            .subscribe(function (res) {
            _this.snackBar.open(name, 'Student Assign', {
                duration: 2000
            });
        });
    };
    ClassStudentRegistrationComponent.prototype.getAllEnrolledStudents = function () {
        this._classService.GetAllEnrolledStudents()
            .subscribe(function (res) {
            //   console.log(res); 
        });
    };
    return ClassStudentRegistrationComponent;
}());
ClassStudentRegistrationComponent = __decorate([
    core_1.Component({
        selector: 'app-class-student-registration',
        templateUrl: './class-student-registration.component.html',
        styleUrls: ['./class-student-registration.component.css'],
        providers: [studentService_1.studentService, classService_1.classService]
    })
], ClassStudentRegistrationComponent);
exports.ClassStudentRegistrationComponent = ClassStudentRegistrationComponent;
