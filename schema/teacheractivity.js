"use strict";
var mongoose = require("mongoose");
var q = require("q");
var Schema = mongoose.Schema;
var teacherActivitySchema = new mongoose.Schema({
    teacherId: { type: Schema.Types.ObjectId },
    enrollementId: [{ type: Schema.Types.ObjectId, ref: 'enrollement' }],
    date: { type: Date, default: Date.now }
});
var teacherActivityModel = mongoose.model("teacheractivity", teacherActivitySchema);
exports.saveStudentActivity = function (object) {
    var deffered = q.defer();
    var saveTeacherActivityModel = new teacherActivityModel(object);
    saveTeacherActivityModel.save(function (err, success) {
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
    teacherActivityModel.find(object, function (err, success) {
        if (!err) {
            deffered.resolve({ status: 1, data: success });
        }
        else {
            deffered.reject({ status: 0, data: err });
        }
        return deffered.promise;
    });
};
