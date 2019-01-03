"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var PubSubService = (function () {
    function PubSubService(af) {
        var _this = this;
        this.af = af;
        this.$pickUp = new rxjs_1.Observable(function (observer) {
            _this._observer = observer;
        })
            .share();
    }
    PubSubService.prototype.watch = function () {
        return this.$pickUp;
    };
    PubSubService.prototype.getAllQuestion = function () {
        var _this = this;
        if (localStorage.getItem('status')) {
            this.type = JSON.parse(localStorage.getItem('status'))['type'];
            this.token = JSON.parse(localStorage.getItem('status'))['uid'];
            //this.questions;
            var tsubject_1 = [];
            var subjects = this.af.database.list('/subjects/')
                .map(function (a) {
                if (_this.type == 'teacher') {
                    a.forEach(function (b) {
                        var head = Object.keys(b)[0];
                        if (b[head]['tuid'] == _this.token) {
                            tsubject_1.push(b);
                        }
                    });
                    return tsubject_1;
                }
                return a;
            })
                .distinct()
                .map(function (res) {
                var forum = [];
                var questionsAnswers = {
                    questions: 0,
                    answers: 0,
                    response: 0
                };
                res.forEach(function (ele) {
                    _this.af.database.list('/questions/' + ele['$key'])
                        .distinct()
                        .subscribe(function (res) {
                        questionsAnswers.questions = res.length;
                        res.forEach(function (res, index) {
                            var obj = {
                                question: 0,
                                answer: [],
                                photoURL: 0,
                                questionDate: res['date'],
                                answerDate: 0
                            };
                            res.$$key = ele['$key'];
                            var cuser = _this.af.database.list('/users', {
                                query: {
                                    orderByChild: 'uid',
                                    equalTo: res.uid
                                }
                            })
                                .subscribe(function (res) {
                                if (res[0]) {
                                    obj.photoURL = res[0]['photoURL'];
                                }
                            });
                            var a = _this.af.database.list('/answers/' + ele['$key'] + '/' + res['$key'])
                                .distinct()
                                .map(function (res) {
                                return res;
                            })
                                .subscribe(function (res) {
                                if (res.length == 1) {
                                    questionsAnswers.answers++;
                                }
                                res.forEach(function (res, i) {
                                    var cuser = _this.af.database.list('/users', {
                                        query: {
                                            orderByChild: 'uid',
                                            equalTo: res.uid
                                        }
                                    })
                                        .subscribe(function (_res) {
                                        if (_res[0]) {
                                            res.photoURL = _res[0]['photoURL'];
                                        }
                                    });
                                    //bad fix
                                    //update 
                                    if (obj.answer.length == 0) {
                                        obj.answerDate = res['date'];
                                        obj.answer.push(res);
                                    }
                                    else {
                                        obj.answer[i] = res;
                                    }
                                    obj.answer;
                                    // this.cd.markForCheck();
                                });
                                //console.log(obj.answer.length);
                                // questionsAnswers.answers = obj.answer.length;
                                //obj.answer.push(res);
                            });
                            obj.question = res;
                            //  this.cd.markForCheck();
                            forum.push(obj);
                            console.log(obj);
                        });
                    });
                });
                forum['questionAnswer'] = questionsAnswers;
                return forum;
            })
                .distinctUntilChanged()
                .subscribe(function (r) {
                _this._observer.next(r);
            });
        }
    };
    return PubSubService;
}());
PubSubService = __decorate([
    core_1.Injectable()
], PubSubService);
exports.PubSubService = PubSubService;
