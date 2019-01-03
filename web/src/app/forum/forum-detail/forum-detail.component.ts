import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2'
import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-forum-detail',
  templateUrl: './forum-detail.component.html',
  styleUrls: ['./forum-detail.component.css'],
  outputs: ['replay']


})
export class ForumDetailComponent implements OnInit {

  replay: EventEmitter<any>;

  constructor() {
    this.replay = new EventEmitter() ;

  }

  @Input()
  itemList

  ngOnInit() {
  }

  addReplay(name) {
  this.replay.emit(name);
}

}
