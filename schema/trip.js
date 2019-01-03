"use strict";
var mongoose = require("mongoose");
var q = require("q");
var Schema = mongoose.Schema;
var tripSchema = new mongoose.Schema({
    tripId: Schema.Types.ObjectId,
    startTime: String,
    endTime: String,
    driverId: { type: Schema.Types.ObjectId, ref: 'driver' },
    date: { type: Date, "default": Date.now }
});
var tripModel = mongoose.model('department', tripSchema);
exports.tripSave = function (object) {
    var deffered = q.defer();
    var trip = new tripModel(object);
    trip.save(function (err, success) {
        if (!err) {
            deffered.resolve({ status: 1, data: success });
        }
        else {
            deffered.reject({ status: 0, data: err });
        }
        return deffered.promise;
    });
};
var findTrip = function (object) {
    var deffered = q.defer();
    tripModel.find(object, function (err, success) {
        if (!err) {
            deffered.resolve({ status: 1, data: success });
        }
        else {
            deffered.reject({ status: 0, data: err });
        }
        return deffered.promise;
    });
};
