import { Component, OnInit, NgZone, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFire, FirebaseListObservable } from 'angularfire2'
import { Observable } from 'rxjs'
import { Http, Response } from '@angular/http';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationComponent implements OnInit {

  messages;
  constructor(private af: AngularFire, private _http: Http, private zone: NgZone, private cd: ChangeDetectorRef) {
    this.af.auth.subscribe((auth) => {
      let uid = auth.auth.uid;

      console.log(uid)


      this._http.get('https://school-web-7d8e8.firebaseio.com/notification/' + uid + '.json?shallow=true')
        .map(response => response.json())
        .subscribe((items) => {

          console.log(items)

          this.messages =   items;
          this.cd.markForCheck();
          this.badge = items ? Object.keys(items).length : 0;
          this.cd.markForCheck();
        })
    })

    const messaging = firebase.messaging();

    messaging.onMessage((payload) => {
      zone.run(() => { // Change the property within the zone, CD will run after
        this.badge++;
        this.cd.markForCheck();
        console.log(payload);
      });
    })
  }



  show = false;
  badge = 0;
  ngOnInit() {
  }
  doShow(): any {

    this.badge = 0;
    this.show = !this.show;
  }



}
