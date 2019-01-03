import mongoose = require('mongoose');
import q = require('q');

let Schema = mongoose.Schema;

var driverSchema = new mongoose.Schema({
        driverId  :  Schema.Types.ObjectId ,
        driverName:String ,        
        AreaId : { type : Schema.Types.ObjectId , ref : 'area'},        
        date: { type: Date, default: Date.now },
        schoolLocationX:String,
        schoolLocationY:String,
        startTime : String ,
        endTime:String,
        uid : String,        
        phone : String
})


let driverModel = mongoose.model('driver', driverSchema);

export let  saveDriver = function(object){
  let deffered = q.defer();   
   let saveDriverModel = new driverModel(object);
    saveDriverModel.save((err,success)=>{
        if(!err){
            deffered.resolve({status : 1 , data : success});
        }
        else{
            deffered.reject({status : 0 , data : err})
        }        
    })
    return deffered.promise ;
}
export let findDriver = function(object){
      let deffered = q.defer();   
      driverModel.find(object,(err,success)=>{
            if(!err){
                 deffered.resolve({status : 1 , data : success});
            }
             else{
            deffered.reject({status : 0 , data : err})
        }        
    }) ;
    return deffered.promise ;
 }