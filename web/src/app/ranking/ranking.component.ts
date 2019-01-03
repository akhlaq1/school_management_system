import { Component, OnInit, Input, OnChanges,SimpleChange } from '@angular/core';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit, OnChanges {


  @Input() rankTeacher: any;
  public value: any = 0;
  constructor() { }

  ngOnInit() {
    console.log(this.rankTeacher)


  }
  ngOnChanges() {

    console.log(this.rankTeacher)
   
   
    if (this.rankTeacher) {

      if(this.rankTeacher.answers == 0  || this.rankTeacher.questions == 0){
        this.value =  0.5  
      }
      else{
        this.value =   ( this.rankTeacher.answers /  this.rankTeacher.questions)*100  
      }

      

      console.log(this.value)
    }

  }

}
