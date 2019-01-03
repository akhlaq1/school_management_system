import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { classService } from './classService';

import { firebaseService } from './../app.firebaseService';
import { MdSnackBar } from '@angular/material';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css'],
  providers: [classService]
})

export class ClassComponent {

  private _classService: classService;
  private _class;

  refresh;

  constructor(_classService: classService, private _firebaseService: firebaseService,
    private snackBar: MdSnackBar
  ) {
    this._classService = _classService;
    this.getAllClasses();
  }

  change() {
    this.refresh = !this.refresh;
    console.log('emit');
  }

  getAllClasses(): void {
    this._classService.getAllClasses()
      .subscribe((_res) => {
        if (_res) {
          this._class = _res
        }
      })
  }






  addClass(name): void {
    let found = false;
    this._class.filter(function (item) {
      if (item['name'] == name) {
        found = true;
      }
    })

    if (!found || this._class.length == 0) {

      this._classService.SaveClass(name).subscribe((res) => {
        //console.log(res);
        this.snackBar.open(name, 'Registered', {
          duration: 2000
        })
        this.getAllClasses();
      })
    }
    else {
      alert('Already Exist')
    }


  }



  logout() {
    this._firebaseService.Logout()
  }
  back() {
    this._firebaseService.back();
  }

}
