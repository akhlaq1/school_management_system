import { Component } from '@angular/core';

/**
 * Generated class for the VanProfile component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'van-profile',
  templateUrl: 'van-profile.html'
})
export class VanProfile {

  vanInfo;

  constructor() {
    this.getAllVanInfo();
  }
  getAllVanInfo(){
     let vanInfo = JSON.parse( localStorage.getItem('vanInfo') );
     console.log(vanInfo)
     this.vanInfo = vanInfo;
  }

}
