import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, EventEmitter, NgZone } from '@angular/core';
import { subjectService } from './../subject/subjectService'
import { AngularFire, FirebaseListObservable } from 'angularfire2'
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs'

import { ForumService } from './forum-service'


@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css'],
  providers: [subjectService, ForumService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  outputs: ['rankDetail']
})

export class ForumComponent implements OnInit {


  abusiveWord = '  ';
  rankDetail: EventEmitter<any>;
  items: FirebaseListObservable<any[]>;
  questions: Array<string>;
  studentId;
  subjects;
  ask = false;
  uid;
  qid;
  selectedItem;
  answers;
  token;
  type;
  photoURL = "./images/male-face.png"
  scount = 0;
  editAns = false;

  load = false


  isUpOrDown = false;


  date = new Date();

  constructor(
    zone: NgZone,
    private af: AngularFire,
    private cd: ChangeDetectorRef,
    private _subjectService: subjectService,
    private _http: Http,
    private _forumService: ForumService

  ) {

    if (localStorage.getItem('status')) {
      this.type = JSON.parse(localStorage.getItem('status'))['type']
      this.token = JSON.parse(localStorage.getItem('status'))['uid']
      //this.questions;
      this.rankDetail = new EventEmitter();


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
        .distinct()
        .map((res) => {

          let forum = [];
          let questionsAnswers = {
            questions: 0,
            answers: 0,
            response: 0
          }

          res.forEach((ele) => {

            this.af.database.list('/questions/' + ele['$key'])
              .distinct()
              .subscribe((res) => {


                questionsAnswers.questions = res.length;

                res.forEach((res, index) => {
                  var obj = {
                    question: 0,
                    answer: [],
                    photoURL: 0,
                    questionDate: res['date'],
                    answerDate: 0
                  };
                  res.$$key = ele['$key'];

                  let cuser = this.af.database.list('/users', {
                    query: {
                      orderByChild: 'uid',
                      equalTo: res.uid
                    }
                  })
                    .subscribe((res) => {
                      if (res[0]) {
                        obj.photoURL = res[0]['photoURL'];
                      }
                    })

                  let a = this.af.database.list('/answers/' + ele['$key'] + '/' + res['$key'])

                    .distinct()
                    .map((res) => {
                      return res;
                    })
                    .subscribe((res) => {


                      if (res.length == 1 && !this.isUpOrDown) {
                        questionsAnswers.answers++;
                        this.rankDetail.emit(questionsAnswers);
                      }
                      res.forEach((res, i) => {
                        let cuser = this.af.database.list('/users', {
                          query: {
                            orderByChild: 'uid',
                            equalTo: res.uid
                          }
                        })
                          .subscribe((_res) => {
                            if (_res[0]) {
                              res.photoURL = _res[0]['photoURL'];
                            }
                          })
                        //bad fix
                        //update 
                        if (obj.answer.length == 0) {
                          obj.answerDate = res['date'];
                          obj.answer.push(res);

                        }
                        else {
                          obj.answer[i] = res;


                        }
                        obj.answer
                        this.cd.markForCheck();

                      })
                      //console.log(obj.answer.length);

                      // questionsAnswers.answers = obj.answer.length;
                      //obj.answer.push(res);
                    })



                  obj.question = res;
                  this.cd.markForCheck();

                  var indexOfStevie = forum.findIndex(i => i.question.question == obj.question['question']);


                  if (indexOfStevie == -1) {
                    forum.push(obj)
                  }




                  /*
                                    let check = forum.filter(item => {
                                      return item.question != obj.question ? true : false
                                    })
                  
                                    console.log(check)
                  
                                    if (check) {
                                      forum.push(obj)
                                    }*/


                })


              })


          })


          forum['questionAnswer'] = questionsAnswers


          return forum;
        })
        .distinctUntilChanged()
        .subscribe((r) => {

          console.log(r);

          /* zone.run(() => { // Change the property within the zone, CD will run after
             
             this.questions = r;
             this.cd.markForCheck();
           });
           this.rankDetail.emit(r['questionAnswer']);
           this.questions = r;
           ChangeDetectorRef.detectChanges()
 */
          console.log(r['questionAnswer'])
          setTimeout(() => {

            this.rankDetail.emit(r['questionAnswer']);
            this.questions = r;
            // the following is required, otherwise the view will not be updated
            this.cd.markForCheck();
          }, 1000);


        })

    }


    if (this.type == 'student') {
      this.ask = true;
    }


    this._subjectService.getAllSubjects()

      .subscribe((res) => {
        console.log(res);
        this.subjects = res;
      });
  }

