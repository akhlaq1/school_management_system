"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var firebase = require("firebase");
var NotificationComponent = (function () {
    function NotificationComponent(af, _http, zone, cd) {
        var _this = this;
        this.af = af;
        this._http = _http;
        this.zone = zone;
        this.cd = cd;
        this.show = false;
        this.badge = 0;
        this.af.auth.subscribe(function (auth) {
            var uid = auth.auth.uid;
            _this._http.get('https://school-web-7d8e8.firebaseio.com/notification/' + uid + '.json?shallow=true')
                .map(function (response) { return response.json(); })
                .subscribe(function (items) {
                _this.messages = items;
                _this.cd.markForCheck();
                _this.badge = items ? Object.keys(items).length : 0;
                _this.cd.markForCheck();
            });
        });
        var messaging = firebase.messaging();
        messaging.onMessage(function (payload) {
            zone.run(function () {
                _this.badge++;
                _this.cd.markForCheck();
                console.log(payload);
            });
        });
    }
    NotificationComponent.prototype.ngOnInit = function () {
    };
    NotificationComponent.prototype.doShow = function () {
        this.badge = 0;
        this.show = !this.show;
    };
    return NotificationComponent;
}());
NotificationComponent = __decorate([
    core_1.Component({
        selector: 'app-notification',
        templateUrl: './notification.component.html',
        styleUrls: ['./notification.component.css'],
        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
    })
], NotificationComponent);
exports.NotificationComponent = NotificationComponent;
