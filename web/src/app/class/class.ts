

import {classService} from './classService' ; 


export class Class {

   
   name : string;
   teacher : string;
   student : string;
   
   constructor(private _classService : classService){
      
   }

   AssginTeacher():void{
   // this._classService.AssignTeacher();
   }
   AssignStudent():void{

   }
}