  reply(ans, question, reply): void {

    this.isUpOrDown = false;
    console.log('question and answer', ans, question);
    this.af.database.list('/answers/' + question['$$key'] + '/' + question['$key'] + '/' + ans['$key'] + '/reply')
      .push({ reply: reply })

  }
  editAnsFn() {
    this.editAns = !this.editAns;
  }

  ngOnInit() {

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

  }
  emitAnswer(answer: string, key) {


    console.log(key)


    let ans = this.af.database.list('/answers/' + key['$$key'] + '/' + key['$key'])

    ans.push({ answer: answer, date: this.date.toISOString(), uid: this.token })


    this.af.auth.subscribe((auth) => {

      this.af.database.object('subjects/' + key['$$key'])

        .subscribe((r) => {
          let head = Object.keys(r)[0];
          let tuid = r[head]['tuid'];
          this._http
            .post('/SendStudentNotification', {
              data:
              {
                date: this.date.toISOString(),
                subid: key['$$key'],
                qid: key['$key'],
                stuid: key['uid'],
                tuid: tuid,
                username: auth.auth.displayName,
                stdPhoto: auth.auth.photoURL,
                status: 0
              }
            })
            .map((r: Response) => {
              console.log(r)
            })
            .subscribe((res) => {
              console.log(res);
            })

        }, (error) => {
          console.log(error);
        })
    })

  }
  ans: any;
  trackFbObjects = (idx, obj) => obj.$key;
  trackByFn(message: any) {
    console.log(message);
    return message;
  }
  selectQuestion($key): any {
    console.log($key);
    this.selectedItem = $key;
  }
  up(a: any, b: any) {



    this.isUpOrDown = true;

    this._http.get('https://school-web-7d8e8.firebaseio.com/answers/' + b['$$key'] + '/' + b['$key'] + '/' + a['$key'] + '/down' + '.json?shallow=true')
      .map(response => response.json())
      .subscribe((items) => {
        const questionObservale = this.af.database.list('answers/' + b['$$key'] + '/' + b['$key'] + '/' + a['$key'] + '/up/');
        questionObservale.push({ date: this.date.toISOString(), uid: this.token });


        /*        let _count = items ? Object.keys(items).length : 0;
                this.af.database.object('answers/' + b['$$key'] + '/' + b['$key'] + '/' + a['$key'])
                  .set({ answer: a['answer'], date: a['date'], uid: a['uid'], count: a['count']++ | 1 })
        */


      })
  }
  down(a: any, b: any) {


    this.isUpOrDown = true;

    this._http.get('https://school-web-7d8e8.firebaseio.com/answers/' + b['$$key'] + '/' + b['$key'] + '/' + a['$key'] + '/up' + '.json?shallow=true')
      .map(response => response.json())
      .subscribe((items) => {
        let _count = items ? Object.keys(items).length : 0;


        this.af.database.object('answers/' + b['$$key'] + '/' + b['$key'] + '/' + a['$key'])
          .set({ answer: a['answer'], date: a['date'], uid: a['uid'], count: --a['count'] | 0 })
        const questionObservale = this.af.database.list('answers/' + b['$$key'] + '/' + b['$key'] + '/' + a['$key'] + '/down/');
        questionObservale.push({ date: this.date.toISOString(), uid: this.token });

      })


  }

  Question(): Observable<any> {
    return this.af.database.list('/questions')
  }

  selectSubject(question): Observable<any> {

    return this._forumService.MatchAllWords(question)



  }

  seletecTopic(question): Observable<any> {

    return this._forumService.MatchTopics(question)



  }

