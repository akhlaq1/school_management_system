import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { subjectService } from './subjectService'
import { firebaseService } from './../app.firebaseService'
import { teacherService } from './../teacher/teacherService'
import { MdSnackBar } from '@angular/material';
@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css'],
  providers: [subjectService, firebaseService, teacherService]
})
export class SubjectComponent implements OnInit {

  token = 0;
  date = new Date();
  teachers;
  subjects;
  subjectName;
  teacherInfo;
  selected = false;
  favoriteSeason;
  name;
  constructor(private _subjectService: subjectService,
    private _firebaseService: firebaseService,
    private _teacherService: teacherService,
    private cd: ChangeDetectorRef,
    private snackBar: MdSnackBar
  ) {

    if (JSON.parse(localStorage.getItem('status'))) {
      this.token = JSON.parse(localStorage.getItem('status'))['uid'];
    }

  }

  ngOnInit() {


    this._teacherService.getAllTeacher().subscribe((res) => {
      this.teachers = res;
      console.log(res);
      this.selected = false;



    });

    this._subjectService.getAllSubjects().subscribe((res) => {
      this.subjects = res;

      console.log(res);
    })


  }
  showInfo(info): void {
    this.teacherInfo = info;
    this.selected = true;

  }
  saveSubject(_id, teacheruId, teacherId): void {


    this._subjectService.updateCSubject(_id, teacherId)

      .subscribe((res) => {
        console.log(res);

        this.snackBar.open(name, 'Registered', {
          duration: 2000
        })
        const questionObservale = this._firebaseService.af.database.list('subjects/' + res['_id']);
        questionObservale.push({ name: name, date: this.date.toISOString(), tuid: teacheruId, uid: this.token });


      })



  }
  updateSubject(data): void {



    console.log(data);


  }
  selectSubject(obj): void {

    this.subjectName = obj.name;

    this.cd.markForCheck();

    console.log(obj);

  }

  getAllSubject(): void {

  }
  logout() {
    this._firebaseService.Logout()
  }
  back() {
    this._firebaseService.back();
  }

}
