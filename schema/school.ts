import mongoose = require('mongoose');
import q = require('q');

let Schema = mongoose.Schema;


var schoolSchema = new mongoose.Schema({
            departmentId : Schema.Types.ObjectId , 
            name:String,
            date: { type: Date, default: Date.now }
           
})


let schoolModel = mongoose.model('department', schoolSchema);

export let  saveSchool = function(object){
  let deffered = q.defer();   
   let saveSchoolModel = new schoolModel(object);
    saveSchoolModel.save((err,success)=>{
        if(!err){
            deffered.resolve({status : 1 , data : success});
        }
        else{
            deffered.reject({status : 0 , data : err})
        }
        return deffered.promise ;
    })
}

 let findDepartment = function(object){
        let deffered = q.defer();   
     schoolModel.find(object,(err,success)=>{
            if(!err){
                 deffered.resolve({status : 1 , data : success});
            }
             else{
            deffered.reject({status : 0 , data : err})
        }
        return deffered.promise ;
        }) ;
 }