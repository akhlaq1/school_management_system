"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var ForumDetailComponent = (function () {
    function ForumDetailComponent() {
        this.replay = new core_1.EventEmitter();
    }
    ForumDetailComponent.prototype.ngOnInit = function () {
    };
    ForumDetailComponent.prototype.addReplay = function (name) {
        this.replay.emit(name);
    };
    return ForumDetailComponent;
}());
__decorate([
    core_1.Input()
], ForumDetailComponent.prototype, "itemList", void 0);
ForumDetailComponent = __decorate([
    core_1.Component({
        selector: 'app-forum-detail',
        templateUrl: './forum-detail.component.html',
        styleUrls: ['./forum-detail.component.css'],
        outputs: ['replay']
    })
], ForumDetailComponent);
exports.ForumDetailComponent = ForumDetailComponent;
