"use strict";
var mongoose = require("mongoose");
var q = require("q");
var Schema = mongoose.Schema;
var teacherSchema = new mongoose.Schema({
    tId: Schema.Types.ObjectId,
    name: String,
    address: String,
    qualification: String,
    rank: String,
    emailId: String,
    phoneNo: String,
    status: String,
    teacherInteractiveId: [{ type: Schema.Types.ObjectId, ref: 'teacherInteractive' }],
    date: { type: Date, "default": Date.now },
    uid: String
});
var teacherModel = mongoose.model("teacher", teacherSchema);
exports.saveTeacher = function (object) {
    var deffered = q.defer();
    var saveTeacherModel = new teacherModel(object);
    saveTeacherModel.save(function (err, success) {
        if (!err) {
            deffered.resolve({ status: 1, data: success });
        }
        else {
            deffered.reject({ status: 0, data: err });
        }
    });
    return deffered.promise;
};
exports.findTeacher = function (object) {
    var deffered = q.defer();
    teacherModel
        .find(object, function (err, success) {
        if (!err) {
            deffered.resolve({ status: 1, data: success });
        }
        else {
            deffered.reject({ status: 0, data: err });
        }
    });
    return deffered.promise;
};
exports.findTeacherEmail = function (object) {
    var deffered = q.defer();
    teacherModel
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
exports.updateTeacher = function (object) {
    var deffered = q.defer();
    var query = { _id: object.tId };
    teacherModel.update(query, {
        $set: {
            name: object.name,
            address: object.address,
            qualification: object.qualification,
            emailId: object.emailId,
            phoneNo: object.phoneNo
        }
    }, function (err, success) {
        if (!err) {
            deffered.resolve({ status: 1, data: success });
        }
        else {
            deffered.reject({ status: 0, data: err });
        }
    });
    return deffered.promise;
};