  addQuestion(subject, question: string) {

    //stepping


    // let a = question.replace("the be to of and a in that have I it for not on with he as you do at this but his by from they we say her she or an will my one all would there their what so up out if about who get which go me when make can like time no just him know take people into year your good some could them see other than then now look only come its over think also back after use two how our work first well way even new want because any these give day most us", "");
    let _stepping = question.replace(/\b(the|be|to|of|and|a|in|that|have|I|it|for|not|on|with|he|as|you|do|at|this|but|his|by|from|they|we|say|her|she|or|an|will|my|one|all|would|there|their|what|so|up|out|if|about|who|get|which|go|me|when|make|can|like|time|no|just|him|know|take|people|into|year|your|good|some|could|them|see|other|than|then|now|look|only|come|its|over|think|also|back|after|use|two|how|our|work|first|well|way|even|new|want|because|any|these|give|day|most|us)\b/g, "")

    let c = _stepping.split(" ")

    let subjectId = []



    /*    let frequecyObject = {}
        c.forEach((i) => {
           frequecyObject = {
            length: (_stepping.match(new RegExp(i, "g"))).length,
            i: i
          }
    
          
        })*/

    // console.log(frequecyObject)




    if (question.match(/fuck|cunt|felch|skullfuck|cumdumpster|Alabamahotpocket|ClevelandSteamer|rustytrombone|cumguzzlingcocksucker|gotasquirrelpeeking|blumpkin|cock-jugglingthundercunt|glassbottomboat|meatflap|fuckhole|hairyaxewound||assmucus|cumdump|beefcurtain|eathairpie|cumchugger|motherfucker|cumjunkie|roastbeefcurtains|fuckingpussy|motherfucking|fuck|cumfreak|motherfucker|yardcuntpunt|bitchassmotherfucker|clittylitter|fuckyomama|bluewaffle|fuckmeintheasswithnoVaseline|fistfuck|schlongjuice|lickmyfroth|jenkem|sausagequeen|fuckmeat|haveafacelikeahatfulofassholes|getsomesquish|eatadick|meatdrapes|fucktoy|babyarm|buggery|squeezeasteamer|analconda|bustaload|cocksnot|facialize|chotabags|clitlicker|shitfucker|buttfuck|slaptard|dickhole|cuntsicle|cockpocket|cunt-struck|gangbang|GMILF|cuntbag|slich|cumguzzler|pussyfart|assfuck|feedbagmaterial|bucklebuffer|cunthole|smokeasausage|dicksucker||DVA|cocksucker|cuntface|fleetsupportunit|analimpaler|cringe(one)out|giveScully|hempedup|hamflap|snowball|eatfurpie|getbrain|nutbutter|suckadick|mumblepants|manchowder|AndhraBlackCobra|shum|blowme|Fuckinghell|bisnotch|tittieChrist/i)[0] == "") {
      this.af.auth.subscribe((auth) => {

        let subjectId = [];

        this.selectSubject(c)
          .subscribe(res => {

            console.log(res)

            res.data.forEach(item => {

              this.subjects.filter(subject => {

                return (subject.name == item) ? subjectId.push(subject._id) : ""
              })
            })







            subjectId.forEach((id) => {

              this.af.database.object('subjects/' + id)
                .subscribe((r) => {
                  let head = Object.keys(r)[0];
                  let tuid = r[head]['tuid'];
                  const questionObservale = this.af.database.list('questions/' + id)
                  let Obskey =
                    questionObservale.push({ question: question, date: this.date.toISOString(), uid: this.token })
                      .then((sucess) => {


                        this.seletecTopic(c).subscribe(a => {
                          a.data.forEach(item => {

                            this.af.database.list('topics/' + item._id + '/' + sucess.key)
                              .push({ question: question, date: this.date.toISOString(), uid: this.token })
                              .then((res) => {
                                console.log(res, 'topic saved')
                              })
                          })
                        })





                        this._http
                          .post('/SendNotification', {
                            data:
                            {
                              date: this.date.toISOString(),
                              subid: sucess.path.o[1],
                              qid: sucess.path.o[2],
                              stuid: auth.auth.uid,
                              tuid: tuid,
                              username: auth.auth.displayName,
                              subject: subject.name,
                              stdPhoto: auth.auth.photoURL,
                              status: 0
                            }
                          })
                          .map((r: Response) => r.json().data)
                          .subscribe((res) => {
                            console.log(res);
                          })

                        //const questionObservale = this.af.database.list('topics/' + id + '/'+ )





                      }, (error) => {
                        console.log(error);
                      })
                })
            })


          }, (err) => {
            console.log(err)
          })


      }, (err) => {
        console.log(err)
      })

    }
    else {
      alert('warning : vulnerable question not allowed')
      console.log('')
    }

  }
}





