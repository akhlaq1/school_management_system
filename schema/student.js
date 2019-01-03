"use strict";
var mongoose = require("mongoose");
var q = require("q");
var Schema = mongoose.Schema;
var studentSchema = new mongoose.Schema({
    sId: Schema.Types.ObjectId,
    name: String,
    area: String,
    phoneNo: String,
    eid: { type: Schema.Types.ObjectId, ref: 'enrollement' },
    date: { type: Date, "default": Date.now },
    uid: String,
    VanAssign: {
        type: Boolean,
        "default": false
    }
});
var studentModel = mongoose.model('student', studentSchema);
exports.saveStudent = function (object) {
    var deffered = q.defer();
    var saveStudentModel = new studentModel(object);
    saveStudentModel.save(function (err, success) {
        if (!err) {
            deffered.resolve({ status: 1, data: success });
        }
        else {
            deffered.reject({ status: 0, data: err });
        }
    });
    return deffered.promise;
};
exports.findStudent = function (object) {
    var deffered = q.defer();
    studentModel.find(object, function (err, success) {
        if (!err) {
            deffered.resolve({ status: 1, data: success });
        }
        else {
            deffered.reject({ status: 0, data: err });
        }
    });
    return deffered.promise;
};
exports.findStudentEmail = function (object) {
    var deffered = q.defer();
    studentModel
        .findOne(object, function (err, success) {
        if (!err) {
            deffered.resolve({ status: 1, data: success });
        }
        else {
            deffered.reject({ status: 0, data: err });
        }
    });
    return deffered.promise;
};
exports.findAllStudentEnrolled = function (object) {
    var deffered = q.defer();
    studentModel
        .find({})
        .populate('eid')
        .exec(function (err, success) {
        if (!err) {
            deffered.resolve({ status: 1, data: success });
        }
        else {
            deffered.reject({ status: 0, data: err });
        }
    });
    return deffered.promise;
};
exports.saveStudentEnrolled = function (match, object) {
    console.log(match, object);
    /*studentModel
       .findByIdAndUpdate({ _id : '584bd32fca465010c053c2a1' } ,
        {$push : { "enr" :  '584bd324ca465010c053c2a0' }  } ,
       { upsert: true, new : true},
        (err, success) => {
       if (!err) {
           deffered.resolve({ status: 1, data: success });
       }
       else {
           deffered.reject({ status: 0, data: err })
       }
            
    });*/
    var deffered = q.defer();
    studentModel
        .findByIdAndUpdate({ _id: match }, { $set: { "eid": object } }, { upsert: true, "new": true }, function (err, success) {
        if (!err) {
            deffered.resolve({ status: 1, data: success });
        }
        else {
            deffered.reject({ status: 0, data: err });
        }
    });
    return deffered.promise;
};
exports.EditStudent = function (object) {
    var deffered = q.defer();
    studentModel.findOneAndUpdate({ _id: object._id }, object, function (err, success) {
        if (!err) {
            deffered.resolve({ status: 1, data: success });
        }
        else {
            deffered.reject({ status: 0, data: err });
        }
    });
    return deffered.promise;
};
