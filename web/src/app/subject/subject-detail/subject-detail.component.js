"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var subjectService_1 = require("./../subjectService");
var SubjectDetailComponent = (function () {
    function SubjectDetailComponent(_subjectService) {
        this._subjectService = _subjectService;
    }
    SubjectDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._subjectService.getAllSubjects()
            .subscribe(function (res) {
            _this.subjects = res;
            console.log(res);
        });
        this._subjectService.getAllAssignSubjects()
            .subscribe(function (res) {
            _this.assignsubjects = res;
            console.log(res);
        });
    };
    return SubjectDetailComponent;
}());
SubjectDetailComponent = __decorate([
    core_1.Component({
        selector: 'app-subject-detail',
        templateUrl: './subject-detail.component.html',
        styleUrls: ['./subject-detail.component.css'],
        providers: [subjectService_1.subjectService]
    })
], SubjectDetailComponent);
exports.SubjectDetailComponent = SubjectDetailComponent;
