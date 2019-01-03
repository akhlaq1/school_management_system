

import mongoose = require('mongoose');
import q = require('q');

let Schema = mongoose.Schema;


var emailSchema = new mongoose.Schema({
        emailId : {type : Schema.Types.ObjectId} ,
        description : String,
        date: { type: Date, default: Date.now }  ,
              
})


let emailModel = mongoose.model('email', emailSchema);

export let  saveEmail = function(object){
  let deffered = q.defer();   
   let saveEmailModel = new emailModel(object);
    saveEmailModel.save((err,success)=>{
        if(!err){
            deffered.resolve({status : 1 , data : success});
        }
        else{
            deffered.reject({status : 0 , data : err})
        }
        
    })
    return deffered.promise ;
}

 export let findEmail = function(object){
        let deffered = q.defer();   
        emailModel.find(object,(err,success)=>{
            if(!err){
                 deffered.resolve({status : 1 , data : success});
            }
             else{
            deffered.reject({status : 0 , data : err})
        }
        
        }) ;
        return deffered.promise ;
 }

