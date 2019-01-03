"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var RankComponent = (function () {
    function RankComponent(af, _http) {
        this.af = af;
        this._http = _http;
    }
    RankComponent.prototype.ngOnChanges = function (changes) {
        console.log(this.rankTeacher);
        /*  this.rankTeacher['questions'];
          this.rankTeacher['answers'];*/
        /*
            console.log('Changes', changes['rankTeacher'].currentValue);
            this.af.database.list('/users', {
              query: {
                orderByChild: 'uid',
                equalTo: changes['rankTeacher'].currentValue
              }
            })
              .subscribe((res) => {
                console.log(res);
              })*/
        /*this.af.database('users/', {
          query: {
            orderByChild: 'uid',
            equalTo: changes['rankTeacher'].currentValue
          }
        })*/
    };
    RankComponent.prototype.ngOnInit = function () {
        //  this.af.database.list
    };
    RankComponent.prototype.getans = function (ans) {
        console.log('ans', ans);
    };
    RankComponent.prototype.abc = function (data) {
        console.log(data);
    };
    RankComponent.prototype.noOfAsked = function () {
        /*    this._http.get('https://school-web-7d8e8.firebaseio.com/answers/' + b['$$key'] + '/' + b['$key'] + '/' + a['$key'] + '/up' + '.json?shallow=true')
              .map(response => response.json())
              .subscribe((items) => {
                let count = items ? Object.keys(items).length : 0;
                count++;
                this.af.database.object('answers/' + b['$$key'] + '/' + b['$key'] + '/' + a['$key']).set({ answer: a['answer'], date: a['date'], uid: a['uid'], dislike: a['dislike'] | 0, count: count })
                const questionObservale = this.af.database.list('answers/' + b['$$key'] + '/' + b['$key'] + '/' + a['$key'] + '/up/');
                questionObservale.push({ date: this.date.toISOString(), uid: this.token });
              })*/
    };
    return RankComponent;
}());
__decorate([
    core_1.Input('rankTeacher')
], RankComponent.prototype, "rankTeacher", void 0);
RankComponent = __decorate([
    core_1.Component({
        selector: 'app-rank',
        templateUrl: './rank.component.html',
        styleUrls: ['./rank.component.css'],
    })
], RankComponent);
exports.RankComponent = RankComponent;
