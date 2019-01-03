
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs'


@Injectable()
export class routesService {
    constructor(private http: Http) {

    }
    saveBusStop(name): Observable<any> {
        return this.http
            .post('/SaveBusStop', { data: { location : name } })
            .map((r: Response) => r.json().data);
    }
    FindBusStop(): Observable<any> {
        return this.http
            .get('/FindBusStop')
            .map((r: Response) => r.json().data);
    }


    saveRoute(title,wayPoints,origin,destination): Observable<any> {
        return this.http
            .post('/SaveRoute', { data: { waypoints : wayPoints, title : title , origin : origin , destination : destination } })
            .map((r: Response) => r.json().data);
    }

    FindRoutes(): Observable<any> {
        return this.http
            .get('/FindRoute')
            .map((r: Response) => r.json().data);
    }




}