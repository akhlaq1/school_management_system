"use strict";
var mongoose = require("mongoose");
var q = require("q");
var Schema = mongoose.Schema;
var driverSchema = new mongoose.Schema({
    driverId: Schema.Types.ObjectId,
    driverName: String,
    AreaId: { type: Schema.Types.ObjectId, ref: 'area' },
    date: { type: Date, "default": Date.now },
    schoolLocationX: String,
    schoolLocationY: String,
    startTime: String,
    endTime: String,
    uid: String,
    phone: String
});
var driverModel = mongoose.model('driver', driverSchema);
exports.saveDriver = function (object) {
    var deffered = q.defer();
    var saveDriverModel = new driverModel(object);
    saveDriverModel.save(function (err, success) {
        if (!err) {
            deffered.resolve({ status: 1, data: success });
        }
        else {
            deffered.reject({ status: 0, data: err });
        }
    });
    return deffered.promise;
};
exports.findDriver = function (object) {
    var deffered = q.defer();
    driverModel.find(object, function (err, success) {
        if (!err) {
            deffered.resolve({ status: 1, data: success });
        }
        else {
            deffered.reject({ status: 0, data: err });
        }
    });
    return deffered.promise;
};
