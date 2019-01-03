import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2'

//import {MathJax} from './mathjax'


@Component({
  selector: 'app-notice-board',
  templateUrl: './notice-board.component.html',
  styleUrls: ['./notice-board.component.css'],
  
})
export class NoticeBoardComponent implements OnInit {

  type; token;
  userDetail: {};
  messages : any;
  data = "<div> $${{ -b \\pm \\sqrt {{b^2} -4ac}} \\over {2a }} $$ </div>"
  //data0 = "<div> $${{ -b \\pm \\sqrt {{b^2} -4ac}} \\over {2a }} $$ </div>"

  constructor( private _af: AngularFire) {
    if (localStorage.getItem('status')) {
      
      
      this.type = JSON.parse(localStorage.getItem('status'))['type']
      this.token = JSON.parse(localStorage.getItem('status'))['uid']
    }
  }

  ngOnInit() {

    

      this._af.database.list('messages')
        .map(item => {
          console.log(item)
          return item;
        })
        .subscribe((messages)=>{
          this.messages = messages;
        })

  }
  submit(subject, content) {
    this._af.auth.subscribe((user) => {
      this._af.database.list('messages/').push({
        subject: subject,
        content: content,
        token : this.token,
        src: user.auth.photoURL,
        displayName: user.auth.displayName
      })
    })
  }
}
