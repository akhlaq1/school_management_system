import mongoose = require('mongoose');
import q = require('q');

let Schema = mongoose.Schema;

var calendar = new mongoose.Schema({
        calenderId : {type : Schema.Types.ObjectId} ,
        description : String,
        status : { type : String ,Default:1} ,
        date: { type: Date} ,
        title : {type : String}        
})


let calendarModel = mongoose.model('calendar', calendar);

export let  saveCalendar = function(object){
  let deffered = q.defer();   
   let saveCalendarModel = new calendarModel(object);
    saveCalendarModel.save((err,success)=>{
        if(!err){
            deffered.resolve({status : 1 , data : success});
        }
        else{
            deffered.reject({status : 0 , data : err})
        }        
    })
    return deffered.promise ;
}

 export let findCalendar = function(object){
        let deffered = q.defer();   
        calendarModel.findOne({'date':object},(err,success)=>{
          if(!err){              
                 deffered.resolve({status : 1 , data : success});
            }
             else{
            deffered.reject({status : 0 , data : err})
          }        
        });
        return deffered.promise ;
 }