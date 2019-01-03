import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

@Component({
  selector: 'app-writesubject',
  templateUrl: './writesubject.component.html',
  styleUrls: ['./writesubject.component.css']
})
export class WritesubjectComponent implements OnInit {

  constructor(private http: Http) { }

  ngOnInit() {
  }
   writeSub(name) {
    this.http.post('/writeSubject', { data: { name: name } })
      .map((r: Response) => r.json().data)
      .subscribe((res) => {
        alert('document saved')
        console.log('docuement save', res)
      })
  }

}
