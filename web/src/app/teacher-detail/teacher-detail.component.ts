import { Component, OnInit, Inject, ChangeDetectionStrategy, ChangeDetectorRef, EventEmitter, ElementRef, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable, FirebaseApp, FirebaseAuthState } from 'angularfire2';
import { Http } from '@angular/http';
import { firebaseService } from './../app.firebaseService'
import * as firebase from 'firebase';

@Component({
  selector: 'app-teacher-detail',
  templateUrl: './teacher-detail.component.html',
  styleUrls: ['./teacher-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class TeacherDetailComponent implements OnInit {

  messages
  badge = 0;
  qns;
  id: string;
  questions;
  subjects;
  ProfileName;
  _firebase;
  myImage;
  photoURL;
  authState: FirebaseAuthState;
  edit = false;
  //_af;
  rankTeacher;
  ngOnInit() {

  }
  constructor(
    zone: NgZone,
    @Inject(FirebaseApp) firebaseApp: any,
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute,
    //private zone: NgZone,
    /*private authState: FirebaseAuthState,*/
    private af: AngularFire,
    private _http: Http,
    private ele: ElementRef,
    private _firebaseService: firebaseService
  ) {


    this._firebase = firebaseApp;
    //this._af = this.af;


    /*messaging.onMessage(function (payload) {
      
      zone.run(() => { // Change the property within the zone, CD will run after
        this.badge = 12;
      });
      console.log("Message received. ", payload);
    });
*/
    this.updateProf().onAuthStateChanged((user) => {
      if (user) {
        this.ProfileName = user.displayName;
        this.photoURL = user.photoURL;
        this.rankTeacher = user.uid;
        this.cd.markForCheck();
      }
    })






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

  abc(rankdetail) {
    this.qns = rankdetail
  }

  logout() {
    this._firebaseService.Logout();
  }

  updateProf() {

    return this._firebase.auth();

  }

  doEdit() {
    this.edit = true;
  }

  update(name: string, image: HTMLInputElement) {


    let user = this._firebase.auth().currentUser;
    let updateUser = this.af.database.list('/users')

    let cuser = this.af.database.list('/users', {
      query: {
        orderByChild: 'uid',
        equalTo: user.uid,
      }
    })



    const storageRef = this._firebase.storage().ref().child('images');

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

      cuser.subscribe((res) => {
        //this.af.database.list('/users/' + res[0]['$key'])
        if (res[0]) {
          updateUser.update(res[0]['$key'],
            { uid: user.uid, photoURL: downloadURL });

        }

      })


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


  }

}
