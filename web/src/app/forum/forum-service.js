"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var ForumService = (function () {
    function ForumService(http) {
        this.http = http;
    }
    /*    SaveStudent(name, uid, phone): Observable<any> {
            return this.http
                .post('/SaveStudent', { data: { name: name, uid: uid, phoneNo : phone } })
                .map((r: Response) => r.json().data);
        }*/
    ForumService.prototype.MatchAllWords = function (object) {
        return this.http
            .post('/FindDoc', { data: { words: object } })
            .map(function (r) { return r.json(); });
    };
    return ForumService;
}());
ForumService = __decorate([
    core_1.Injectable()
], ForumService);
exports.ForumService = ForumService;
