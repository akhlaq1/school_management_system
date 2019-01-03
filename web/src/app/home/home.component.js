"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var app_firebaseService_1 = require("./../app.firebaseService");
var HomeComponent = (function () {
    function HomeComponent(_firebaseService) {
        this._firebaseService = _firebaseService;
        this.Opened = true;
        if (localStorage.getItem('status')) {
            this.type = JSON.parse(localStorage.getItem('status'))['type'];
            this.uid = JSON.parse(localStorage.getItem('status'))['uid'];
            if ((this.type == 'teacher' && this.uid)) {
                this.type = 'teacher';
            }
            else if ((this.type == 'student' && this.uid)) {
                this.type = 'student';
            }
            else if ((this.type == 'admin' && this.uid)) {
                this.type = 'admin';
            }
        }
    }
    HomeComponent.prototype.logout = function () {
        this._firebaseService.Logout();
    };
    HomeComponent.prototype.isOpened = function () {
        this.Opened = !this.Opened;
    };
    return HomeComponent;
}());
HomeComponent = __decorate([
    core_1.Component({
        selector: 'app-home',
        templateUrl: './home.component.html',
        styleUrls: ['./home.component.css'],
        providers: [app_firebaseService_1.firebaseService]
    })
], HomeComponent);
exports.HomeComponent = HomeComponent;
