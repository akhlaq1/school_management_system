"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var subjectService_1 = require("./subjectService");
var app_firebaseService_1 = require("./../app.firebaseService");
var teacherService_1 = require("./../teacher/teacherService");
var SubjectComponent = (function () {
    function SubjectComponent(_subjectService, _firebaseService, _teacherService, cd, snackBar) {
        this._subjectService = _subjectService;
        this._firebaseService = _firebaseService;
        this._teacherService = _teacherService;
        this.cd = cd;
        this.snackBar = snackBar;
        this.token = 0;
        this.date = new Date();
        this.selected = false;
        if (JSON.parse(localStorage.getItem('status'))) {
            this.token = JSON.parse(localStorage.getItem('status'))['uid'];
        }
    }
    SubjectComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._teacherService.getAllTeacher().subscribe(function (res) {
            _this.teachers = res;
            console.log(res);
            _this.selected = false;
        });
        this._subjectService.getAllSubjects().subscribe(function (res) {
            _this.subjects = res;
            console.log(res);
        });
    };
    SubjectComponent.prototype.showInfo = function (info) {
        this.teacherInfo = info;
        this.selected = true;
    };
    SubjectComponent.prototype.saveSubject = function (name, teacherId) {
        var _this = this;
        this._subjectService.SaveSubject(name)
            .subscribe(function (res) {
            console.log(res);
            _this.snackBar.open(name, 'Registered', {
                duration: 2000
            });
            var questionObservale = _this._firebaseService.af.database.list('subjects/' + res['_id']);
            questionObservale.push({ name: name, date: _this.date.toISOString(), tuid: teacherId, uid: _this.token });
            /*
                    const subjectObservale = this._firebaseService.af.database.object('subjects');
                    subjectObservale.set({ name: res['sid'] });
            */
        });
    };
    SubjectComponent.prototype.updateSubject = function (data) {
        console.log(data);
    };
    SubjectComponent.prototype.selectSubject = function (obj) {
        this.subjectName = obj.name;
        this.cd.markForCheck();
        console.log(obj);
    };
    SubjectComponent.prototype.getAllSubject = function () {
    };
    SubjectComponent.prototype.logout = function () {
        this._firebaseService.Logout();
    };
    SubjectComponent.prototype.back = function () {
        this._firebaseService.back();
    };
    return SubjectComponent;
}());
SubjectComponent = __decorate([
    core_1.Component({
        selector: 'app-subject',
        templateUrl: './subject.component.html',
        styleUrls: ['./subject.component.css'],
        providers: [subjectService_1.subjectService, app_firebaseService_1.firebaseService, teacherService_1.teacherService]
    })
], SubjectComponent);
exports.SubjectComponent = SubjectComponent;
