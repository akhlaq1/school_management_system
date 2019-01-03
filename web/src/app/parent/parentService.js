"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var parentService = (function () {
    function parentService(http) {
        this.http = http;
    }
    parentService.prototype.getAllParents = function () {
        return this.http.get('/FindAllParent')
            .map(function (r) { return r.json().data; });
    };
    // saveParents(data):Observable<any>{
    //     this.http.post('/',data:{ gardian:data.gardian, })
    // }
    parentService.prototype.saveParents = function (gardian, address, houseNo, studentId, emailid, vanId) {
        console.log(studentId);
        return this.http
            .post('/SaveParent', { data: { gardian: gardian, address: address, houseNo: houseNo, studentId: studentId, emailid: emailid, vanId: vanId } })
            .map(function (r) { return r.json().data; });
    };
    return parentService;
}());
parentService = __decorate([
    core_1.Injectable()
], parentService);
exports.parentService = parentService;
