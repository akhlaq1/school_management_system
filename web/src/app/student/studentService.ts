
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs'

import { Student } from './student'

@Injectable()
export class studentService {
    constructor(private http: Http) {

    }
    SaveStudent(name, uid, phone): Observable<Student> {
        return this.http
            .post('/SaveStudent', { data: { name: name, uid: uid, phoneNo : phone } })
            .map((r: Response) => r.json().data);
    }
    EditStudent(name, _id, phone): Observable<Student> {
        return this.http
            .post('/EditStudent', { data: { name: name, _id : _id, phoneNo : phone } })
            .map((r: Response) => r.json().data);
    }
    getAllStudent(): Observable<any> {
        return this.http
            .get('/FindAllStudent')
            .map((r: Response) => r.json().data);   
    }


}