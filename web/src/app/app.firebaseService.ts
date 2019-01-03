import { AngularFire, AuthProviders, AuthMethods, FirebaseAuthState } from 'angularfire2';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs'
import { Router } from '@angular/router'
import { Location } from '@angular/common';
import * as firebase from 'firebase';

@Injectable()
export class firebaseService {

    constructor(private _http: Http, public af: AngularFire, private _router: Router, private _location: Location) {

    }
    UpdateFirebaseUser(email, password) {
        var user = firebase.auth().currentUser;

        user.updateEmail(email).then(function () {
            // Update successful.
        }, function (error) {
            // An error happened.
        });
        user.updatePassword(password).then(function () {
            // Update successful.
        }, function (error) {
            // An error happened.
        });
    }

    CreateFirebaseUser(uid) {
        let ans = this.af.database.list('/users')
        ans.push({ uid: uid })
    }
    back() {
        this._location.back();
    }

    /*IsLoginIn(): Observable<any> {
        return this.af.auth.is
        /*.subscribe(auth => {
          return auth;
      });

    }
*/
    login: boolean;

    isAuthenticated(): any {

        this.af.auth
            .subscribe((user) => {
                if (user) {





                    this.login = true;
                }
                else {
                    this.login = false;
                }


            })
        return this.login;
        /*
       var user = this.af.auth().currentUser;
         if(user){
             return true;
         } else {
             return false
         }*/
    }
    CreateUser(username, password): any {
        return this.af.auth.createUser({
            email: username,
            password: password,
        })
    }

    Login(username, password) {
        return this.af.auth.login({
            email: username,
            password: password,
        },
            {
                provider: AuthProviders.Password,
                method: AuthMethods.Password,
            })

    }


    Logout() {
        this.af.auth.logout();
        //   localStorage.clear();
        this._router.navigate(['/login']);


    }
    createSubject(name) {

    }


}