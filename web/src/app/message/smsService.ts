
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs'

@Injectable()
export class smsService {
    constructor(private http: Http) {

    }
    getAllTeacher(): Observable<any> {
        return this.http
            .get('/FindAllTeacher')
            .map((r: Response) => r.json().data);
    }

    getAllStudent(): Observable<any> {
        return this.http
            .get('/FindAllStudent')
            .map((r: Response) => r.json().data);
    }
    sendAllSMS(phone, body): Observable<any> {
        return this.http
            .post('/SendAllsms', { data: { body: body, phone: phone } })
            .map((r: Response) => r.json().data);
    }


}