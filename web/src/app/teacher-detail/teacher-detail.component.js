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
var TeacherDetailComponent = (function () {
    function TeacherDetailComponent(zone, firebaseApp, cd, route, 
        //private zone: NgZone,
        /*private authState: FirebaseAuthState,*/
        af, _http, ele, _firebaseService) {
        var _this = this;
        this.cd = cd;
        this.route = route;
        this.af = af;
        this._http = _http;
        this.ele = ele;
        this._firebaseService = _firebaseService;
        this.badge = 0;
        this.edit = false;
        this._firebase = firebaseApp;
        //this._af = this.af;
        /*messaging.onMessage(function (payload) {
          
          zone.run(() => { // Change the property within the zone, CD will run after
            this.badge = 12;
          });
          console.log("Message received. ", payload);
        });
    */
        this.updateProf().onAuthStateChanged(function (user) {
            if (user) {
                _this.ProfileName = user.displayName;
                _this.photoURL = user.photoURL;
                _this.rankTeacher = user.uid;
                _this.cd.markForCheck();
            }
        });
        //{"uid":"Zc3VDVboTbSkHxRuMhMFi3YIl3c2","displayName":null,"photoURL":null,"email":"student02@student02.com","emailVerified":false,"isAnonymous":false,"providerData":[{"uid":"student02@student02.com","displayName":null,"photoURL":null,"email":"student02@student02.com","providerId":"password"}],
        /*
            route.params.subscribe(params => {
              this.id = params['id'];
        
              af.database.list('subjects')
                .subscribe((res) => {
                  this.subjects = res;
                  
                  res.forEach((response, i) => {
                    console.log(response);
                    const queryObservable = af.database.list('/questions/' + this.id , {
                      query: {
                        orderByChild: 'uid',
                        
                        equalTo: this.id,
                      }
                    }).subscribe((r) => {
                      this.questions = r;
                    })
        
                  })
                })
        
        
            })
            */
    }
    TeacherDetailComponent.prototype.ngOnInit = function () {
    };
    TeacherDetailComponent.prototype.abc = function (rankdetail) {
        this.qns = rankdetail;
    };
    TeacherDetailComponent.prototype.logout = function () {
        this._firebaseService.Logout();
    };
    TeacherDetailComponent.prototype.updateProf = function () {
        return this._firebase.auth();
    };
    TeacherDetailComponent.prototype.doEdit = function () {
        this.edit = true;
    };
    TeacherDetailComponent.prototype.update = function (name, image) {
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
            /* cuser.update({ uid: user.uid, photoURL: downloadURL }).subscribe((r) => {
               console.log('abc', r);
             })*/
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
                // .update({ uid: user.uid, photoURL: downloadURL })
            }, function (error) {
                // An error happened.
            });
        });
        this.edit = false;
    };
    return TeacherDetailComponent;
}());
TeacherDetailComponent = __decorate([
    core_1.Component({
        selector: 'app-teacher-detail',
        templateUrl: './teacher-detail.component.html',
        styleUrls: ['./teacher-detail.component.css'],
        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
    }),
    __param(1, core_1.Inject(angularfire2_1.FirebaseApp))
], TeacherDetailComponent);
exports.TeacherDetailComponent = TeacherDetailComponent;
