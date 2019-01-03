"use strict";
var mongoose = require("mongoose");
var q = require("q");
var Schema = mongoose.Schema;
var enrollementSchema = new mongoose.Schema({
    eid: Schema.Types.ObjectId,
    classid: { type: Schema.Types.ObjectId, ref: 'class' },
    teacherId: [{ type: Schema.ObjectId, ref: 'teacher' }],
    date: { type: Date, "default": Date.now }
});
var enrollementModel = mongoose.model('enrollement', enrollementSchema);
exports.saveEnrollement = function (object) {
    var deffered = q.defer();
    var saveEnrollementModel = new enrollementModel(object);
    console.log('comming from enrollment', object);
    enrollementModel.update({ classid: object.classid }, { $push: { teacherId: object.teacherId } }, function (err, success) {
        if (!err && success.nModified == '0') {
            saveEnrollementModel.save(function (err, success) {
                if (!err) {
                    deffered.resolve({ status: 1, data: success });
                }
                else {
                    deffered.reject({ status: 0, data: err });
                }
            });
        }
        else if (err) {
            console.log(err);
            deffered.reject({ status: 0, data: err });
        }
        else {
            if (!err) {
                deffered.resolve({ status: 1, data: success });
            }
            else {
                deffered.reject({ status: 0, data: err });
            }
        }
    });
    /* saveEnrollementModel.save((err, success) => {
         if (!err) {
             deffered.resolve({ status: 1, data: success });
         }
         else {
             deffered.reject({ status: 0, data: err })
         }
     })*/
    return deffered.promise;
};
exports.findEnrollement = function (object) {
    var deffered = q.defer();
    enrollementModel.find(object, function (err, success) {
        if (!err) {
            deffered.resolve({ status: 1, data: success });
        }
        else {
            deffered.reject({ status: 0, data: err });
        }
    });
    return deffered.promise;
};
exports.findEnrollementOfClassAndTeacher = function (object) {
    var deffered = q.defer();
    enrollementModel
        .find(object)
        .populate('classid')
        .populate('teacherId')
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
