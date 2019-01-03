import { Component, OnInit } from '@angular/core';


import { settingService} from './settingService'
@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css'],
  providers: [settingService]
})
export class SettingComponent implements OnInit {

  constructor(private  _settingService : settingService) { 
   
  }

  ngOnInit() {

  }

  setSchool(){
       if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(position => {
       
        this._settingService.updateLocation(position.coords.latitude,position.coords.longitude)
          .subscribe((res)=>{
              console.log(res);
          })

      });
   }

  }

  saveTime(start,end){
    this._settingService.UpdateTiming(start,end)
    .subscribe((res)=>{
     console.log(res);
    })
  
  }

}
