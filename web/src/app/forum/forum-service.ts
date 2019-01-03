
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs'

@Injectable()
export class  ForumService {
    constructor(private http: Http) {

    }
/*    SaveStudent(name, uid, phone): Observable<any> {
        return this.http
            .post('/SaveStudent', { data: { name: name, uid: uid, phoneNo : phone } })
            .map((r: Response) => r.json().data);
    }*/
    MatchAllWords(object): Observable<any> {
        return this.http
            .post('/FindDoc', { data: {words : object} })
            .map((r: Response) => r.json());   
    }

    MatchTopics(object): Observable<any> {
        return this.http
            .post('/FindTopic', { data: {words : object} })
            .map((r: Response) => r.json());   
    }


}