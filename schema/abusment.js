"use strict";
var mongoose = require("mongoose");
var q = require("q");
var Schema = mongoose.Schema;
var abuseSchema = new mongoose.Schema({
    name: String
});
var abuseModel = mongoose.model("abuse", abuseSchema);
exports.saveabuse = function (object) {
    var deffered = q.defer();
    var saveabuseModel = new abuseModel(object);
    saveabuseModel.save(function (err, success) {
        if (!err) {
            deffered.resolve({ status: 1, data: success });
        }
        else {
            deffered.reject({ status: 0, data: err });
        }
    });
    return deffered.promise;
};
exports.findabuse = function (object) {
    var deffered = q.defer();
    var a = object.split(" ");
    console.log(object);
    /*  let a = object*/
    abuseModel.find({ name: { $in: [new RegExp('^(.*?(\b' + a + '\b)[^$]*)$', "i")] } }, function (err, success) {
        //abuseModel.find({ name: { $regex: '.*fuckof' , $options: 'i' } },(err,success)=>{
        console.log(err, success);
        if (!err) {
            deffered.resolve({ status: 1, data: success });
        }
        else {
            deffered.reject({ status: 0, data: err });
        }
    });
    return deffered.promise;
};
