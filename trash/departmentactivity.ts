import mongoose = require('mongoose');
import q = require('q');

let Schema = mongoose.Schema;


var departmentActivitySchema = new mongoose.Schema({
            departmentAcitivityId : Schema.Types.ObjectId,
            //teacherId : Schema : 
})


let departmentActivityModel = mongoose.model('departmentactivity', departmentActivitySchema);

export let  saveDepartment = function(object){
  let deffered = q.defer();   
   let saveDepartmentActivityModel = new departmentActivityModel(object);
    saveDepartmentActivityModel.save((err,success)=>{
        if(!err){
            deffered.resolve({status : 1 , data : success});
        }
        else{
            deffered.reject({status : 0 , data : err})
        }
        return deffered.promise ;
    })
}

 let findDepartment  = function(object){
        let deffered = q.defer();   
      departmentActivityModel.find(object,(err,success)=>{
            if(!err){
                 deffered.resolve({status : 1 , data : success});
            }
             else{
            deffered.reject({status : 0 , data : err})
        }
        return deffered.promise ;
        }) ;
 }