import { Component } from '@angular/core';
import { FirebaseService } from '../../providers/firebase-service'
/**
 * Generated class for the PickupStudent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'pickup-student',
  templateUrl: 'pickup-student.html'
})
export class PickupStudent {

  students;
  selectedStudents = [];

  constructor(private af: FirebaseService) {

    let obj = JSON.parse(localStorage.getItem('currentVan'));
    if (obj) {
      this.students = obj['data'][0]['groupOfStudents'];
    }

  }

  /*isChecked(item){
    console.log(item)
    return true;
  }*/

  insertUserToArray(studentUid, event) {

    let a = this.selectedStudents.findIndex(function (element) {
      return element.uid == studentUid;
    });


    if (a !== -1) {
      this.selectedStudents[a].pickedUp = event.value;
    }
    else {
      this.selectedStudents.push({ uid: studentUid, pickedUp: event.value });
    }
    //console.log(student,event.value)
  }
  save() {
    let session = localStorage.getItem('currentSession')
    this.af.getDate()
      .subscribe(date => {
        this.af.setPickedUpStudents(date.date, session, this.selectedStudents)
          .subscribe((i) => {
            console.log(i);
          })
      })
  }

}
