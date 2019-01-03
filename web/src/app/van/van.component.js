"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var areaService_1 = require("./../area/areaService");
var driverService_1 = require("./../driver/driverService");
var vanService_1 = require("./vanService");
var studentService_1 = require("./../student/studentService");
var VanComponent = (function () {
    function VanComponent(_firebaseService, _areaService, _vanService, _driverService, _studentService, snackBar) {
        this._firebaseService = _firebaseService;
        this._areaService = _areaService;
        this._vanService = _vanService;
        this._driverService = _driverService;
        this._studentService = _studentService;
        this.snackBar = snackBar;
        this.selectedStudent = [];
        this.object = {
            selected: false
        };
    }
    VanComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._areaService.getAllAreas().subscribe(function (data) {
            _this.areas = data;
        });
        this._driverService.FindAllDriver().subscribe(function (data) {
            _this.drivers = data;
        });
        this._studentService.getAllStudent()
            .subscribe(function (data) {
            _this.data = data;
            console.log(data);
        });
    };
    VanComponent.prototype.onChangeArea = function (deviceValue) {
        console.log(deviceValue);
        this.selectedAreaObj = deviceValue;
    };
    VanComponent.prototype.onChangeDriver = function (deviceValue) {
        console.log(deviceValue);
        this.selectedAreaObj = deviceValue;
    };
    VanComponent.prototype.saveVan = function (selectedAreaObj, selectedDriverObj, vanname, lisence, nic, servicelocation, noOfSeats) {
        // this._firebaseService.CreateUser(email, password)
        //   .then((res) => {
        //     console.log(res);
        //     // this._vanService.SaveVan(g, a, h, id).subscribe((data) => {
        //     //   console.log(data)
        //     // })
        // })
        var _this = this;
        this._vanService.SaveVan(selectedAreaObj, selectedDriverObj, vanname, lisence, nic, servicelocation, noOfSeats, this.selectedStudent)
            .subscribe(function (res) {
            _this.snackBar.open(vanname, 'Vane Save', {
                duration: 2000
            });
        });
    };
    VanComponent.prototype.SelectedStudent = function (data) {
        var o = { _id: data['_id'] };
        this.selectedStudent.push(o);
    };
    return VanComponent;
}());
VanComponent = __decorate([
    core_1.Component({
        selector: 'app-van',
        templateUrl: './van.component.html',
        styleUrls: ['./van.component.css'],
        providers: [areaService_1.areaService, vanService_1.vanService, driverService_1.driverService, studentService_1.studentService]
    })
], VanComponent);
exports.VanComponent = VanComponent;
