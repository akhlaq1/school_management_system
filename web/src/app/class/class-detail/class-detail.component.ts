import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { classService } from './../classService';

@Component({
  selector: 'app-class-detail',
  templateUrl: './class-detail.component.html',
  styleUrls: ['./class-detail.component.css'],
  providers: [classService]
})

export class ClassDetailComponent implements OnInit, OnChanges {

  private enrolledTeachers;
  private enrolledStudents;
  private allClasses;
  private SpecificTeacher;
  private studentD;
  show = false;

  @Input() doRefresh;

  ngOnChanges() {
    this.getAllEnrolledStudents();
    this.getAllEnrolledTeachers();
    this.doRefresh = false;

    console.log(this.doRefresh)


  }



  private selectedStudent = [];
  private selectedTeacher = [];

  constructor(
    private _classService: classService
  ) {


  }


  studentDetail(studentD) {
    this.studentD = studentD
  }

  detailClass(id, type) {
    console.log(id,type)
    if (type == 'student') {
      this.selectedStudent = this.enrolledStudents.filter(function (item) {
        return item['eid']['classid'] == id ? item : ""
      })
      console.log(this.selectedStudent)
    }
    if (type == 'teacher') {
      this.selectedTeacher = this.enrolledTeachers.filter(function (item) {
        return item.classid._id == id ? item : ""
      })

      console.log(this.selectedTeacher)
        console.log(this.selectedStudent)

    }
  }

  teacherDetail(item) {
    this.show = !this.show;
    this.SpecificTeacher = item;
  }

  ngOnInit() {
    this.getAllEnrolledStudents();
    this.getAllEnrolledTeachers();
    this.getAllClasses();

  }
  getAllClasses(): void {
    this._classService.getAllClasses().subscribe((res) => {
      this.allClasses = res;
      console.log(res);
    })
  }

  getAllEnrolledTeachers(): void {
    this._classService.getEnrolledTeachers()
      .subscribe((res) => {

        this.enrolledTeachers = res;
        console.log('enrol Teachers', res);
      })
  }
  getAllEnrolledStudents(): void {
    this._classService.GetAllEnrolledStudents()
      .subscribe((res) => {
        this.enrolledStudents = res;
        console.log(res);
        console.log('enrol Students', res);
      })
  }

}
