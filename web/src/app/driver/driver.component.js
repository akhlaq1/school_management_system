"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var driverService_1 = require("./driverService");
var app_Service_1 = require("./../app.Service");
var DriverComponent = (function () {
    function DriverComponent(snackBar, _appService, _firebaseService, _driverService) {
        this.snackBar = snackBar;
        this._appService = _appService;
        this._firebaseService = _firebaseService;
        this._driverService = _driverService;
        this.rows = [];
        this.columns = [
            { title: 'driverName', name: 'driverName' },
            { title: 'phone', name: 'phone' },
            { title: 'date', name: 'date', sort: 'asc' }
        ];
        this.config = {
            paging: true,
            sorting: { columns: this.columns },
            filtering: { filterString: '' },
            className: ['table-striped', 'table-bordered']
        };
    }
    DriverComponent.prototype.ngOnInit = function () {
        this.findAllDriver();
    };
    DriverComponent.prototype.saveDriver = function (driverName, email, password, phone) {
        var _this = this;
        this._firebaseService.CreateUser(email, password)
            .then(function (res) {
            var uid = res['uid'];
            _this._appService.authentication(driverName, email, password, 'driver', uid)
                .subscribe(function (res) {
                _this.snackBar.open(driverName, 'Driver Saved', {
                    duration: 2000
                });
            });
            _this._driverService.SaveVan(uid, driverName, email, password, phone).subscribe(function (data) {
                console.log(data);
            });
        });
    };
    DriverComponent.prototype.findAllDriver = function () {
        var _this = this;
        this._driverService.FindAllDriver()
            .subscribe(function (data) {
            _this.rows = data;
        });
    };
    return DriverComponent;
}());
DriverComponent = __decorate([
    core_1.Component({
        selector: 'app-driver',
        templateUrl: './driver.component.html',
        styleUrls: ['./driver.component.css'],
        providers: [driverService_1.driverService, app_Service_1.appService]
    })
], DriverComponent);
exports.DriverComponent = DriverComponent;
