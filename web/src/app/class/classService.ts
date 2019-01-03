import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs'

import { Class } from './class'

@Injectable()
export class classService {
        constructor(private http: Http) {

        }
        getAllClasses(): Observable<Class> {
                return this.http
                        .get('/FindAllClass')
                        .map((r: Response) => r.json().data);
        }
        SaveClass(name): Observable<Class> {
                return this.http
                        .post('/SaveClass', { data: { name: name } })
                        .map((r: Response) => r.json().data);
        }
        AssignTeacher(classid, teacherId): Observable<Class> {
                return this.http
                        .post('/SaveEnrollement', { data: { classid: classid, teacherId: teacherId } })
                        .map((r: Response) => r.json().data);
        }
        getEnrolledTeachers(): Observable<any> {
                return this.http
                        .get('/FindFullEnrollement')
                        .map((r: Response) => r.json().data)
                        
        }
        AssigStudent(eid, studentid): Observable<Class> {
               console.log('1',eid,'1',studentid);
               return this.http
                        .post('/SaveStudentEnrolled', { data: { sId : studentid , enrolled : eid   } })
                        .map((r: Response) => r.json().data);
        }
        GetAllEnrolledStudents(): Observable<Class> {
                 return this.http
                        .get('/FindAllStudentEnrolled')
                        .map((r: Response) => r.json().data)
        }

}