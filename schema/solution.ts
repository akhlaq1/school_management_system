

import mongoose = require('mongoose');
import q = require('q');

let Schema = mongoose.Schema;

var solutionSchema = new mongoose.Schema({

    solId : Schema.Types.ObjectId,
    solution : String,
    teacherId : [{type:Schema.Types.ObjectId,ref:'teacher'}],
    problemId : [{type:Schema.Types.ObjectId,ref:'problem'}],
    voteId : {type:Schema.Types.ObjectId},
    date: { type: Date, default: Date.now }


}) 

let solutionModel = mongoose.model("solution", solutionSchema);

  export let  saveSolution = function(object){
  let deffered = q.defer();   
   let saveSolutionModel = new solutionModel(object);
   saveSolutionModel.save((err,success)=>{
        if(!err){
            deffered.resolve({status : 1 , data : success});
        }
        else{
            deffered.reject({status : 0 , data : err})
        }        
    })
    return deffered.promise ;
}

 export let findSolution = function(object){
        let deffered = q.defer();   
        solutionModel.find(object,(err,success)=>{
            if(!err){
                 deffered.resolve({status : 1 , data : success});
            }
             else{
            deffered.reject({status : 0 , data : err})
        }
        
        }) ;
        return deffered.promise ;
 }

 //find All teacher problem

 