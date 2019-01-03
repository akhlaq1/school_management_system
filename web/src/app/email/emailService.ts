
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs'

@Injectable()
export class emailService {
    constructor(private http: Http) {

    }
    getAllTeacherEmail(): Observable<any> {
        return this.http
            .post('/FindAllEmails', { data: { roll: 'teacher' } })
            .map((r: Response) => r.json().data);
    }

    getAllStudentEmail(): Observable<any> {
        return this.http
            .post('/FindAllEmails', { data: { roll: 'student' } })
            .map((r: Response) => r.json().data);
    }
    sendAllEmail(emails, subject, body): Observable<any> {
        return this.http
            .post('/SendAllEmails', { data: { emails: emails, subject: subject, body: body } })
            .map((r: Response) => r.json().data);
    }


}