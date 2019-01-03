"use strict";
var mongoose = require("mongoose");
var q = require("q");
var Schema = mongoose.Schema;
var parentSchema = new mongoose.Schema({
    parentId: Schema.Types.ObjectId,
    name: String,
    emailid: String,
    gardian: String,
    address: String,
    houseNo: String,
    coordX: String,
    coordY: String,
    Area: String,
    // phone:String,
    vanId: { type: Schema.Types.ObjectId, ref: 'vanregistration' },
    date: { type: Date, "default": Date.now },
    studentId: { type: Schema.Types.ObjectId, ref: 'student' }
});
var parentModel = mongoose.model('parent', parentSchema);
exports.saveParent = function (object) {
    var deffered = q.defer();
    var saveparentModel = new parentModel(object);
    saveparentModel.save(function (err, success) {
        if (!err) {
            deffered.resolve({ status: 1, data: success });
        }
        else {
            deffered.reject({ status: 0, data: err });
        }
    });
    return deffered.promise;
};
exports.findParent = function (object) {
    var deffered = q.defer();
    parentModel.find(object)
        .populate('studentId')
        .populate('vanId')
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
exports.updateCoordinates = function (match, coordX, coordY) {
    var deffered = q.defer();
    parentModel
        .findByIdAndUpdate(match, { $set: { "coordX": coordX, "coordY": coordY } }, { upsert: true, "new": true }, function (err, success) {
        if (!err) {
            deffered.resolve({ status: 1, data: success });
        }
        else {
            deffered.reject({ status: 0, data: err });
        }
    });
    return deffered.promise;
};
exports.findSingleParent = function (object) {
    var deffered = q.defer();
    parentModel.findOne(object, function (err, success) {
        if (!err) {
            deffered.resolve({ status: 1, data: success });
        }
        else {
            deffered.reject({ status: 0, data: err });
        }
    });
    return deffered.promise;
};
exports.editParent = function (object) {
    var deffered = q.defer();
    parentModel.findOneAndUpdate({ _id: object._id }, object, function (err, success) {
        if (!err) {
            deffered.resolve({ status: 1, data: success });
        }
        else {
            deffered.reject({ status: 0, data: err });
        }
    });
    return deffered.promise;
};
