import { Component, OnInit } from '@angular/core';


import { subjectService } from './../subjectService'
@Component({
  selector: 'app-subject-detail',
  templateUrl: './subject-detail.component.html',
  styleUrls: ['./subject-detail.component.css'],
  providers: [subjectService]
})
export class SubjectDetailComponent implements OnInit {

  private subjects;
  private assignsubjects;
  private teacher;

  constructor(private _subjectService: subjectService) { }

  ngOnInit() {
    this._subjectService.getAllSubjects()
      .subscribe((res) => {
        this.subjects = res;
        console.log(res);
      })
    this._subjectService.getAllAssignSubjects()
      .subscribe((res) => {

        this.assignsubjects = res;
        console.log(res);
      })
  }
  detail(i) {

    //console.log(i);

    let c = this.subjects.filter(function (item) {
      return item['_id'] == i ? item['_id'] : ""

    })
    let d = this.assignsubjects.filter(function (item) {
      return c[0]['_id'] == item['_id'] ? true : false
    })
    this.teacher = d[0];

    /*
    
    */

  }

}
