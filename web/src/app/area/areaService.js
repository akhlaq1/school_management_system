"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var areaService = (function () {
    function areaService(http) {
        this.http = http;
    }
    areaService.prototype.getAllAreas = function () {
        return this.http.get('/FindAllArea')
            .map(function (r) { return r.json().data; });
    };
    areaService.prototype.saveArea = function (name, mapbound) {
        return this.http.post('/SaveArea', { data: { area: name, areaBound: mapbound } })
            .map(function (r) { return r.json().data; });
    };
    return areaService;
}());
areaService = __decorate([
    core_1.Injectable()
], areaService);
exports.areaService = areaService;
