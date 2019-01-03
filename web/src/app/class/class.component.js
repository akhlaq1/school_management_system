"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var classService_1 = require("./classService");
var ClassComponent = (function () {
    function ClassComponent(_classService, _firebaseService, snackBar) {
        this._firebaseService = _firebaseService;
        this.snackBar = snackBar;
        this._classService = _classService;
    }
    ClassComponent.prototype.getAllClasses = function () {
        this._classService.getAllClasses().subscribe(function (res) {
            // console.log(res);
        });
    };
    ClassComponent.prototype.addClass = function (name) {
        var _this = this;
        this._classService.SaveClass(name).subscribe(function (res) {
            //console.log(res);
            _this.snackBar.open(name, 'Registered', {
                duration: 2000
            });
        });
    };
    ClassComponent.prototype.logout = function () {
        this._firebaseService.Logout();
    };
    ClassComponent.prototype.back = function () {
        this._firebaseService.back();
    };
    return ClassComponent;
}());
ClassComponent = __decorate([
    core_1.Component({
        selector: 'app-class',
        templateUrl: './class.component.html',
        styleUrls: ['./class.component.css'],
        providers: [classService_1.classService]
    })
], ClassComponent);
exports.ClassComponent = ClassComponent;
