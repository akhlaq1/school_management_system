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
var angularfire2_1 = require("angularfire2");
var StudentDetailComponent = (function () {
    function StudentDetailComponent(firebaseApp, cd, route, zone, 
        /*private authState: FirebaseAuthState,*/
        af, _http, _firebaseService) {
        var _this = this;
        this.cd = cd;
        this.route = route;
        this.zone = zone;
        this.af = af;
        this._http = _http;
        this._firebaseService = _firebaseService;
        this.edit = false;
        this.isNotice = false;
        this._firebase = firebaseApp;
        this.updateProf().onAuthStateChanged(function (user) {
            if (user) {
                _this.ProfileName = user.displayName;
                _this.photoURL = user.photoURL;
                _this.cd.markForCheck();
            }
        });
        //{"uid":"Zc3VDVboTbSkHxRuMhMFi3YIl3c2","displayName":null,"photoURL":null,"email":"student02@student02.com","emailVerified":false,"isAnonymous":false,"providerData":[{"uid":"student02@student02.com","displayName":null,"photoURL":null,"email":"student02@student02.com","providerId":"password"}],
        route.params.subscribe(function (params) {
            _this.id = params['id'];
            _this.af.database.list('subjects')
                .subscribe(function (res) {
                _this.subjects = res;
                res.forEach(function (response, i) {
                    var queryObservable = _this.af.database.list('/questions/' + _this.id, {
                        query: {
                            orderByChild: 'uid',
                            equalTo: _this.id,
                        }
                    }).subscribe(function (r) {
                        _this.questions = r;
                    });
                });
            });
        });
    }
    StudentDetailComponent.prototype.ngOnInit = function () {
        //this.ProfileName = "hasan";
    };
    StudentDetailComponent.prototype.doNotice = function () {
        this.isNotice = !this.isNotice;
    };
    StudentDetailComponent.prototype.logout = function () {
        this._firebaseService.Logout();
    };
    StudentDetailComponent.prototype.updateProf = function () {
        return this._firebase.auth();
    };
    StudentDetailComponent.prototype.doEdit = function () {
        this.edit = true;
    };
    StudentDetailComponent.prototype.update = function (name, image) {
        var user = this._firebase.auth().currentUser;
        var updateUser = this.af.database.list('/users');
        var cuser = this.af.database.list('/users', {
            query: {
                orderByChild: 'uid',
                equalTo: user.uid,
            }
        });
        var storageRef = this._firebase.storage().ref().child('images');
        var metadata = {
            contentType: 'image/jpeg',
        };
        var uploadTask = storageRef.child(image.files[0].name).put(image.files[0], metadata);
        uploadTask.on('state_changed', function (snapshot) {
            console.log(snapshot);
        }, function (error) {
            console.log(error);
        }, function () {
            var downloadURL = uploadTask.snapshot.downloadURL;
            this.myImage = downloadURL;
            cuser.subscribe(function (res) {
                //this.af.database.list('/users/' + res[0]['$key'])
                if (res[0]) {
                    updateUser.update(res[0]['$key'], { uid: user.uid, photoURL: downloadURL });
                }
            });
            user.updateProfile({
                displayName: name,
                photoURL: this.myImage
            }).then(function (res) {
            }, function (error) {
                // An error happened.
            });
            /*   this.af.database.list('/users', {
                 query: {
                   orderByChild: 'uid',
                   equalTo: user.uid,
                 }
               })
               //.update({ uid: user.uid, photoURL: downloadURL })
               .subscribe((r) => {
                 console.log('r', r);
               })*/
        });
        this.edit = false;
    };
    return StudentDetailComponent;
}());
StudentDetailComponent = __decorate([
    core_1.Component({
        selector: 'app-student-detail',
        templateUrl: './student-detail.component.html',
        styleUrls: ['./student-detail.component.css'],
        changeDetection: core_1.ChangeDetectionStrategy.OnPush
    }),
    __param(0, core_1.Inject(angularfire2_1.FirebaseApp))
], StudentDetailComponent);
exports.StudentDetailComponent = StudentDetailComponent;
