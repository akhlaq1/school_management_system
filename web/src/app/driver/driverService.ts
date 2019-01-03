
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs'

@Injectable()
export class driverService {
    constructor(private http: Http) {

    }

    SaveVan(uid, driverName, email, password, phone): Observable<any> {
        return this.http.post('/SaveDriver',{data :  { uid: uid, driverName: driverName, email: email, password: password, phone: phone } } )
        .map(r => r.json());

    }
    FindAllDriver(): Observable<any> {
        return this.http.get('/FindAllDriver')
            .map((r: Response) => r.json().data);
    }

}