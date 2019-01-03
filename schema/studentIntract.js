"use strict";
var mongoose = require("mongoose");
var q = require("q");
var Schema = mongoose.Schema;
var studentIntractSchema = new mongoose.Schema({
    studentIntractId: Schema.Types.ObjectId,
    studentId: { type: Schema.Types.ObjectId, ref: 'student' },
    date: { type: Date, default: Date.now }
});
var studentIntractModel = mongoose.model("studentintract", studentIntractSchema);
exports.saveStudentIntract = function (object) {
    var deffered = q.defer();
    var saveStudentIntractModel = new studentIntractModel(object);
    saveStudentIntractModel.save(function (err, success) {
        if (!err) {
            deffered.resolve({ status: 1, data: success });
        }
        else {
            deffered.reject({ status: 0, data: err });
        }
    });
    return deffered.promise;
};
exports.findStudentIntract = function (object) {
    var deffered = q.defer();
    studentIntractModel.find(object, function (err, success) {
        if (!err) {
            deffered.resolve({ status: 1, data: success });
        }
        else {
            deffered.reject({ status: 0, data: err });
        }
    });
    return deffered.promise;
};
