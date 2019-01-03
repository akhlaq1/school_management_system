import { Injectable } from '@angular/core';

import { Observable, Observer } from 'rxjs'
import { AngularFire } from 'angularfire2'

@Injectable()
export class PubSubService {

  public _observer: Observer<any>;
  token; type;
  public $pickUp: Observable<any>;

  constructor(private af: AngularFire) {
    this.$pickUp = new Observable(observer => {
      this._observer = observer;
    })
      .share();


  }
  watch() {
    return this.$pickUp;
  }
  getAllQuestion() {

    if (localStorage.getItem('status')) {
      this.type = JSON.parse(localStorage.getItem('status'))['type']
      this.token = JSON.parse(localStorage.getItem('status'))['uid']
      //this.questions;

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

                      if (res.length == 1) {
                        questionsAnswers.answers = res.length;
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
                        // this.cd.markForCheck();

                      })
                      //console.log(obj.answer.length);

                      // questionsAnswers.answers = obj.answer.length;
                      //obj.answer.push(res);
                    })

                  obj.question = res;
                  //this.cd.markForCheck();

                  var indexOfStevie = forum.findIndex(i => i.question.question == obj.question['question']);
                  

                  if(indexOfStevie == -1){
                    forum.push(obj)  
                  }




                })


              })


          })

          forum['questionAnswer'] = questionsAnswers


          return forum;
        })
        .distinctUntilChanged()
        .subscribe((r) => {

          this._observer.next(r);


        })

    }
  }
}




