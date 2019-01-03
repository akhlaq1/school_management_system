import { Component, OnInit, Input, OnChanges, SimpleChange } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable, FirebaseApp, FirebaseAuthState } from 'angularfire2';
import { Http } from '@angular/http';

@Component({
  selector: 'app-rank',
  templateUrl: './rank.component.html',
  styleUrls: ['./rank.component.css'],


})
export class RankComponent implements OnInit, OnChanges {

  data
  constructor(
    private af: AngularFire,
    private _http: Http
  ) {
   
  
  }

  @Input('rankTeacher') rankTeacher: {}


  ngOnChanges(changes: { [rankTeacher: string]: SimpleChange }): void {

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


  }

  ngOnInit() {

    //  this.af.database.list
  }

  getans(ans) {
    console.log('ans', ans);
  }

  abc(data) {
    console.log(data);
  }


  noOfAsked() {




    /*    this._http.get('https://school-web-7d8e8.firebaseio.com/answers/' + b['$$key'] + '/' + b['$key'] + '/' + a['$key'] + '/up' + '.json?shallow=true')
          .map(response => response.json())
          .subscribe((items) => {
            let count = items ? Object.keys(items).length : 0;
            count++;
            this.af.database.object('answers/' + b['$$key'] + '/' + b['$key'] + '/' + a['$key']).set({ answer: a['answer'], date: a['date'], uid: a['uid'], dislike: a['dislike'] | 0, count: count })
            const questionObservale = this.af.database.list('answers/' + b['$$key'] + '/' + b['$key'] + '/' + a['$key'] + '/up/');
            questionObservale.push({ date: this.date.toISOString(), uid: this.token });
          })*/
  }

}
