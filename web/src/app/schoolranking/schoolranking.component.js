"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var SchoolrankingComponent = (function () {
    function SchoolrankingComponent(http) {
        this.http = http;
        this._id = localStorage.getItem('_id');
    }
    SchoolrankingComponent.prototype.ngOnInit = function () {
        this.makeRequest();
    };
    SchoolrankingComponent.prototype.makeRequest = function () {
        var _this = this;
        this.http.request('/FindAuthentication')
            .subscribe(function (res) {
            _this.schools =
                res.json().data.filter(function (item) {
                    _this.voters = item.voters;
                    return item.roll == 'admin';
                });
            console.log(_this.schools);
        }, function (error) {
            console.log(error);
        });
    };
    SchoolrankingComponent.prototype.Vote = function () {
        var _this = this;
        this.voters.filter(function (item) {
            return item != _this._id;
        });
        this.http.post('/SchoolVote', { data: { _id: this._id, voters: this.voters } }, function (res) {
            console.log(res);
        });
    };
    return SchoolrankingComponent;
}());
SchoolrankingComponent = __decorate([
    core_1.Component({
        selector: 'app-schoolranking',
        templateUrl: './schoolranking.component.html',
        styleUrls: ['./schoolranking.component.css']
    })
], SchoolrankingComponent);
exports.SchoolrankingComponent = SchoolrankingComponent;
