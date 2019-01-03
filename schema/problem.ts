

import mongoose = require('mongoose');
import q = require('q');

let Schema = mongoose.Schema;

var problemSchema = new mongoose.Schema({
        pid : Schema.Types.ObjectId,
        description : String,
        status : String,        
        //voteId :  {type : Schema.Types.ObjectId ,ref : 'vote' } ,
        studentId : {type : Schema.Types.ObjectId , ref : 'student' },
        studentsVote : {type : Schema.Types.ObjectId , ref : 'student' },
        studentVisited  :  [{type:Schema.Types.ObjectId,ref:'student'}],
        subjectId : {type :  Schema.Types.ObjectId , ref : 'subject'  },
        date: { type: Date, default: Date.now }
}) 

let problemModel = mongoose.model('problem', problemSchema);

export let  saveProblem = function(object){
  let deffered = q.defer();   
   let saveProblemModel = new problemModel(object);
    saveProblemModel.save((err,success)=>{
        if(!err){
            deffered.resolve({status : 1 , data : success});
        }
        else{
            deffered.reject({status : 0 , data : err})
        }
        
    })
    return deffered.promise ;
}

 export let findProblem = function(object){
        let deffered = q.defer();   
        problemModel.find(object,(err,success)=>{
            if(!err){
                 deffered.resolve({status : 1 , data : success});
            }
             else{
            deffered.reject({status : 0 , data : err})
        }
       
        }) ;
         return deffered.promise ;
 }

 
 export let findAllStudentProblem = function(object){
        let deffered = q.defer();   
        problemModel
               .find(object)
        .populate('studentId')
        .populate('studentsVote')  
         .populate('subjectId')
        .populate('studentVisited')        
        .exec((err, success) => {
            if (!err) {
                deffered.resolve({ status: 1, data: success });
            }
            else {
                deffered.reject({ status: 0, data: err })
            }
        })
          return deffered.promise;

 }


 //vote

export let updateStudentProblem = function (match ,object) {
    let deffered = q.defer();
        problemModel 
        .findByIdAndUpdate(match,
        {$set : { "studentId" :  object }  } ,
        { upsert: true, new : true},
         (err, success) => {
        if (!err) {
            deffered.resolve({ status: 1, data: success });
        }
        else {
            deffered.reject({ status: 0, data: err })
        }

    });
    return deffered.promise;

}



export let updateStudentProblemVotes = function (match ,object) {
    let deffered = q.defer();
        problemModel 
        .findByIdAndUpdate(match,
         {$set : { "studentsVote" :  object }  } ,
        { upsert: true, new : true},
         (err, success) => {
        if (!err) {
            deffered.resolve({ status: 1, data: success });
        }
        else {
            deffered.reject({ status: 0, data: err })
        }

    });
    return deffered.promise;
}

export let  updateStudentProblemVisited = function (match ,object) {
    let deffered = q.defer();
        problemModel 
        .findByIdAndUpdate(match,
         {$push : { "studentVisited" :  object }  } ,
        { upsert: true, new : true},
         (err, success) => {
        if (!err) {
            deffered.resolve({ status: 1, data: success });
        }
        else {
            deffered.reject({ status: 0, data: err })
        }

    });
    return deffered.promise;
}


 //visite