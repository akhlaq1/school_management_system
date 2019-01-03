"use strict";
var mongoose = require("mongoose");
var q = require("q");
var Schema = mongoose.Schema;
var studentSessionSchema = new mongoose.Schema({
    sesId: Schema.Types.ObjectId,
    studentid: { type: Schema.Types.ObjectId, ref: 'subject' },
    subjectId: { type: Schema.Types.ObjectId, ref: 'subject' },
    problemId: [{ type: Schema.Types.ObjectId, ref: 'problem' }],
    date: { type: Date, default: Date.now }
});
var studentSessionModel = mongoose.model("studentsession", studentSessionSchema);
exports.saveStudentSession = function (object) {
    var deffered = q.defer();
    var saveStudentSessionModel = new studentSessionModel(object);
    saveStudentSessionModel.save(function (err, success) {
        if (!err) {
            deffered.resolve({ status: 1, data: success });
        }
        else {
            deffered.reject({ status: 0, data: err });
        }
        return deffered.promise;
    });
};
var findStudentSession = function (object) {
    var deffered = q.defer();
    studentSessionModel.find(object, function (err, success) {
        if (!err) {
            deffered.resolve({ status: 1, data: success });
        }
        else {
            deffered.reject({ status: 0, data: err });
        }
        return deffered.promise;
    });
};
