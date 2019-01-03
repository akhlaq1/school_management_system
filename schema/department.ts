import mongoose = require('mongoose');
import q = require('q');

let Schema = mongoose.Schema;


var departmentSchema = new mongoose.Schema({
            departmentId : Schema.Types.ObjectId , 
            name:String,
            date: { type: Date, default: Date.now }
           
})


let departmentModel = mongoose.model('department', departmentSchema);

export let  saveDepartment = function(object){
  let deffered = q.defer();   
   let saveDepartmentModel = new departmentModel(object);
    saveDepartmentModel.save((err,success)=>{
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
     departmentModel.find(object,(err,success)=>{
            if(!err){
                 deffered.resolve({status : 1 , data : success});
            }
             else{
            deffered.reject({status : 0 , data : err})
        }
        return deffered.promise ;
        }) ;
 }