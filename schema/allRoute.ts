import mongoose = require('mongoose');
import q = require('q');

let Schema = mongoose.Schema;

var allRouteSchema = new mongoose.Schema({
        routeId : {type : Schema.Types.ObjectId} ,
        waypoints : {type : Schema.Types.Array },        
        date: { type: Date} ,
        title : {type : String}        
})


let allRouteModel = mongoose.model('allRoute', allRouteSchema);

export let  saveAllRoute = function(object){
  let deffered = q.defer();   
   let saveAllRouteModel = new allRouteModel(object);
    saveAllRouteModel.save((err,success)=>{
        if(!err){
            deffered.resolve({status : 1 , data : success});
        }
        else{
            deffered.reject({status : 0 , data : err})
        }        
    })
    return deffered.promise ;
}

 export let findRoute = function(object){
        let deffered = q.defer();   
        allRouteModel.findOne({'date':object},(err,success)=>{
          if(!err){              
                 deffered.resolve({status : 1 , data : success});
            }
             else{
            deffered.reject({status : 0 , data : err})
          }        
        });
        return deffered.promise ;
 }