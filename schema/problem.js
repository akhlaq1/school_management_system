"use strict";
var mongoose = require("mongoose");
var q = require("q");
var Schema = mongoose.Schema;
var problemSchema = new mongoose.Schema({
    pid: Schema.Types.ObjectId,
    description: String,
    status: String,
    //voteId :  {type : Schema.Types.ObjectId ,ref : 'vote' } ,
    studentId: { type: Schema.Types.ObjectId, ref: 'student' },
    studentsVote: { type: Schema.Types.ObjectId, ref: 'student' },
    studentVisited: [{ type: Schema.Types.ObjectId, ref: 'student' }],
    subjectId: { type: Schema.Types.ObjectId, ref: 'subject' },
    date: { type: Date, "default": Date.now }
});
var problemModel = mongoose.model('problem', problemSchema);
exports.saveProblem = function (object) {
    var deffered = q.defer();
    var saveProblemModel = new problemModel(object);
    saveProblemModel.save(function (err, success) {
        if (!err) {
            deffered.resolve({ status: 1, data: success });
        }
        else {
            deffered.reject({ status: 0, data: err });
        }
    });
    return deffered.promise;
};
exports.findProblem = function (object) {
    var deffered = q.defer();
    problemModel.find(object, function (err, success) {
        if (!err) {
            deffered.resolve({ status: 1, data: success });
        }
        else {
            deffered.reject({ status: 0, data: err });
        }
    });
    return deffered.promise;
};
exports.findAllStudentProblem = function (object) {
    var deffered = q.defer();
    problemModel
        .find(object)
        .populate('studentId')
        .populate('studentsVote')
        .populate('subjectId')
        .populate('studentVisited')
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
//vote
exports.updateStudentProblem = function (match, object) {
    var deffered = q.defer();
    problemModel
        .findByIdAndUpdate(match, { $set: { "studentId": object } }, { upsert: true, "new": true }, function (err, success) {
        if (!err) {
            deffered.resolve({ status: 1, data: success });
        }
        else {
            deffered.reject({ status: 0, data: err });
        }
    });
    return deffered.promise;
};
exports.updateStudentProblemVotes = function (match, object) {
    var deffered = q.defer();
    problemModel
        .findByIdAndUpdate(match, { $set: { "studentsVote": object } }, { upsert: true, "new": true }, function (err, success) {
        if (!err) {
            deffered.resolve({ status: 1, data: success });
        }
        else {
            deffered.reject({ status: 0, data: err });
        }
    });
    return deffered.promise;
};
exports.updateStudentProblemVisited = function (match, object) {
    var deffered = q.defer();
    problemModel
        .findByIdAndUpdate(match, { $push: { "studentVisited": object } }, { upsert: true, "new": true }, function (err, success) {
        if (!err) {
            deffered.resolve({ status: 1, data: success });
        }
        else {
            deffered.reject({ status: 0, data: err });
        }
    });
    return deffered.promise;
};
//visite 
