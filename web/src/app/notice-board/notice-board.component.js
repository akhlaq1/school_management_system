"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var NoticeBoardComponent = (function () {
    function NoticeBoardComponent(_af) {
        this._af = _af;
        if (localStorage.getItem('status')) {
            this.type = JSON.parse(localStorage.getItem('status'))['type'];
            this.token = JSON.parse(localStorage.getItem('status'))['uid'];
        }
    }
    NoticeBoardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._af.database.list('messages')
            .subscribe(function (messages) {
            _this.messages = messages;
        });
    };
    NoticeBoardComponent.prototype.submit = function (subject, content) {
        var _this = this;
        this._af.auth.subscribe(function (user) {
            _this._af.database.list('messages/').push({
                subject: subject,
                content: content,
                token: _this.token,
                src: user.auth.photoURL,
                displayName: user.auth.displayName
            });
        });
    };
    return NoticeBoardComponent;
}());
NoticeBoardComponent = __decorate([
    core_1.Component({
        selector: 'app-notice-board',
        templateUrl: './notice-board.component.html',
        styleUrls: ['./notice-board.component.css'],
    })
], NoticeBoardComponent);
exports.NoticeBoardComponent = NoticeBoardComponent;
