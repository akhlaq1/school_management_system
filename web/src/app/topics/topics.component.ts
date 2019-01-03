import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs'


@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})
export class TopicsComponent implements OnInit {

constructor(private http: Http) { }

  ngOnInit() {
  }

  writeTopic(name, matches) {

    this.http.post('/SaveTopic', { data: { topicName : name, words: matches } })
      .map((r: Response) => r.json().data)
      .subscribe((res) => {
        alert('Topic saved')
        console.log('Topic save', res)
      })
  }

}
