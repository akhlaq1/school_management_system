import { Component, OnInit } from '@angular/core';
import { areaService } from './areaService'
import { vanService } from './../van/vanService'
import { MdSnackBar } from '@angular/material';
@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css'],
  providers: [areaService, vanService],

})
export class AreaComponent implements OnInit {


  private mapBound: {
    northeast: 0,
    southwest: 0
  };
  private name: string;
  constructor(private snackBar: MdSnackBar, private _vanService: vanService, private _areaService: areaService) { }

  ngOnInit() {
    this._areaService.getAllAreas().subscribe((data) => {
      console.log(data);
    })

  }

  getAreaDetail(message) {
    this.name = message.results[0].formatted_address;
    this.mapBound = message.results[0].geometry.bounds
  }

  saveArea() {



    this._areaService.saveArea(this.name, this.mapBound).subscribe((data) => {
      console.log(data)
      this.snackBar.open(this.name, 'Area Save', {
        duration: 2000
      })
    })
  }




}
