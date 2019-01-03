

import mongoose = require('mongoose');
import q = require('q');

let Schema = mongoose.Schema;

var voteSchema = new mongoose.Schema({
    vId : Schema.Types.ObjectId,
    vote: String,
    teacherId : { type : Schema.Types.ObjectId, ref : 'teacher' },
    problemId : {type : Schema.Types.ObjectId , ref : 'problem'},
    studentId : [{type:Schema.Types.ObjectId, ref:'student'}],
    date: { type: Date, default: Date.now }

})

  let voteModel = mongoose.model("vote", voteSchema);

  export let  saveVote = function(object){
  let deffered = q.defer();   
   let saveVoteModel = new voteModel(object);
    saveVoteModel.save((err,success)=>{
        if(!err){
            deffered.resolve({status : 1 , data : success});
        }
        else{
            deffered.reject({status : 0 , data : err})
        }
        
    })
    return deffered.promise ;
}

  export let findVote = function(object){
        let deffered = q.defer();   
        voteModel.find(object,(err,success)=>{
            if(!err){
                 deffered.resolve({status : 1 , data : success});
            }
             else{
            deffered.reject({status : 0 , data : err})
        }
        
        }) ;
        return deffered.promise ;
 }