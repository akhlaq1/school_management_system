import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2'

@Component({
  selector: 'app-detailtopic',
  templateUrl: './detailtopic.component.html',
  styleUrls: ['./detailtopic.component.css']
})
export class DetailtopicComponent implements OnInit {

  constructor(private af: AngularFire) { }

  questions;

  ngOnInit() {
  }
  search(id) {

    this.af.database.list('/topics/' + id)
      .map((res) => {
        let a = [];
        res.forEach((item, i) => {
          let head = Object.keys(res[0])[0]
          console.log(item[head])
          a.push(item[head])
        })
        return a;
      })
      .subscribe(res => {


        console.log(res)
        this.questions = res;

        //this.questions.push( res[head]  )
      })
  }

}
