


import mongoose = require('mongoose');
import q = require('q');

let Schema = mongoose.Schema;

var eventSchema =  new mongoose.Schema({
    eveId : String,
    description : String,
    date: { type: Date, default: Date.now }
})



 let eventModel = mongoose.model('event',eventSchema);

  export let  saveEvent = function(object){
  let deffered = q.defer();   
   let saveEventModel = new eventModel(object);
    saveEventModel.save((err,success)=>{
        if(!err){
            deffered.resolve({status : 1 , data : success});
        }
        else{
            deffered.reject({status : 0 , data : err})
        }
        
    })
    return deffered.promise ;
}

 export let findEvent = function(object){
        let deffered = q.defer();   
        eventModel.find(object,(err,success)=>{
            if(!err){
                 deffered.resolve({status : 1 , data : success});
            }
             else{
            deffered.reject({status : 0 , data : err})
        }
      
        }) ;
          return deffered.promise ;
 }