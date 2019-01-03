
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs'

import { Teacher } from './teacher'

@Injectable()
export class teacherService {
    constructor(private http: Http) {

    }
    getAllTeacher(): Observable<any> {
        return this.http
            .get('/FindAllTeacher')
            .map((r: Response) => r.json().data);
    }
    SaveTeacher(name, address, qualification, rank, emailId, uid, phoneNo ,status): Observable<Teacher> {

        return this.http
            .post('/SaveTeacher', { data: { name: name, address: address, qualification: qualification, rank: rank, emailId: emailId, uid: uid, phoneNo: phoneNo , status : status } })
            .map((r: Response) => r.json().data);
    }
    updateTeacher(id,name, address, qualification, emailId, uid, phoneNo,status) {
        return this.http
            .post('/UpdateTeacher', { data: { tId : id , name: name, address: address, qualification: qualification, emailId: emailId, phoneNo: phoneNo ,status:status} })
            .map((r: Response) => r.json().data);
    }


}