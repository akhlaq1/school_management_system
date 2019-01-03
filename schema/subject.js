"use strict";
var mongoose = require("mongoose");
var q = require("q");
var Schema = mongoose.Schema;
var subjectSchema = new mongoose.Schema({
    sid: Schema.Types.ObjectId,
    name: String,
    teacherid: { type: Schema.Types.ObjectId, ref: 'teacher' },
    date: { type: Date, "default": Date.now },
    uid: String
});
var subjectModel = mongoose.model('subject', subjectSchema);
exports.saveSubject = function (object) {
    var deffered = q.defer();
    var saveSubjectModel = new subjectModel(object);
    saveSubjectModel.save(function (err, success) {
        if (!err) {
            deffered.resolve({ status: 1, data: success });
        }
        else {
            deffered.reject({ status: 0, data: err });
        }
    });
    return deffered.promise;
};
exports.findAllSubjectAssign = function (object) {
    var deffered = q.defer();
    subjectModel
        .find({})
        .populate('teacherid')
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
exports.assignSubject = function (match, object) {
    var deffered = q.defer();
    subjectModel
        .findByIdAndUpdate({ _id: match }, { $set: { "teacherid": object } }, { upsert: true, "new": true }, function (err, success) {
        if (!err) {
            deffered.resolve({ status: 1, data: success });
        }
        else {
            deffered.reject({ status: 0, data: err });
        }
    });
    return deffered.promise;
};
exports.updateSubject = function (match, object) {
    var deffered = q.defer();
    subjectModel
        .findByIdAndUpdate({ _id: match }, { $set: { "teacherid": object.teacherid, "name": object.name } }, { upsert: true, "new": true }, function (err, success) {
        if (!err) {
            deffered.resolve({ status: 1, data: success });
        }
        else {
            deffered.reject({ status: 0, data: err });
        }
    });
    return deffered.promise;
};
exports.updateCSubject = function (match, object) {
    console.log(object);
    var deffered = q.defer();
    subjectModel
        .findByIdAndUpdate({ _id: match }, { $set: { "teacherid": object.teacherid } }, { upsert: true, "new": true }, function (err, success) {
        if (!err) {
            deffered.resolve({ status: 1, data: success });
        }
        else {
            deffered.reject({ status: 0, data: err });
        }
    });
    return deffered.promise;
};
exports.findSubject = function (object) {
    var deffered = q.defer();
    subjectModel
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
