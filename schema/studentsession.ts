import mongoose = require('mongoose');
import q = require('q');

let Schema = mongoose.Schema;


var studentSessionSchema = new mongoose.Schema({
    sesId : Schema.Types.ObjectId,
    studentid : {type :  Schema.Types.ObjectId , ref : 'subject' },
    subjectId : { type : Schema.Types.ObjectId , ref : 'subject' },
    problemId : [{type:Schema.Types.ObjectId,ref:'problem'}],
    date: { type: Date, default: Date.now }
})

let studentSessionModel = mongoose.model("studentsession", studentSessionSchema);

export let  saveStudentSession = function(object){
  let deffered = q.defer();   
   let saveStudentSessionModel = new studentSessionModel(object);
   saveStudentSessionModel.save((err,success)=>{
        if(!err){
            deffered.resolve({status : 1 , data : success});
        }
        else{
            deffered.reject({status : 0 , data : err})
        }
        return deffered.promise ;
    })
}

 let findStudentSession = function(object){
        let deffered = q.defer();   
       studentSessionModel.find(object,(err,success)=>{
            if(!err){
                 deffered.resolve({status : 1 , data : success});
            }
             else{
            deffered.reject({status : 0 , data : err})
        }
        return deffered.promise ;
        }) ;
 }

