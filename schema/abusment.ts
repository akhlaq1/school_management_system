import mongoose = require('mongoose');
import q = require('q');

let Schema = mongoose.Schema;

var abuseSchema = new mongoose.Schema({
    name : String

})

  let abuseModel = mongoose.model("abuse", abuseSchema);

  export let  saveabuse = function(object){
  let deffered = q.defer();   
   let saveabuseModel = new abuseModel(object);
    saveabuseModel.save((err,success)=>{
        if(!err){
            deffered.resolve({status : 1 , data : success});
        }
        else{
            deffered.reject({status : 0 , data : err})
        }
        
    })
    return deffered.promise ;
}

  export let findabuse = function(object : any){
        let deffered = q.defer();  

         let a = object.split(" ")

         console.log(object)
            
         /*  let a = object*/

    abuseModel.find({ name: { $in: [ new RegExp('^(.*?(\b'+a+'\b)[^$]*)$', "i") ] } },(err,success)=>{
    //abuseModel.find({ name: { $regex: '.*fuckof' , $options: 'i' } },(err,success)=>{

            console.log(err,success)
            if(!err){
                 deffered.resolve({status : 1 , data : success});
            }
             else{
            deffered.reject({status : 0 , data : err})
        }
        
        }) ;
        return deffered.promise ;
 }