"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
//import {RegistrationService} from './registrationService'
var app_Service_1 = require("./../app.Service");
var app_firebaseService_1 = require("./../app.firebaseService");
var RegistrationComponent = (function () {
    function RegistrationComponent(http, _firebaseService, _appService) {
        this.http = http;
        this._firebaseService = _firebaseService;
        this._appService = _appService;
        this.data = {};
        this.type = 'admin';
    }
    RegistrationComponent.prototype.makeRequest = function () {
        var _this = this;
        this.http.request('/FindAuthentication')
            .subscribe(function (res) {
            _this.data = res.json();
            console.log(_this.data);
        }, function (error) {
            console.log(error);
        });
    };
    RegistrationComponent.prototype.ngOnInit = function () {
    };
    RegistrationComponent.prototype.addSchool = function (name, email, password) {
        var _this = this;
        this._firebaseService
            .CreateUser(email, password)
            .then(function (res) {
            console.log(res);
            var uid = res['uid'];
            _this._appService
                .authentication(name, email, password, _this.type, uid)
                .subscribe(function (res) {
                console.log(res);
            }, function (error) {
                console.log(error);
            });
        }, function (error) {
            console.log(error);
        });
    };
    return RegistrationComponent;
}());
RegistrationComponent = __decorate([
    core_1.Component({
        selector: 'app-registration',
        templateUrl: './registration.component.html',
        styleUrls: ['./registration.component.css'],
        providers: [app_Service_1.appService, app_firebaseService_1.firebaseService]
    })
], RegistrationComponent);
exports.RegistrationComponent = RegistrationComponent;
