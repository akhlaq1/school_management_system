"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var subjectService_1 = require("./../subject/subjectService");
var forum_service_1 = require("./forum-service");
var ForumComponent = (function () {
    function ForumComponent(zone, af, cd, _subjectService, _http, _forumService) {
        var _this = this;
        this.af = af;
        this.cd = cd;
        this._subjectService = _subjectService;
        this._http = _http;
        this._forumService = _forumService;
        this.abusiveWord = '  ';
        this.ask = false;
        this.photoURL = "./images/male-face.png";
        this.scount = 0;
        this.editAns = false;
        this.date = new Date();
        this.trackFbObjects = function (idx, obj) { return obj.$key; };
        if (localStorage.getItem('status')) {
            this.type = JSON.parse(localStorage.getItem('status'))['type'];
            this.token = JSON.parse(localStorage.getItem('status'))['uid'];
            //this.questions;
            this.rankDetail = new core_1.EventEmitter();
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
                                    _this.cd.markForCheck();
                                });
                                //console.log(obj.answer.length);
                                // questionsAnswers.answers = obj.answer.length;
                                //obj.answer.push(res);
                            });
                            obj.question = res;
                            _this.cd.markForCheck();
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
                console.log(r);
                /* zone.run(() => { // Change the property within the zone, CD will run after
                   
                   this.questions = r;
                   this.cd.markForCheck();
                 });
                 this.rankDetail.emit(r['questionAnswer']);
                 this.questions = r;
                 ChangeDetectorRef.detectChanges()
       */
                console.log(r['questionAnswer']);
                setTimeout(function () {
                    _this.rankDetail.emit(r['questionAnswer']);
                    _this.questions = r;
                    // the following is required, otherwise the view will not be updated
                    _this.cd.markForCheck();
                }, 1000);
            });
        }
        if (this.type == 'student') {
            this.ask = true;
        }
        this._subjectService.getAllSubjects()
            .subscribe(function (res) {
            console.log(res);
            _this.subjects = res;
        });
    }
    ForumComponent.prototype.reply = function (ans, question, reply) {
        console.log('question and answer', ans, question);
        this.af.database.list('/answers/' + question['$$key'] + '/' + question['$key'] + '/' + ans['$key'] + '/reply')
            .push({ reply: reply });
    };
    ForumComponent.prototype.editAnsFn = function () {
        this.editAns = !this.editAns;
    };
    ForumComponent.prototype.ngOnInit = function () {
        console.log('B');
        /*
    
        if (localStorage.getItem('status')) {
          this.type = JSON.parse(localStorage.getItem('status'))['type']
          this.token = JSON.parse(localStorage.getItem('status'))['uid']
          this.questions;
    
    
    
          let tsubject = [];
    
          let subjects = this.af.database.list('/subjects/')
    
            .map((a) => {
              if (this.type == 'teacher') {
                a.forEach((b) => {
                  let head = Object.keys(b)[0];
                  if (b[head]['tuid'] == this.token) {
                    tsubject.push(b);
                  }
                })
                return tsubject;
              }
              return a;
            })
            .map((res) => {
    
              console.log(res);
    
              let forum = [];
    
              res.forEach((ele) => {
    
                this.af.database.list('/questions/' + ele['$key'])
                  .distinct()
                  .subscribe((res) => {
    
                    res.forEach((res, index) => {
                      var obj = {
                        question: 0,
                        answer: []
                      };
                      res.$$key = ele['$key'];
    
                      this.af.database.list('/answers/' + ele['$key'] + '/' + res['$key'])
                        .distinct()
                        .subscribe((res) => {
    
                          res.forEach((res, i) => {
                            obj.answer.push(res);
    
                          })
                        })
                      obj.question = res;
    
                      forum.push(obj);
    
                    })
    
    
                  })
              })
              return forum;
            })
    
            .subscribe((r) => {
    
              this.questions = r;
    
    
            })
    
        }
    
    
        if (this.type == 'student') {
          this.ask = true;
        }
    
    
        this._subjectService.getAllSubjects()
          .subscribe((res) => {
            console.log(res);
            this.subjects = res;
          });*/
    };
    ForumComponent.prototype.emitAnswer = function (answer, key) {
        var _this = this;
        console.log(key);
        var ans = this.af.database.list('/answers/' + key['$$key'] + '/' + key['$key']);
        ans.push({ answer: answer, date: this.date.toISOString(), uid: this.token });
        this.af.auth.subscribe(function (auth) {
            _this.af.database.object('subjects/' + key['$$key'])
                .subscribe(function (r) {
                var head = Object.keys(r)[0];
                var tuid = r[head]['tuid'];
                _this._http
                    .post('/SendStudentNotification', {
                    data: {
                        date: _this.date.toISOString(),
                        subid: key['$$key'],
                        qid: key['$key'],
                        stuid: key['uid'],
                        tuid: tuid,
                        username: auth.auth.displayName,
                        stdPhoto: auth.auth.photoURL,
                        status: 0
                    }
                })
                    .map(function (r) { return r.json().data; })
                    .subscribe(function (res) {
                    console.log(res);
                });
            }, function (error) {
                console.log(error);
            });
        });
    };
    ForumComponent.prototype.trackByFn = function (message) {
        console.log(message);
        return message;
    };
    ForumComponent.prototype.selectQuestion = function ($key) {
        console.log($key);
        this.selectedItem = $key;
    };
    ForumComponent.prototype.up = function (a, b) {
        var _this = this;
        this._http.get('https://school-web-7d8e8.firebaseio.com/answers/' + b['$$key'] + '/' + b['$key'] + '/' + a['$key'] + '/down' + '.json?shallow=true')
            .map(function (response) { return response.json(); })
            .subscribe(function (items) {
            var _count = items ? Object.keys(items).length : 0;
            _this.af.database.object('answers/' + b['$$key'] + '/' + b['$key'] + '/' + a['$key'])
                .set({ answer: a['answer'], date: a['date'], uid: a['uid'], count: a['count']++ | 1 });
            var questionObservale = _this.af.database.list('answers/' + b['$$key'] + '/' + b['$key'] + '/' + a['$key'] + '/up/');
            questionObservale.push({ date: _this.date.toISOString(), uid: _this.token });
        });
    };
    ForumComponent.prototype.down = function (a, b) {
        var _this = this;
        this._http.get('https://school-web-7d8e8.firebaseio.com/answers/' + b['$$key'] + '/' + b['$key'] + '/' + a['$key'] + '/up' + '.json?shallow=true')
            .map(function (response) { return response.json(); })
            .subscribe(function (items) {
            var _count = items ? Object.keys(items).length : 0;
            _this.af.database.object('answers/' + b['$$key'] + '/' + b['$key'] + '/' + a['$key'])
                .set({ answer: a['answer'], date: a['date'], uid: a['uid'], count: --a['count'] | 0 });
            var questionObservale = _this.af.database.list('answers/' + b['$$key'] + '/' + b['$key'] + '/' + a['$key'] + '/down/');
            questionObservale.push({ date: _this.date.toISOString(), uid: _this.token });
        });
    };
    ForumComponent.prototype.Question = function () {
        return this.af.database.list('/questions');
    };
    ForumComponent.prototype.selectSubject = function (question) {
        return this._forumService.MatchAllWords(question);
    };
    ForumComponent.prototype.addQuestion = function (subject, question) {
        //stepping
        var _this = this;
        // let a = question.replace("the be to of and a in that have I it for not on with he as you do at this but his by from they we say her she or an will my one all would there their what so up out if about who get which go me when make can like time no just him know take people into year your good some could them see other than then now look only come its over think also back after use two how our work first well way even new want because any these give day most us", "");
        var _stepping = question.replace(/\b(the|be|to|of|and|a|in|that|have|I|it|for|not|on|with|he|as|you|do|at|this|but|his|by|from|they|we|say|her|she|or|an|will|my|one|all|would|there|their|what|so|up|out|if|about|who|get|which|go|me|when|make|can|like|time|no|just|him|know|take|people|into|year|your|good|some|could|them|see|other|than|then|now|look|only|come|its|over|think|also|back|after|use|two|how|our|work|first|well|way|even|new|want|because|any|these|give|day|most|us)\b/g, "");
        var c = _stepping.split(" ");
        var subjectId = [];
        /*    let frequecyObject = {}
            c.forEach((i) => {
               frequecyObject = {
                length: (_stepping.match(new RegExp(i, "g"))).length,
                i: i
              }
        
              
            })*/
        // console.log(frequecyObject)
        //if (question.match(/fuck|cunt|felch|skullfuck|cumdumpster|Alabamahotpocket|ClevelandSteamer|rustytrombone|cumguzzlingcocksucker|gotasquirrelpeeking|blumpkin|cock-jugglingthundercunt|glassbottomboat|meatflap|fuckhole|hairyaxewound||assmucus|cumdump|beefcurtain|eathairpie|cumchugger|motherfucker|cumjunkie|roastbeefcurtains|fuckingpussy|motherfucking|fuck|cumfreak|motherfucker|yardcuntpunt|bitchassmotherfucker|clittylitter|fuckyomama|bluewaffle|fuckmeintheasswithnoVaseline|fistfuck|schlongjuice|lickmyfroth|jenkem|sausagequeen|fuckmeat|haveafacelikeahatfulofassholes|getsomesquish|eatadick|meatdrapes|fucktoy|babyarm|buggery|squeezeasteamer|analconda|bustaload|cocksnot|facialize|chotabags|clitlicker|shitfucker|buttfuck|slaptard|dickhole|cuntsicle|cockpocket|cunt-struck|gangbang|GMILF|cuntbag|slich|cumguzzler|pussyfart|assfuck|feedbagmaterial|bucklebuffer|cunthole|smokeasausage|dicksucker||DVA|cocksucker|cuntface|fleetsupportunit|analimpaler|cringe(one)out|giveScully|hempedup|hamflap|snowball|eatfurpie|getbrain|nutbutter|suckadick|mumblepants|manchowder|AndhraBlackCobra|shum|blowme|Fuckinghell|bisnotch|tittieChrist/i)[0] == "") {
        this.af.auth.subscribe(function (auth) {
            var subjectId = [];
            _this.selectSubject(c)
                .subscribe(function (res) {
                res.data.forEach(function (item) {
                    _this.subjects.filter(function (subject) {
                        return (subject.name == item) ? subjectId.push(subject._id) : "";
                    });
                });
                subjectId.forEach(function (id) {
                    _this.af.database.object('subjects/' + id)
                        .subscribe(function (r) {
                        var head = Object.keys(r)[0];
                        var tuid = r[head]['tuid'];
                        var questionObservale = _this.af.database.list('questions/' + id);
                        var Obskey = questionObservale.push({ question: question, date: _this.date.toISOString(), uid: _this.token })
                            .then(function (sucess) {
                            _this._http
                                .post('/SendNotification', {
                                data: {
                                    date: _this.date.toISOString(),
                                    subid: sucess.path.o[1],
                                    qid: sucess.path.o[2],
                                    stuid: auth.auth.uid,
                                    tuid: tuid,
                                    username: auth.auth.displayName,
                                    //  subject: subject.name,
                                    stdPhoto: auth.auth.photoURL,
                                    status: 0
                                }
                            })
                                .map(function (r) { return r.json().data; })
                                .subscribe(function (res) {
                                console.log(res);
                            });
                        }, function (error) {
                            console.log(error);
                        });
                    });
                });
            });
        }, function (err) {
            console.log(err);
        });
    };
    return ForumComponent;
}());
ForumComponent = __decorate([
    core_1.Component({
        selector: 'app-forum',
        templateUrl: './forum.component.html',
        styleUrls: ['./forum.component.css'],
        providers: [subjectService_1.subjectService, forum_service_1.ForumService],
        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        outputs: ['rankDetail']
    })
], ForumComponent);
exports.ForumComponent = ForumComponent;
