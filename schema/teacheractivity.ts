import mongoose = require('mongoose');
import q = require('q');

let Schema = mongoose.Schema;

var teacherActivitySchema  = new  mongoose.Schema({
    teacherId:{type :  Schema.Types.ObjectId },
    enrollementId:[{type:Schema.Types.ObjectId,ref:'enrollement'}],
    date: { type: Date, default: Date.now }
    
})

let teacherActivityModel = mongoose.model("teacheractivity", teacherActivitySchema);
export let  saveStudentActivity = function(object){
  let deffered = q.defer();   
   let saveTeacherActivityModel = new teacherActivityModel(object);
  saveTeacherActivityModel.save((err,success)=>{
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
      teacherActivityModel.find(object,(err,success)=>{
            if(!err){
                 deffered.resolve({status : 1 , data : success});
            }
             else{
            deffered.reject({status : 0 , data : err})
        }
        return deffered.promise ;
        }) ;
 }

