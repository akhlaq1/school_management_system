
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { appService } from './../app.Service'
import { firebaseService } from './../app.firebaseService'


@Injectable()
    
export class RegistrationService {
    constructor(private _appService: appService, private _firebaseService: firebaseService) {

    }

    addSchool(name, emailId, type, password): any {
        return this._firebaseService.CreateUser(emailId, password)
            .then((res) => {
                let uid = res.uid;
                return this._appService.authentication(name, emailId, password, type, uid)
            })
    }
}