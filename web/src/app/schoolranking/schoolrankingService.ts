
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { appService } from './../app.Service'
import { firebaseService } from './../app.firebaseService'
import { Http, Response } from '@angular/http';

@Injectable()

export class SchoolRankingService {
    constructor(public http: Http, private _appService: appService, private _firebaseService: firebaseService) {

    }

    data;

   

}