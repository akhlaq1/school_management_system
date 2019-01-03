"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var RegistrationService = (function () {
    function RegistrationService(_appService, _firebaseService) {
        this._appService = _appService;
        this._firebaseService = _firebaseService;
    }
    RegistrationService.prototype.addSchool = function (name, emailId, type, password) {
        var _this = this;
        return this._firebaseService.CreateUser(emailId, password)
            .then(function (res) {
            var uid = res.uid;
            return _this._appService.authentication(name, emailId, password, type, uid);
        });
    };
    return RegistrationService;
}());
RegistrationService = __decorate([
    core_1.Injectable()
], RegistrationService);
exports.RegistrationService = RegistrationService;
