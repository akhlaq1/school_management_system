import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Http, Response } from '@angular/http';

import { teacherService } from './../../teacher/teacherService';
import { classService } from './../classService'
import { MdSnackBar } from '@angular/material';

@Component({
    selector: 'app-class-teacher-registration',
    templateUrl: './class-teacher-registration.component.html',
    styleUrls: ['./class-teacher-registration.component.css'],
    providers: [teacherService, classService]
})
export class ClassTeacherRegistrationComponent implements OnInit {

    private classes;
    private teachers;
    private class: any;
    private assignTeachers = [];



    @Output() update: EventEmitter<number> = new EventEmitter<number>();

    constructor(public snackBar: MdSnackBar, private _classService: classService, private _teacherService: teacherService) {

    }

    ngOnInit() {
        this.getClasses();
        this.getAllTeacher();
        this.getEnrolledTeachers()
    }

    getClasses(): void {
        this._classService.getAllClasses()
            .subscribe((res) => {
                console.log(res);
                this.classes = res;
            })
    }

    getAllTeacher(): void {
        this._teacherService.getAllTeacher()
            .subscribe((res) => {
                this.teachers = res;
            })
    }

    getEnrolledTeachers() {
        this._classService.getEnrolledTeachers()
            .subscribe((item) => {
                this.assignTeachers = item;
            })
    }


    assignTeacher(classid, teacherid): void {



        let found = false;

        this.assignTeachers.filter((item) => {
            console.log(item['classid']['_id'] == classid && item['teacherId']['_id'] == teacherid)
            found = item['classid']['_id'] == classid && item['teacherId']['_id'] == teacherid
        })

        if (!found || this.assignTeachers.length == 0) {
            this._classService.AssignTeacher(classid, teacherid)
                .subscribe((res) => {
                    this.snackBar.open(name, 'Teacher Assign', {
                        duration: 2000
                    })
                    this.update.emit(1);
                    this.getEnrolledTeachers();

                })
        }
    }

    updateClass() {
        this._classService.getAllClasses()
            .subscribe((res) => {
                console.log(res);
                this.classes = res;
            })
    }
    updateTeacher() {
        this._teacherService.getAllTeacher()
            .subscribe((res) => {
                this.teachers = res;
            })
    }







}
