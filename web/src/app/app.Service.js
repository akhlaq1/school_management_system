"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var rxjs_1 = require("rxjs");
var appService = (function () {
    function appService(http) {
        this.http = http;
    }
    appService.prototype.authentication = function (name, email, password, type, uid) {
        return this.http
            .post('/SaveAuthentication', {
            data: { username: name, password: password, email: email, roll: type, uid: uid }
        })
            .retry(3)
            .map(function (r) { return r.json().data; });
    };
    appService.prototype.isauthenticate = function (email, pass) {
        return this.http
            .post('/FindAuthentication', {
            data: {
                email: email,
                password: pass
            }
        })
            .first()
            .map(function (r) { return r.json().data; });
    };
    appService.prototype.sendTokenToServer = function (token, email) {
        return this.http.post('/UpdateToken', {
            data: { token: token, email: email }
        })
            .map(function (r) { return r.json().data; });
    };
    return appService;
}());
appService = __decorate([
    core_1.Injectable()
], appService);
exports.appService = appService;
var CustomHttp = (function (_super) {
    __extends(CustomHttp, _super);
    function CustomHttp(backend, defaultOptions) {
        return _super.call(this, backend, defaultOptions) || this;
    }
    /*request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        console.log('request...');
        return super.request(url, options)
            
            .catch(res => {
                return Observable.throw(res.json());
            });

    }*/
    CustomHttp.prototype.get = function (url, options) {
        console.log('get...');
        if (localStorage.getItem('status')) {
            this.uid = JSON.parse(localStorage.getItem('status'))['uid'];
        }
        return _super.prototype.get.call(this, url + '/?uid=' + this.uid, options)
            .catch(function (res) {
            return rxjs_1.Observable.throw(res.json());
        });
    };
    return CustomHttp;
}(http_1.Http));
CustomHttp = __decorate([
    core_1.Injectable()
], CustomHttp);
exports.CustomHttp = CustomHttp;
