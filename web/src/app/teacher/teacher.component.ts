import { Component, OnInit, Inject } from '@angular/core';
import { teacherService } from './teacherService'
import { firebaseService } from './../app.firebaseService'
import { appService } from './../app.Service'
import { FirebaseApp } from 'angularfire2';
import { MdSnackBar } from '@angular/material';

@Component({
        selector: 'app-teacher',
        templateUrl: './teacher.component.html',
        styleUrls: ['./teacher.component.css'],
        providers: [teacherService, firebaseService, appService]
})

export class TeacherComponent implements OnInit {



        data = {};
        status = false;



        public rows: Array<any> = [];
        public columns: Array<any> = [
                { title: 'name', name: 'name' },
                { title: 'address', name: 'address' },
                { title: 'date', name: 'date', sort: 'asc' },
                { title: 'emailId', name: 'emailId' },
                { title: 'phoneNo', name: 'phoneNo' },
                { title: 'qualification', name: 'qualification', sort: 'asc' },
                { title: 'rank', name: 'rank' },
                { title: 'status', name: 'status' }
        ];

        public config: any = {
                paging: true,
                sorting: { columns: this.columns },
                filtering: { filterString: '' },
                className: ['table-striped', 'table-bordered']
        };

        type = 'teacher';
        image: any;
        _firebaseApp;
        check;
        constructor( @Inject(FirebaseApp) firebaseApp: any,
                private _teacherService: teacherService,
                private _firebaseService: firebaseService,
                private _appService: appService,
                public snackBar: MdSnackBar
        ) {
                this._firebaseApp = firebaseApp;
                this._teacherService.getAllTeacher().subscribe((res) => {
                        console.log(res);
                        this.rows = res;
                })
        }
        ngOnInit() {

                /// this.image = 'https://firebasestorage.googleapis.com/v0/b/school-web-7d8e8.appspot.com/o/images?alt=media&token=315cbb53-cf8c-454d-b989-808a74d6c6e5'
                /* const storageRef = this._firebaseApp.storage().ref().child('images');
                 storageRef.getDownloadURL()
                         .then((url) => { 
                         })*/
        }
        addTeacher(name, address, qualification, rank, emailId, password, phoneNo, status) {


                //  console.log(name.value, address.value, qualification.value, rank.value, emailId.value, password.value, phoneNo.value);
                this._firebaseService.CreateUser(emailId, password)
                        .then((res) => {
                                let uid = res.uid;
                                this._teacherService.SaveTeacher(name, address, qualification, rank, emailId, uid, phoneNo, status)
                                        .subscribe((res) => {
                                                this.snackBar.open(name, 'Registered', {
                                                        duration: 2000
                                                })
                                                this._teacherService.getAllTeacher().subscribe((res) => {
                                                        this.data = {}
                                                        this.rows = res;
                                                })
                                        }, (error) => {

                                        })

                                this._firebaseService.CreateFirebaseUser(uid)

                                this._appService.authentication(name, emailId, password, this.type, uid)
                                        .subscribe((res) => {
                                                console.log(res);
                                        })
                        })
        }

        updateTeacher(id, name, address, qualification, rank, emailId, password, phoneNo, status) {



                this._teacherService.updateTeacher(id, name, address, qualification, emailId, password, phoneNo, status)
                        .subscribe((res) => {
                                this.snackBar.open(name, 'Updated!', {
                                        duration: 2000
                                })
                                this._teacherService.getAllTeacher().subscribe((res) => {
                                        this.data = {}
                                        this.rows = res;
                                })
                        })

        }
        logout() {
                this._firebaseService.Logout()
        }
        back() {
                this._firebaseService.back();
        }

        onCellClick(data) {

                this.status = true;
                this.data = data.row

        }
        cancel() {
                this.data = {}
                this.status = false;
        }

}