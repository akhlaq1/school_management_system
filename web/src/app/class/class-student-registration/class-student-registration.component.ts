import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


import { studentService } from './../../student/studentService';
import { classService } from './../classService'
import { MdSnackBar } from '@angular/material';


@Component({
  selector: 'app-class-student-registration',
  templateUrl: './class-student-registration.component.html',
  styleUrls: ['./class-student-registration.component.css'],
  providers: [studentService, classService]
})
export class ClassStudentRegistrationComponent implements OnInit {

  constructor(public snackBar: MdSnackBar, private _classService: classService, private _studentService: studentService) {
  }

  @Output() update: EventEmitter<number> = new EventEmitter<number>();


  private students;
  private enrolledclass;
  private classes;


  ngOnInit() {
    this.getAllClasses();
    this.getAllEnrolled();
    this.getAllStudent();
    this.getAllEnrolledStudents();
  }
  getAllClasses(): void {
    this._classService.getAllClasses()
      .subscribe((res) => {
        this.classes = res;
        console.log(this.classes);
      })
  }
  updateClass() {
    this.getAllEnrolled();
    this.getAllClasses();
  }
  updateStudent() {
    this.getAllStudent();
  }

  getAllEnrolled(): void {
    this._classService.getEnrolledTeachers()
      .subscribe((res) => {
        //      console.log(res);
        //console.log(res);
        this.enrolledclass = res;
      })
  }

  getAllStudent(): void {
    this._studentService.getAllStudent()
      .subscribe((res) => {
        this.students = res;
      })
  }
  assignStudent(eid, studentid): void {

    this._classService.AssigStudent(eid, studentid)
      .subscribe((res) => {
        this.snackBar.open(name, 'Student Assign', {
          duration: 2000
        })
        this.update.emit(1);

      })
  }
  getAllEnrolledStudents(): void {
    this._classService.GetAllEnrolledStudents()
      .subscribe((res) => {
        //   console.log(res); 
      })

  }



}
