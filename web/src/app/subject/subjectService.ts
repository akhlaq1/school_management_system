import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs'


import { Subject } from './subject'
@Injectable()
export class subjectService {
    constructor(private http: Http) {

    }
    SaveSubject(name, _id): Observable<Subject> {
        return this.http
            .post('/SaveSubject', { data: { name: name, teacherid: _id } })
            .map((r: Response) => r.json().data);
    }
    updateCSubject(_id, teacherid): Observable<any> {
        return this.http
            .post('/UpdateCSubject', { data: { _id: _id, teacherid: teacherid } })
            .map((r: Response) => r.json().data);
    }
    assignSubject(subject, teacher): Observable<Subject> {
        return this.http
            .post('/AssignSubject', { data: { id: subject, teacherid: teacher } })
            .map((r: Response) => r.json().data);
    }
    getAllSubjects(): Observable<Subject> {

        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this.http
            .get('/FindAllSubject')
            .map((r: Response) => r.json().data);

    }
    getAllAssignSubjects(): Observable<Subject> {
        return this.http
            .get('/FindAllSubjectAssign')
            .map((r: Response) => r.json().data);

    }

    updateSubject(data): Observable<Subject> {
        return this.http
            .post('/UpdateSubject', { data: { id: data.id, name: data.name } })
            .map((r: Response) => r.json().data);

    }


}