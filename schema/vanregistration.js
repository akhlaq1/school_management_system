"use strict";
var mongoose = require("mongoose");
var q = require("q");
var Schema = mongoose.Schema;
var vanregistrationSchema = new mongoose.Schema({
    vanregId: Schema.Types.ObjectId,
    areaId: { type: Schema.Types.ObjectId, ref: 'area' },
    driverId: [{ type: Schema.Types.ObjectId, ref: 'driver' }],
    name: String,
    address: String,
    phone: String,
    lisence: String,
    nic: String,
    servicelocation: String,
    departmentId: { type: Schema.Types.ObjectId, ref: 'department' },
    date: { type: Date, "default": Date.now },
    groupOfStudents: [{ type: Schema.ObjectId, ref: 'student' }],
    noOfSeats: String,
    driverUid: String,
    routeId: { type: Schema.Types.ObjectId, ref: 'route' }
});
var vanregistrationModel = mongoose.model('vanregistration', vanregistrationSchema);
exports.saveVanregistration = function (object) {
    var deffered = q.defer();
    var saveVanregistrationModel = new vanregistrationModel(object);
    saveVanregistrationModel.save(function (err, success) {
        if (!err) {
            deffered.resolve({ status: 1, data: success });
        }
        else {
            deffered.reject({ status: 0, data: err });
        }
    });
    return deffered.promise;
};
exports.updateVans = function (vanregId, groupOfStudents) {
    var match = { _id: vanregId };
    var deffered = q.defer();
    vanregistrationModel
        .findByIdAndUpdate(match, { $set: { "groupOfStudents": groupOfStudents } }, { upsert: true, "new": true }, function (err, success) {
        if (!err) {
            deffered.resolve({ status: 1, data: success });
        }
        else {
            deffered.reject({ status: 0, data: err });
        }
    });
    return deffered.promise;
};
exports.updateDriver = function (vanregId, driverId, uid) {
    console.log(vanregId, driverId, uid);
    var match = { _id: vanregId };
    var deffered = q.defer();
    vanregistrationModel
        .update(match, {
        $set: {
            "driverUid": uid
        },
        $push: { "driverId": driverId }
    }, { upsert: true, "new": true, multi: true }, function (err, success) {
        if (!err) {
            deffered.resolve({ status: 1, data: success });
        }
        else {
            deffered.reject({ status: 0, data: err });
        }
    });
    return deffered.promise;
};
exports.findVanregistration = function (object) {
    var deffered = q.defer();
    vanregistrationModel
        .find(object)
        .populate('areaId')
        .populate('driverId')
        .populate('groupOfStudents')
        .populate('routeId')
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
exports.findFullVanDoc = function (object) {
    var deffered = q.defer();
    vanregistrationModel
        .findOne(object)
        .populate('areaId')
        .populate('driverId')
        .populate('groupOfStudents')
        .exec(function (err, doc) {
        if (!err) {
            deffered.resolve({ status: 1, data: doc });
        }
        else {
            deffered.reject({ status: 0, data: err });
        }
    });
    return deffered.promise;
};
