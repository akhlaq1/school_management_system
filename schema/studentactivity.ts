

import mongoose = require('mongoose');
import q = require('q');

let Schema = mongoose.Schema;

var studentActivitySchema  = new  mongoose.Schema({
    stdActivityId : {type :  Schema.Types.ObjectId },
    enrollementId : {type :  Schema.Types.ObjectId , ref : 'enrollement' },
    studentId : {type :  Schema.Types.ObjectId , ref : 'student' },
    sectionId : {type :  Schema.Types.ObjectId , ref : 'studentsession' },
    studentIntractId : {type :  Schema.Types.ObjectId , ref : 'studentintract' },
    date: { type: Date, default: Date.now }
})

let studentActivityModel = mongoose.model("studentactivity", studentActivitySchema);


export let  saveStudentActivity = function(object){
  let deffered = q.defer();   
   let saveStudentActivityModel = new studentActivityModel(object);
   saveStudentActivityModel.save((err,success)=>{
        if(!err){
            deffered.resolve({status : 1 , data : success});
        }
        else{
            deffered.reject({status : 0 , data : err})
        }
        
    })
    return deffered.promise ;
}

 export let findStudentActivity = function(object){
        let deffered = q.defer();   
       studentActivityModel.find(object,(err,success)=>{
            if(!err){
                 deffered.resolve({status : 1 , data : success});
            }
             else{
            deffered.reject({status : 0 , data : err})
        }
        
        }) ;
        return deffered.promise ;
 }

