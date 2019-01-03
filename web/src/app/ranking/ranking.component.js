"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var RankingComponent = (function () {
    function RankingComponent() {
        this.value = 0;
    }
    RankingComponent.prototype.ngOnInit = function () {
    };
    RankingComponent.prototype.ngOnChanges = function () {
        if (this.rankTeacher) {
            this.value = 100 - (this.rankTeacher.questions / this.rankTeacher.answers);
        }
    };
    return RankingComponent;
}());
__decorate([
    core_1.Input()
], RankingComponent.prototype, "rankTeacher", void 0);
RankingComponent = __decorate([
    core_1.Component({
        selector: 'app-ranking',
        templateUrl: './ranking.component.html',
        styleUrls: ['./ranking.component.css']
    })
], RankingComponent);
exports.RankingComponent = RankingComponent;
