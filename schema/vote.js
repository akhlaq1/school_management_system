"use strict";
var mongoose = require("mongoose");
var q = require("q");
var Schema = mongoose.Schema;
var voteSchema = new mongoose.Schema({
    vId: Schema.Types.ObjectId,
    vote: String,
    teacherId: { type: Schema.Types.ObjectId, ref: 'teacher' },
    problemId: { type: Schema.Types.ObjectId, ref: 'problem' },
    studentId: [{ type: Schema.Types.ObjectId, ref: 'student' }],
    date: { type: Date, "default": Date.now }
});
var voteModel = mongoose.model("vote", voteSchema);
exports.saveVote = function (object) {
    var deffered = q.defer();
    var saveVoteModel = new voteModel(object);
    saveVoteModel.save(function (err, success) {
        if (!err) {
            deffered.resolve({ status: 1, data: success });
        }
        else {
            deffered.reject({ status: 0, data: err });
        }
    });
    return deffered.promise;
};
exports.findVote = function (object) {
    var deffered = q.defer();
    voteModel.find(object, function (err, success) {
        if (!err) {
            deffered.resolve({ status: 1, data: success });
        }
        else {
            deffered.reject({ status: 0, data: err });
        }
    });
    return deffered.promise;
};
