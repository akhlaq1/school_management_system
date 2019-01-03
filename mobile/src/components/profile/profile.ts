import { Component } from '@angular/core';

/**
 * Generated class for the Profile component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'profile',
  templateUrl: 'profile.html'
})
export class Profile {

  profileInfo;
  constructor() {
    this.getAllInfo();
  }
  getAllInfo() {
    let obj = JSON.parse(localStorage.getItem('currentuser'));
    this.profileInfo = obj.data;
    console.log(this.profileInfo);

  }

}
