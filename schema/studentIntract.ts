


import mongoose = require('mongoose');
import q = require('q');

let Schema = mongoose.Schema;

var studentIntractSchema = new mongoose.Schema({
    studentIntractId  : Schema.Types.ObjectId,
    studentId : {type:Schema.Types.ObjectId,ref:'student'},
    date: { type: Date, default: Date.now }

})


let studentIntractModel = mongoose.model("studentintract", studentIntractSchema);


export let  saveStudentIntract = function(object){
  let deffered = q.defer();   
   let saveStudentIntractModel = new studentIntractModel(object);
   saveStudentIntractModel.save((err,success)=>{
        if(!err){
            deffered.resolve({status : 1 , data : success});
        }
        else{
            deffered.reject({status : 0 , data : err})
        }
        
    })
    return deffered.promise ;
}

 export let findStudentIntract = function(object){
        let deffered = q.defer();   
       studentIntractModel.find(object,(err,success)=>{
            if(!err){
                 deffered.resolve({status : 1 , data : success});
            }
             else{
            deffered.reject({status : 0 , data : err})
        }
       
        }) ;
         return deffered.promise ;
 }

