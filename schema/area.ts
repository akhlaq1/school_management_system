import mongoose = require('mongoose');
import q = require('q');

let Schema = mongoose.Schema;


var areaSchema = new mongoose.Schema({
        areaId : Schema.Types.ObjectId , 
        area:String,
        areaBound : {},
        date: { type: Date, default: Date.now }
           
})


let areaModel = mongoose.model('area', areaSchema);

export let  saveArea = function(object){
  let deffered = q.defer();   
   let saveAreaModel = new areaModel(object);
    saveAreaModel.save((err,success)=>{
        if(!err){
            deffered.resolve({status : 1 , data : success});
        }
        else{
            deffered.reject({status : 0 , data : err})
        }        
    })
    return deffered.promise ;
}

 export let findArea = function(object){
        let deffered = q.defer();   
    areaModel.find(object,(err,success)=>{
            if(!err){
                 deffered.resolve({status : 1 , data : success});
            }
             else{
            deffered.reject({status : 0 , data : err})
        }
       
        }) ;
         return deffered.promise ;
 }