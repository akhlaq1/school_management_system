

import mongoose = require('mongoose');
import q = require('q');

let Schema = mongoose.Schema;

var classSchema = new mongoose.Schema({
    cid  : Schema.Types.ObjectId, 
    name : String ,
    date: { type: Date, default: Date.now },
    schoolId : String
})

let classModel = mongoose.model('class',classSchema);


  export let  saveClass = function(object){
  let deffered = q.defer();   
   let saveClassModel = new classModel(object);
    saveClassModel.save((err,success)=>{
        if(!err){
            deffered.resolve({status : 1 , data : success});
        }
        else{
            deffered.reject({status : 0 , data : err})
        }
       
    })
     return deffered.promise ;
}

  export let findClass = function(object){
        let deffered = q.defer();   
        classModel.find(object,(err,success)=>{
            if(!err){
                 deffered.resolve({status : 1 , data : success});
            }
             else{
            deffered.reject({status : 0 , data : err})
        }
        
        }) ;
        return deffered.promise ;
 }