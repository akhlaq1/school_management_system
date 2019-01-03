import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { FirebaseService } from '../../providers/firebase-service'
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Geolocation } from '@ionic-native/geolocation';
import { NavController, Events } from 'ionic-angular';
import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation';


import { Observable, Subject } from 'rxjs'


@Component({
  selector: 'driver',
  templateUrl: 'driver.html',
  providers: [FirebaseService],

})
export class Driver implements OnInit, OnChanges {

  @Input() map: google.maps.Map;
  @Input() isDriver: boolean;
  @Input() isLoaded: boolean;
  @Input() DriverId;
  @Input() startTrip: boolean;



  private iconPos = 'img/N.png';
  private watch: any;
  private tripSub: any;
  private tripSession: any;

  private driverlat;
  private driverlong;


  private pickupMarker: google.maps.Marker;

  constructor(private deviceOrientation: DeviceOrientation, private fb: FirebaseService, public events: Events, private af: FirebaseService, private geolocation: Geolocation, private db: AngularFireDatabase) {
    events.subscribe('user:history', (date, time) => {

      let driverId = localStorage.getItem('driverUid');
      // user and time are the same arguments passed in `events.publish(user, time)`


      this.fb.getTripHistory(driverId, date).subscribe((data) => {
        let object = Object.keys(data);
        object.forEach((i) => {

          this.af.getTripHistroyPosition(i).subscribe((pos) => {

            let a = Object.keys(pos);
            let scope = this;
            //bad fix
            a.forEach((ii, i) => {
             
              (function (index) {
                setTimeout(function () {
                  scope.showDriverMarker(pos[ii]['lat'], pos[ii]['lng'],pos[ii]['pos']);

                 
                }, 1000 * index);
              })(i);
              //            setTimeout(() => { console.log(pos[ii]['lat'], pos[ii]['lng']) }, 5000);



            })

          })
        })
        /*         data.forEach((item)=>{
                  console.log(item['$key'])
                  this.af.getTripHistroyPosition(item['$key'])
                    .subscribe((pos)=>{
                      console.log(pos)
                      this.showDriverMarker(pos['lat'],pos['lng'])
                    })
                 })*/

      })

    });
  }

  ngOnChanges() {

    if (this.startTrip == true) {

      this.af.getDate()
        .subscribe(date => {
          this.tripSub = this.af.getTrip(date.date);
          this.tripSub.subscribe(item => {
            if (item.length > 0) {
              this.watch = this.geolocation.watchPosition()
                
                .subscribe(pos => {
                  this.tripSession =
                     this.af.getTripPosition(
                       item[item.length - 1]['$key'],
                       pos.coords.latitude,
                       pos.coords.longitude, 
                       this.iconPos)
                      
                })
            }
          })
        })

      var options = {
        frequency: 3000
      }; // Update every 3 seconds


      var subscription = this.deviceOrientation.watchHeading(options).subscribe(
        (data: DeviceOrientationCompassHeading) => {
          let a = Math.floor(data.magneticHeading);
          if (350 > a && a < 15) {
            this.iconPos = 'img/N.png'
          }
          else if (40 < a && a < 60) {

            this.iconPos = 'img/NE.png'
          }
          else if (80 < a && a < 100) {
            this.iconPos = 'img/E.png'

          }
          else if (120 < a && a < 150) {
            this.iconPos = 'img/SE.png'

          }
          else if (170 < a && a < 190) {
            this.iconPos = 'img/S.png'

          }
          else if (210 < a && a < 240) {
            this.iconPos = 'img/SW.png'

          }
          else if (260 < a && a < 280) {
            this.iconPos = 'img/W.png'

          }
          else if (300 < a && a < 330) {
            this.iconPos = 'img/NW.png'

          }
        }
      );


    }
    else if (this.DriverId && this.startTrip == false) {
      console.log('cancel')
      if (this.watch && this.tripSession && this.tripSub)
        //  this.tripSession.unsubscribe();
        this.watch.unsubscribe();
      //  subscription.unsubscribe();
      // this.tripSub.unsubscribe();

    }

    if (this.DriverId) {

        
      let driverId = localStorage.getItem('driverUid');

      this.af.getDate().subscribe((item) => {

        console.log('isDriver',driverId);

        this.af.getStartTripDate(driverId, item.date)
          .subscribe((res) => {

            console.log(res)
            if (res.length > 0) {

              localStorage.setItem('currentSession', res[res.length - 1]['$key'])

              this.af.getPosition(res[res.length - 1]['$key'])
                .subscribe((data) => {
                  let loc = data[data.length - 1];

                  console.log(loc)
                  if (loc) {
                    this.showDriverMarker(loc.lat, loc.lng, loc.pos);
                  }
                
                  //this.showDriverMarker(loc.lat, loc.lng);
                })
            }
          })
      })

    }

  }


  isMapLoaded(d) {
    console.log(d)
  }

  ngOnInit() {
    //  this.updatePostion()


  }

  driverId(data) {
    console.log(data);
  }



  updatePostion(key) {

    this.af.getPosition(key)
      .subscribe((res) => {
        let lastRecord = res.length - 1;
        if (res && res.length > 0) {
          this.driverlat = res[lastRecord].lat;
          this.driverlong = res[lastRecord].lng;
          let pos = res[lastRecord].pos;
          this.showDriverMarker(this.driverlat, this.driverlong, pos);
        }
      })
  }

  startDriving() {



  }

  showDriverMarker(a, b, pos) {


    console.log('show driver marker',pos)
  
    let location = new google.maps.LatLng(a, b)

    if (this.pickupMarker) {
      this.pickupMarker.setMap(null)
      this.pickupMarker = new google.maps.Marker({
        map: this.map,
        //animation: google.maps.Animation.DROP,
        position: location,
        icon: pos
      })

    }
    else {
      this.pickupMarker = new google.maps.Marker({
        map: this.map,
        //animation: google.maps.Animation.DROP,
        position: location,
        icon: pos
      })

    }


  }


}
