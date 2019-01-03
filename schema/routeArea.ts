import mongoose = require('mongoose');
import q = require('q');

let Schema = mongoose.Schema;

var busStop = new mongoose.Schema({
        routeId : {type : Schema.Types.ObjectId} ,        
        date: { type: Date} ,
        location : {type : String} ,
        stopover:  {type:Boolean , default : true}       
})


let busStopModel = mongoose.model('busStop', busStop);

export let  saveBusStop = function(object){
  let deffered = q.defer();   
   let saveBusModel = new busStopModel(object);
    saveBusModel.save((err,success)=>{
        if(!err){
            deffered.resolve({status : 1 , data : success});
        }
        else{
            deffered.reject({status : 0 , data : err})
        }        
    })
    return deffered.promise ;
}

 export let findBusStop = function(object){
        let deffered = q.defer();   
        busStopModel.find({},(err,success)=>{
          if(!err){              
                 deffered.resolve({status : 1 , data : success});
            }
             else{
            deffered.reject({status : 0 , data : err})
          }        
        });
        return deffered.promise ;
 }