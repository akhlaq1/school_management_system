import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { PubSubService } from './../pub-sub.service'
import { Observable, Observer } from 'rxjs'
import { AngularFire } from 'angularfire2'
import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
  providers: [PubSubService, AngularFire],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionsComponent implements OnInit {

  questions;
  isAns = false;
  constructor(private _http: Http, private AngularFire: AngularFire, private cd: ChangeDetectorRef, private pubSubService: PubSubService) {
    this.pubSubService.getAllQuestion();
  }

  ngOnInit() {

    this.pubSubService.watch()
      .subscribe(result => {

        setTimeout(() => {
          this.questions = result;
          this.cd.markForCheck();
        }, 1000)



      })

  }



  hit(ques, item: HTMLElement) {

    this._http.get('https://school-web-7d8e8.firebaseio.com/impact/' + ques['question']['$$key'] + '/' + ques['question']['$key'] + '.json?shallow=true')
      .map(response => response.json())
      .subscribe((items) => {

        if (!items) {
          this.AngularFire.database.object('impact/' + ques['question']['$$key'] + '/' + ques['question']['$key']).set({
            count: 1,
            TIME: Date.now()
          })
        }
        else {
         
          let count = (items[((Object.keys(items))[0])].count) + 1;
          this.AngularFire.database.object('impact/' + ques['question']['$$key'] + '/' + ques['question']['$key']).set({
            count: items.count+1,
            TIME: Date.now()
          })
        }
      })
    this.isAns = !this.isAns;
  }

}
