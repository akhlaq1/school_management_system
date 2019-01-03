"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var pub_sub_service_1 = require("./../pub-sub.service");
var angularfire2_1 = require("angularfire2");
var QuestionsComponent = (function () {
    function QuestionsComponent(_http, AngularFire, cd, pubSubService) {
        this._http = _http;
        this.AngularFire = AngularFire;
        this.cd = cd;
        this.pubSubService = pubSubService;
        this.isAns = false;
        this.pubSubService.getAllQuestion();
    }
    QuestionsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.pubSubService.watch()
            .subscribe(function (result) {
            setTimeout(function () {
                _this.questions = result;
                _this.cd.markForCheck();
            }, 1000);
        });
    };
    QuestionsComponent.prototype.hit = function (ques, item) {
        var _this = this;
        this._http.get('https://school-web-7d8e8.firebaseio.com/impact/' + ques['question']['$$key'] + '/' + ques['question']['$key'] + '.json?shallow=true')
            .map(function (response) { return response.json(); })
            .subscribe(function (items) {
            if (!items) {
                _this.AngularFire.database.object('impact/' + ques['question']['$$key'] + '/' + ques['question']['$key']).set({
                    count: 1,
                    TIME: Date.now()
                });
            }
            else {
                var count = (items[((Object.keys(items))[0])].count) + 1;
                _this.AngularFire.database.object('impact/' + ques['question']['$$key'] + '/' + ques['question']['$key']).set({
                    count: items.count + 1,
                    TIME: Date.now()
                });
            }
        });
        this.isAns = !this.isAns;
    };
    return QuestionsComponent;
}());
QuestionsComponent = __decorate([
    core_1.Component({
        selector: 'app-questions',
        templateUrl: './questions.component.html',
        styleUrls: ['./questions.component.css'],
        providers: [pub_sub_service_1.PubSubService, angularfire2_1.AngularFire],
        changeDetection: core_1.ChangeDetectionStrategy.OnPush
    })
], QuestionsComponent);
exports.QuestionsComponent = QuestionsComponent;
