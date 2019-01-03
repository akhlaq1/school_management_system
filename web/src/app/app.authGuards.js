"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var AuthGuard = (function () {
    //private _firebaseService: firebaseService
    function AuthGuard(router, _firebaseService) {
        this.router = router;
        this._firebaseService = _firebaseService;
    }
    AuthGuard.prototype.canActivate = function () {
        return this._firebaseService.isAuthenticated();
        /*        if (localStorage.getItem('status')) {
        
                    this.type = JSON.parse(localStorage.getItem('status'))['type']
                    this.uid = JSON.parse(localStorage.getItem('status'))['uid']
        
        
                    if (this.type == 'teacher') {
                        this.router.navigate(['/teacher']);
                    }
                    else if (this.type == 'student') {
                        this.router.navigate(['student-profile', this.uid]);
                    }
                    else {
                        this.router.navigate(['/login']);
                    }
                }
                return true;*/
    };
    return AuthGuard;
}());
AuthGuard = __decorate([
    core_1.Injectable()
], AuthGuard);
exports.AuthGuard = AuthGuard;
