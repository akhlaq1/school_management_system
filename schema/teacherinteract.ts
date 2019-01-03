import mongoose = require('mongoose');
import q = require('q');

let Schema = mongoose.Schema;

var teacherInteractSchema  = new  mongoose.Schema({
    teacherInteractId : {type :  Schema.Types.ObjectId },
    teacherId : {type :  Schema.Types.ObjectId },
    date: { type: Date, default: Date.now }
})

let teacherInteractModel = mongoose.model("teacherinteract", teacherInteractSchema);
export let  saveStudentActivity = function(object){
  let deffered = q.defer();   
   let saveTeacherInteractModel = new teacherInteractModel(object);
  saveTeacherInteractModel.save((err,success)=>{
        if(!err){
            deffered.resolve({status : 1 , data : success});
        }
        else{
            deffered.reject({status : 0 , data : err})
        }
        return deffered.promise ;
    })
}

 let findTeacherActivity = function(object){
        let deffered = q.defer();   
     teacherInteractModel.find(object,(err,success)=>{
            if(!err){
                 deffered.resolve({status : 1 , data : success});
            }
             else{
            deffered.reject({status : 0 , data : err})
        }
        return deffered.promise ;
        }) ;
 }

