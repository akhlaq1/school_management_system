"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var smsService_1 = require("./smsService");
var MessageComponent = (function () {
    function MessageComponent(snackBar, _smsService, _firebaseService) {
        this.snackBar = snackBar;
        this._smsService = _smsService;
        this._firebaseService = _firebaseService;
        this.rowsTeacher = [];
        this.columnsTeacher = [
            { title: 'name', name: 'name' },
            { title: 'date', name: 'date', sort: 'asc' },
            { title: 'phoneNo', name: 'phoneNo' },
            { title: 'status', name: 'status' },
        ];
        this.rowsSelectedTeacher = [];
        this.columnsSelectedTeacher = [
            { title: 'name', name: 'name' },
            { title: 'phoneNo', name: 'phoneNo' },
        ];
        this.configSelectedTeacher = {
            paging: true,
            sorting: { columns: this.columnsSelectedTeacher },
            filtering: { filterString: '' },
            className: ['table-striped', 'table-bordered'],
        };
        this.configTeacher = {
            paging: true,
            sorting: { columns: this.columnsTeacher },
            filtering: { filterString: '' },
            className: ['table-striped', 'table-bordered']
        };
        this.rowsStudent = [];
        this.columnsStudent = [
            { title: 'name', name: 'name' },
            { title: 'phoneNo', name: 'phoneNo' }
        ];
        this.configStudent = {
            paging: true,
            sorting: { columns: this.columnsStudent },
            filtering: { filterString: '' },
            className: ['table-striped', 'table-bordered']
        };
        this.selectedPhone = [];
    }
    MessageComponent.prototype.selection = function (row, event, checked) {
        row.selected = checked;
        var value = {
            row: row,
            event: event,
            checked: checked
        };
        //this.rowSelected.emit(value);
    };
    MessageComponent.prototype.ngOnInit = function () {
        this.getAllStudentPhone();
        this.getAllTeacherPhone();
    };
    MessageComponent.prototype.getAllTeacherPhone = function () {
        var _this = this;
        this._smsService.getAllTeacher()
            .subscribe(function (res) {
            _this.rowsTeacher = res;
            /*console.log('teacher', res)
            this.teachers = res;*/
        });
    };
    MessageComponent.prototype.getAllStudentPhone = function () {
        var _this = this;
        this._smsService.getAllStudent()
            .subscribe(function (res) {
            _this.rowsStudent = res;
            /*console.log('student', res)
            this.students = res;*/
        });
    };
    MessageComponent.prototype.sendSMS = function (body) {
        var _this = this;
        this._smsService.sendAllSMS(this.selectedPhone, body)
            .subscribe(function (res) {
            _this.snackBar.open(name, 'SMS Send!', {
                duration: 2000
            });
        }, function (error) {
            console.log('error not send!');
        });
    };
    MessageComponent.prototype.selectTeacher = function (b) {
        var _b = b.row;
        this.selectedPhone.push(_b.phoneNo);
        this.rowsSelectedTeacher.push(_b);
    };
    MessageComponent.prototype.selectStudent = function (b) {
        var _b = b.row;
        this.selectedPhone.push(_b.phoneNo);
        this.rowsSelectedTeacher.push(_b);
    };
    MessageComponent.prototype.logout = function () {
        this._firebaseService.Logout();
    };
    MessageComponent.prototype.back = function () {
        this._firebaseService.back();
    };
    return MessageComponent;
}());
MessageComponent = __decorate([
    core_1.Component({
        selector: 'app-message',
        templateUrl: './message.component.html',
        styleUrls: ['./message.component.css'],
        providers: [smsService_1.smsService]
    })
], MessageComponent);
exports.MessageComponent = MessageComponent;
