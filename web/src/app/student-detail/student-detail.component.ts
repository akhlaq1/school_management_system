import { Component, OnInit, Inject, ChangeDetectionStrategy, NgZone, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable, FirebaseApp, FirebaseAuthState } from 'angularfire2';
import { Http } from '@angular/http';
import { firebaseService } from './../app.firebaseService'


@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentDetailComponent implements OnInit {

  id: string;
  questions;
  subjects;
  ProfileName;
  _firebase;
  myImage;
  photoURL;
  authState: FirebaseAuthState;
  edit = false;
  isNotice=false;

  isReputation = false ;

  ngOnInit() {
    //this.ProfileName = "hasan";
  }
  doNotice() {
    this.isNotice = !this.isNotice;
  }
  constructor(
    @Inject(FirebaseApp) firebaseApp: any,
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute,
    private zone: NgZone,
    /*private authState: FirebaseAuthState,*/
    private af: AngularFire, private _http: Http,
    private _firebaseService: firebaseService
  ) {
    this._firebase = firebaseApp;

    this.updateProf().onAuthStateChanged((user) => {
      if (user) {
        this.ProfileName = user.displayName;
        this.photoURL = user.photoURL;

        this.cd.markForCheck();
      }
    })






    //{"uid":"Zc3VDVboTbSkHxRuMhMFi3YIl3c2","displayName":null,"photoURL":null,"email":"student02@student02.com","emailVerified":false,"isAnonymous":false,"providerData":[{"uid":"student02@student02.com","displayName":null,"photoURL":null,"email":"student02@student02.com","providerId":"password"}],


    route.params.subscribe(params => {
      this.id = params['id'];

      this.af.database.list('subjects')
        .subscribe((res) => {
          this.subjects = res;
          res.forEach((response, i) => {
            const queryObservable = this.af.database.list('/questions/' + this.id, {
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

  doReputation(){

    this.isReputation = !this.isReputation ;

  }

  update(name: string, image: HTMLInputElement) {

    let user = this._firebase.auth().currentUser;

    let updateUser = this.af.database.list('/users')

     console.log(user) 

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

      cuser.subscribe((res) => {

        console.log(res);
        

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


  }

}
