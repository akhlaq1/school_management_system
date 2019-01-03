"use strict";
var mongoose = require("mongoose");
var q = require("q");
var Schema = mongoose.Schema;
var studentActivitySchema = new mongoose.Schema({
    stdActivityId: { type: Schema.Types.ObjectId },
    enrollementId: { type: Schema.Types.ObjectId, ref: 'enrollement' },
    studentId: { type: Schema.Types.ObjectId, ref: 'student' },
    sectionId: { type: Schema.Types.ObjectId, ref: 'studentsession' },
    studentIntractId: { type: Schema.Types.ObjectId, ref: 'studentintract' },
    date: { type: Date, default: Date.now }
});
var studentActivityModel = mongoose.model("studentactivity", studentActivitySchema);
exports.saveStudentActivity = function (object) {
    var deffered = q.defer();
    var saveStudentActivityModel = new studentActivityModel(object);
    saveStudentActivityModel.save(function (err, success) {
        if (!err) {
            deffered.resolve({ status: 1, data: success });
        }
        else {
            deffered.reject({ status: 0, data: err });
        }
    });
    return deffered.promise;
};
exports.findStudentActivity = function (object) {
    var deffered = q.defer();
    studentActivityModel.find(object, function (err, success) {
        if (!err) {
            deffered.resolve({ status: 1, data: success });
        }
        else {
            deffered.reject({ status: 0, data: err });
        }
    });
    return deffered.promise;
};
