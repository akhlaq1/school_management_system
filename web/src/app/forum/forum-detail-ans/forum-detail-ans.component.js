"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var ForumDetailAnsComponent = (function () {
    function ForumDetailAnsComponent() {
    }
    ForumDetailAnsComponent.prototype.ngOnInit = function () {
    };
    return ForumDetailAnsComponent;
}());
ForumDetailAnsComponent = __decorate([
    core_1.Component({
        selector: 'app-forum-detail-ans',
        templateUrl: './forum-detail-ans.component.html',
        styleUrls: ['./forum-detail-ans.component.css']
    })
], ForumDetailAnsComponent);
exports.ForumDetailAnsComponent = ForumDetailAnsComponent;
