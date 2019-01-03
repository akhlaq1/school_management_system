"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require("@angular/core");
var teacherService_1 = require("./teacherService");
var app_firebaseService_1 = require("./../app.firebaseService");
var app_Service_1 = require("./../app.Service");
var angularfire2_1 = require("angularfire2");
var TeacherComponent = (function () {
    function TeacherComponent(firebaseApp, _teacherService, _firebaseService, _appService, snackBar) {
        var _this = this;
        this._teacherService = _teacherService;
        this._firebaseService = _firebaseService;
        this._appService = _appService;
        this.snackBar = snackBar;
        this.data = {};
        this.status = false;
        this.rows = [];
        this.columns = [
            { title: 'name', name: 'name' },
            { title: 'address', name: 'address' },
            { title: 'date', name: 'date', sort: 'asc' },
            { title: 'emailId', name: 'emailId' },
            { title: 'phoneNo', name: 'phoneNo' },
            { title: 'qualification', name: 'qualification', sort: 'asc' },
            { title: 'rank', name: 'rank' },
            { title: 'status', name: 'status' }
        ];
        this.config = {
            paging: true,
            sorting: { columns: this.columns },
            filtering: { filterString: '' },
            className: ['table-striped', 'table-bordered']
        };
        this.type = 'teacher';
        this._firebaseApp = firebaseApp;
        this._teacherService.getAllTeacher().subscribe(function (res) {
            console.log(res);
            _this.rows = res;
        });
    }
    TeacherComponent.prototype.ngOnInit = function () {
        /// this.image = 'https://firebasestorage.googleapis.com/v0/b/school-web-7d8e8.appspot.com/o/images?alt=media&token=315cbb53-cf8c-454d-b989-808a74d6c6e5'
        /* const storageRef = this._firebaseApp.storage().ref().child('images');
         storageRef.getDownloadURL()
                 .then((url) => {
                 })*/
    };
    TeacherComponent.prototype.addTeacher = function (name, address, qualification, rank, emailId, password, phoneNo, status) {
        var _this = this;
        //  console.log(name.value, address.value, qualification.value, rank.value, emailId.value, password.value, phoneNo.value);
        this._firebaseService.CreateUser(emailId, password)
            .then(function (res) {
            var uid = res.uid;
            _this._teacherService.SaveTeacher(name, address, qualification, rank, emailId, uid, phoneNo, status)
                .subscribe(function (res) {
                _this.snackBar.open(name, 'Registered', {
                    duration: 2000
                });
                _this._teacherService.getAllTeacher().subscribe(function (res) {
                    _this.data = {};
                    _this.rows = res;
                });
            }, function (error) {
            });
            _this._firebaseService.CreateFirebaseUser(uid);
            _this._appService.authentication(name, emailId, password, _this.type, uid)
                .subscribe(function (res) {
                console.log(res);
            });
        });
    };
    TeacherComponent.prototype.updateTeacher = function (id, name, address, qualification, rank, emailId, password, phoneNo, status) {
        var _this = this;
        this._teacherService.updateTeacher(id, name, address, qualification, emailId, password, phoneNo, status)
            .subscribe(function (res) {
            _this.snackBar.open(name, 'Updated!', {
                duration: 2000
            });
            _this._teacherService.getAllTeacher().subscribe(function (res) {
                _this.data = {};
                _this.rows = res;
            });
        });
    };
    TeacherComponent.prototype.logout = function () {
        this._firebaseService.Logout();
    };
    TeacherComponent.prototype.back = function () {
        this._firebaseService.back();
    };
    TeacherComponent.prototype.onCellClick = function (data) {
        this.status = true;
        this.data = data.row;
    };
    TeacherComponent.prototype.cancel = function () {
        this.data = {};
        this.status = false;
    };
    return TeacherComponent;
}());
TeacherComponent = __decorate([
    core_1.Component({
        selector: 'app-teacher',
        templateUrl: './teacher.component.html',
        styleUrls: ['./teacher.component.css'],
        providers: [teacherService_1.teacherService, app_firebaseService_1.firebaseService, app_Service_1.appService]
    }),
    __param(0, core_1.Inject(angularfire2_1.FirebaseApp))
], TeacherComponent);
exports.TeacherComponent = TeacherComponent;
