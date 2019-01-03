"use strict";
var mongoose = require("mongoose");
var q = require("q");
var Schema = mongoose.Schema;
var notificationSchema = new mongoose.Schema({
    studentId: [{ type: Schema.Types.ObjectId, ref: 'student' }],
    notId: Schema.Types.ObjectId,
    status: String,
    problemId: { type: Schema.Types.ObjectId, ref: 'problem' },
    teacherId: [{ type: Schema.Types.ObjectId, ref: 'teacher' }],
    eventId: { type: Schema.Types.ObjectId, ref: 'event' },
    suid: { type: Schema.Types.ObjectId },
    tuid: { type: Schema.Types.ObjectId },
    content: { type: Schema.Types.ObjectId },
    from: { type: Schema.Types.ObjectId },
    subjct: { type: Schema.Types.ObjectId },
    date: { type: Date, "default": Date.now }
});
var noticationModel = mongoose.model("notification", notificationSchema);
exports.saveNotification = function (object) {
    var deffered = q.defer();
    var saveNoticationModel = new noticationModel(object);
    saveNoticationModel.save(function (err, success) {
        if (!err) {
            deffered.resolve({ status: 1, data: success });
        }
        else {
            deffered.reject({ status: 0, data: err });
        }
        return deffered.promise;
    });
};
exports.findNotification = function (object) {
    var deffered = q.defer();
    noticationModel.find(object, function (err, success) {
        if (!err) {
            deffered.resolve({ status: 1, data: success });
        }
        else {
            deffered.reject({ status: 0, data: err });
        }
        return deffered.promise;
    });
};
