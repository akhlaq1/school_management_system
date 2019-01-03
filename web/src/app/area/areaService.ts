import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs'

@Injectable()
export class areaService {
    constructor(private http: Http) {
    }
    getAllAreas(): Observable<any> {
        return this.http.get('/FindAllArea')
            .map((r: Response) => r.json().data);
    }
    saveArea(name,mapbound): Observable<any> {
        return this.http.post('/SaveArea', { data: { area: name , areaBound : mapbound} })
            .map((r: Response) => r.json().data);
    }
}