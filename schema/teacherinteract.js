"use strict";
var mongoose = require("mongoose");
var q = require("q");
var Schema = mongoose.Schema;
var teacherInteractSchema = new mongoose.Schema({
    teacherInteractId: { type: Schema.Types.ObjectId },
    teacherId: { type: Schema.Types.ObjectId },
    date: { type: Date, default: Date.now }
});
var teacherInteractModel = mongoose.model("teacherinteract", teacherInteractSchema);
exports.saveStudentActivity = function (object) {
    var deffered = q.defer();
    var saveTeacherInteractModel = new teacherInteractModel(object);
    saveTeacherInteractModel.save(function (err, success) {
        if (!err) {
            deffered.resolve({ status: 1, data: success });
        }
        else {
            deffered.reject({ status: 0, data: err });
        }
        return deffered.promise;
    });
};
var findTeacherActivity = function (object) {
    var deffered = q.defer();
    teacherInteractModel.find(object, function (err, success) {
        if (!err) {
            deffered.resolve({ status: 1, data: success });
        }
        else {
            deffered.reject({ status: 0, data: err });
        }
        return deffered.promise;
    });
};
