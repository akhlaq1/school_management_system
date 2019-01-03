import mongoose = require('mongoose');
import q = require('q');

let Schema = mongoose.Schema;

var routes = new mongoose.Schema({
        routeId : {type : Schema.Types.ObjectId} ,
        waypoints : {type : Schema.Types.Array },        
        date: { type: Date} ,
        title : {type : String} ,
        origin : {type : String},
        destination : {type : String}
})


let routeModel = mongoose.model('route', routes);

export let  saveRoute = function(object){
  let deffered = q.defer();   
   let saveRouteModel = new routeModel(object);
    saveRouteModel.save((err,success)=>{
        if(!err){
            deffered.resolve({status : 1 , data : success});
        }
        else{
            deffered.reject({status : 0 , data : err})
        }        
    })
    return deffered.promise ;
}

 export let findRoutes = function(object){
        let deffered = q.defer();   
        routeModel.find({},(err,success)=>{
          if(!err){              
                 deffered.resolve({status : 1 , data : success});
            }
             else{
            deffered.reject({status : 0 , data : err})
          }        
        });
        return deffered.promise ;
 }