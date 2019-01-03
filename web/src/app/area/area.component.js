"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var areaService_1 = require("./areaService");
var vanService_1 = require("./../van/vanService");
var AreaComponent = (function () {
    function AreaComponent(snackBar, _vanService, _areaService) {
        this.snackBar = snackBar;
        this._vanService = _vanService;
        this._areaService = _areaService;
    }
    AreaComponent.prototype.ngOnInit = function () {
        this._areaService.getAllAreas().subscribe(function (data) {
            console.log(data);
        });
    };
    AreaComponent.prototype.getAreaDetail = function (message) {
        this.name = message.results[0].formatted_address;
        this.mapBound = message.results[0].geometry.bounds;
    };
    AreaComponent.prototype.saveArea = function () {
        var _this = this;
        this._areaService.saveArea(this.name, this.mapBound).subscribe(function (data) {
            console.log(data);
            _this.snackBar.open(_this.name, 'Area Save', {
                duration: 2000
            });
        });
    };
    return AreaComponent;
}());
AreaComponent = __decorate([
    core_1.Component({
        selector: 'app-area',
        templateUrl: './area.component.html',
        styleUrls: ['./area.component.css'],
        providers: [areaService_1.areaService, vanService_1.vanService],
    })
], AreaComponent);
exports.AreaComponent = AreaComponent;
