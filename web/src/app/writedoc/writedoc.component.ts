import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs'

@Component({
  selector: 'app-writedoc',
  templateUrl: './writedoc.component.html',
  styleUrls: ['./writedoc.component.css']
})
export class WritedocComponent implements OnInit {

  constructor(private http: Http) { }

  ngOnInit() {

  }
  
  writeSub(name, matches) {
    
    this.http.post('/writeDoc', { data: { DocName: name, words: matches } })
      .map((r: Response) => r.json().data)
      .subscribe((res) => {
        alert('document saved')
        console.log('docuement save', res)
      })
  }

}
