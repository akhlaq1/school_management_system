import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { firebaseService } from './app.firebaseService'
@Injectable()
export class AuthGuard implements CanActivate {

    type; uid;



    //private _firebaseService: firebaseService
    constructor(private router: Router, private _firebaseService: firebaseService) {

    }

    canActivate() {

        return this._firebaseService.isAuthenticated();
        /*        if (localStorage.getItem('status')) {
        
                    this.type = JSON.parse(localStorage.getItem('status'))['type']
                    this.uid = JSON.parse(localStorage.getItem('status'))['uid']
        
        
                    if (this.type == 'teacher') {
                        this.router.navigate(['/teacher']);
                    }
                    else if (this.type == 'student') {
                        this.router.navigate(['student-profile', this.uid]);
                    }
                    else {
                        this.router.navigate(['/login']);
                    }
                }
                return true;*/
    }
}