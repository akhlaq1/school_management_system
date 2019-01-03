"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var parentService_1 = require("./parentService");
var studentService_1 = require("./../student/studentService");
var app_Service_1 = require("./../app.Service");
var vanService_1 = require("./../van/vanService");
var ParentComponent = (function () {
    function ParentComponent(snackBar, _appService, _vanService, _firebaseService, _parentService, _studentService) {
        this.snackBar = snackBar;
        this._appService = _appService;
        this._vanService = _vanService;
        this._firebaseService = _firebaseService;
        this._parentService = _parentService;
        this._studentService = _studentService;
    }
    ParentComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._parentService.getAllParents().subscribe(function (data) {
            console.log(data);
        });
        this._studentService.getAllStudent().subscribe(function (data) {
            console.log(data);
            _this.students = data;
        });
        this._vanService.getAllVan().subscribe(function (data) {
            _this.vans = data;
        });
    };
    ParentComponent.prototype.saveParents = function (name, a, h, id, email, password, vanId) {
        var _this = this;
        this._firebaseService.CreateUser(email, password)
            .then(function (res) {
            _this._appService.authentication(name, email, password, 'parent', res['uid'])
                .subscribe(function (res) {
                _this.snackBar.open(name, 'Parents Save', {
                    duration: 2000
                });
            });
            _this._parentService.saveParents(name, a, h, id, email, vanId).subscribe(function (data) {
                console.log(data);
            });
        });
    };
    return ParentComponent;
}());
ParentComponent = __decorate([
    core_1.Component({
        selector: 'app-parent',
        templateUrl: './parent.component.html',
        styleUrls: ['./parent.component.css'],
        providers: [parentService_1.parentService, studentService_1.studentService, vanService_1.vanService, app_Service_1.appService]
    })
], ParentComponent);
exports.ParentComponent = ParentComponent;
