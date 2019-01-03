import { Component, OnInit } from '@angular/core';
import { smsService } from './smsService'
import { firebaseService } from './../app.firebaseService'
import { MdSnackBar } from '@angular/material';
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
  providers: [smsService]
})

export class MessageComponent implements OnInit {

  selectedPhone;
  teachers;
  students;

  public rowsTeacher: Array<any> = [];
  public columnsTeacher: Array<any> = [
    { title: 'name', name: 'name' },
    { title: 'date', name: 'date', sort: 'asc' },
    { title: 'phoneNo', name: 'phoneNo' },
    { title: 'status', name: 'status' },
  ];

  public rowsSelectedTeacher: Array<any> = [];
  public columnsSelectedTeacher: Array<any> = [
    { title: 'name', name: 'name' },    
    { title: 'phoneNo', name: 'phoneNo' },
    
  ];
  public configSelectedTeacher: any = {
    paging: true,
    sorting: { columns: this.columnsSelectedTeacher },
    filtering: { filterString: '' },
    className: ['table-striped', 'table-bordered'],

  };

  public configTeacher: any = {
    paging: true,
    sorting: { columns: this.columnsTeacher },
    filtering: { filterString: '' },
    className: ['table-striped', 'table-bordered']
  };



  public rowsStudent: Array<any> = [];
  public columnsStudent: Array<any> = [
    { title: 'name', name: 'name' },
    { title: 'phoneNo', name: 'phoneNo' }
  ];

  public configStudent: any = {
    paging: true,
    sorting: { columns: this.columnsStudent },
    filtering: { filterString: '' },
    className: ['table-striped', 'table-bordered']
  };
  public selection(row: any, event: Event, checked: boolean) {
    row.selected = checked;
    let value = {
      row: row,
      event: event,
      checked: checked
    };
    //this.rowSelected.emit(value);
  }

  constructor(private snackBar: MdSnackBar, private _smsService: smsService, private _firebaseService: firebaseService) {
    this.selectedPhone = [];
  }

  ngOnInit() {
    this.getAllStudentPhone();
    this.getAllTeacherPhone();

  }


  getAllTeacherPhone(): void {
    this._smsService.getAllTeacher()
      .subscribe((res) => {
        this.rowsTeacher = res
        /*console.log('teacher', res)
        this.teachers = res;*/
      })
  }

  getAllStudentPhone(): void {
    this._smsService.getAllStudent()
      .subscribe((res) => {

        this.rowsStudent = res
        /*console.log('student', res)
        this.students = res;*/
      })
  }
  sendSMS(body): void {
    this._smsService.sendAllSMS(this.selectedPhone, body)
      .subscribe((res) => {
        this.snackBar.open(name, 'SMS Send!', {
          duration: 2000
        })
      },(error)=>{
        console.log('error not send!');
      })
  }
  selectTeacher(b): void {
    let _b = b.row;
    this.selectedPhone.push(_b.phoneNo);
    this.rowsSelectedTeacher.push(_b);
  }
  selectStudent(b): void {
    let _b = b.row
    this.selectedPhone.push(_b.phoneNo);
    this.rowsSelectedTeacher.push(_b);
  }

  logout() {
    this._firebaseService.Logout()
  }
  back() {
    this._firebaseService.back();
  }






}
