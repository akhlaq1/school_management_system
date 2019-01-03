import { Component, OnInit } from '@angular/core';

import { teacherService } from './../../teacher/teacherService';
import { subjectService } from './../subjectService'

@Component({
  selector: 'app-subject-class-registration',
  templateUrl: './subject-class-registration.component.html',
  styleUrls: ['./subject-class-registration.component.css'],
  providers: [teacherService, subjectService]
})
export class SubjectClassRegistrationComponent implements OnInit {

  private teachers;
  private subjects;
  private assignsubjects;

  constructor(private _teacherService: teacherService, private _subjectService: subjectService) { }


  ngOnInit() {
    this._teacherService.getAllTeacher()
      .subscribe((res) => {
        this.teachers = res;

      });
    this._subjectService.getAllSubjects()
      .subscribe((res) => {
        this.subjects = res;

      });
  }
  assignSubject(subject, teacher): void {

    this._subjectService.assignSubject(subject, teacher)
      .subscribe((res) => {
        console.log('assignSubject', res);
        this.assignsubjects = res;
      })

  }

}
