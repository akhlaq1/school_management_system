import mongoose = require('mongoose');
import q = require('q');

let Schema = mongoose.Schema;



var notificationSchema = new mongoose.Schema({
    studentId : [{type:Schema.Types.ObjectId,ref:'student'}],
    notId : Schema.Types.ObjectId,
    status : String ,
    problemId : {type:Schema.Types.ObjectId,ref:'problem'},
    teacherId : [{type:Schema.Types.ObjectId,ref:'teacher'}],
    eventId :   {type:Schema.Types.ObjectId,ref:'event'},
    suid:{type:Schema.Types.ObjectId},
    tuid:{type:Schema.Types.ObjectId},
    content:{type:Schema.Types.ObjectId},
    from:{type:Schema.Types.ObjectId},
    subjct:{type:Schema.Types.ObjectId},

    date: { type: Date, default: Date.now }
   
})


let noticationModel = mongoose.model("notification", notificationSchema);

export let  saveNotification = function(object){
  let deffered = q.defer();   
   let saveNoticationModel = new noticationModel(object);
   saveNoticationModel.save((err,success)=>{
        if(!err){
            deffered.resolve({status : 1 , data : success});
        }
        else{
            deffered.reject({status : 0 , data : err})
        }
        return deffered.promise ;
    })
}

 export let findNotification = function(object){
        let deffered = q.defer();   
      noticationModel.find(object,(err,success)=>{
            if(!err){
                 deffered.resolve({status : 1 , data : success});
            }
             else{
            deffered.reject({status : 0 , data : err})
        }
        return deffered.promise ;
        }) ;
 }

