
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs'


@Injectable()
export class settingService {
    constructor(private http: Http) {

    }
    UpdateTiming(start,end): Observable<any> {
        return this.http
            .post('/UpdateTiming', { data: { start: start, end : end } })
            .map((r: Response) => r.json().data);
    }

        updateLocation(x,y): Observable<any> {
        return this.http
            .post('/UpdateSchoolCoordinates', { data: { coordX: x, coordY : y } })
            .map((r: Response) => r.json().data);
    }


}