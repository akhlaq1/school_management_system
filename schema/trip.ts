import mongoose = require('mongoose');
import q = require('q');

let Schema = mongoose.Schema;


var tripSchema = new mongoose.Schema({
            tripId : Schema.Types.ObjectId , 
            startTime :String,
            endTime:String,
            driverId : { type: Schema.Types.ObjectId, ref: 'driver' },
            date: { type: Date, default: Date.now }
           
})


let tripModel = mongoose.model('department', tripSchema);

export let  tripSave = function(object){
  let deffered = q.defer();   
   let trip = new tripModel(object);
    trip.save((err,success)=>{
        if(!err){
            deffered.resolve({status : 1 , data : success});
        }
        else{
            deffered.reject({status : 0 , data : err})
        }
        return deffered.promise ;
    })
}

 let findTrip = function(object){
        let deffered = q.defer();   
     tripModel.find(object,(err,success)=>{
            if(!err){
                 deffered.resolve({status : 1 , data : success});
            }
             else{
            deffered.reject({status : 0 , data : err})
        }
        return deffered.promise ;
        }) ;
 }