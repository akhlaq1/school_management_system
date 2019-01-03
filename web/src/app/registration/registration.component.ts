import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
//import {RegistrationService} from './registrationService'
import { appService } from './../app.Service'
import { firebaseService } from './../app.firebaseService'
import { MdSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  providers: [appService, firebaseService]
})
export class RegistrationComponent implements OnInit {
  data: any = {};
  constructor(
    private snackBar: MdSnackBar,
    public http: Http,
    private _firebaseService: firebaseService,
    private _appService: appService,
    private router: Router

  ) {
  }
  type = 'admin';
  makeRequest(): void {

    this.http.request('/FindAuthentication')
      .subscribe((res: Response) => {
        if (res) {
          this.data = res.json();

        }

      }, (error) => {
        console.log(error);
      });
  }
  ngOnInit() {
  }

  addSchool(name, email, password): void {
    this._firebaseService
      .CreateUser(email, password)
      .then((res) => {

        let uid = res['uid'];
        this._appService
          .authentication(name, email, password, this.type, uid)
          .subscribe((res) => {
            if (res) {
              this.router.navigate(['login']);
              this.snackBar.open("", 'School Saved', {
                duration: 2000
              })

            }

          }, (error) => {
            alert(error.message)
            
          })

      }, (error) => {
        alert(error.message)
      })
  }

}