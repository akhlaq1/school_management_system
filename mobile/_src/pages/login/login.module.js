"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var ionic_angular_1 = require("ionic-angular");
var login_1 = require("./login");
var home_1 = require("../home/home");
var LoginModule = (function () {
    function LoginModule() {
    }
    return LoginModule;
}());
LoginModule = __decorate([
    core_1.NgModule({
        declarations: [
            login_1.Login,
            home_1.HomePage
        ],
        imports: [
            ionic_angular_1.IonicPageModule.forChild(login_1.Login),
        ],
        exports: [
            login_1.Login
        ]
    })
], LoginModule);
exports.LoginModule = LoginModule;
