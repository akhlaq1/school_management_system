import { Component, OnInit } from '@angular/core';


import { emailService } from './emailService'
import { firebaseService } from './../app.firebaseService';
import { MdSnackBar } from '@angular/material';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css'],
  providers: [emailService]
})
export class EmailComponent implements OnInit {

  constructor(private snackBar: MdSnackBar,private _emailService: emailService, private _firebaseService: firebaseService) {

  }

  teachers;
  students;
  selectedEmails;
  selectedTeachers;
  selectedStudents;
  ngOnInit() {
    this.selectedEmails = [];
    this.getAllTeacherEmail();
    this.getAllStudentEmail();
  }

  getAllTeacherEmail(): void {
    this._emailService.getAllTeacherEmail()
      .subscribe((res) => {
        this.teachers = res;
      })
  }

  getAllStudentEmail(): void {
    this._emailService.getAllStudentEmail()
      .subscribe((res) => {
        this.students = res;
      })
  }
  sendMail(subject, body): void {
    this._emailService.sendAllEmail(this.selectedEmails, subject, body)
    
      .subscribe((res) => {
        this.snackBar.open(subject, 'Registered', {
          duration: 2000
        })
        //console.log(res);
      })
  }
  selectTeacher(b): void {
    this.selectedEmails.push(b.email);
  }
  selectStudent(b): void {
    this.selectedEmails.push(b.email);
  }


  logout() {
    this._firebaseService.Logout()
  }
  back() {
    this._firebaseService.back();
  }

}
