"use strict";
var mongoose = require("mongoose");
var q = require("q");
var Schema = mongoose.Schema;
var busStop = new mongoose.Schema({
    routeId: { type: Schema.Types.ObjectId },
    date: { type: Date },
    location: { type: String },
    stopover: { type: Boolean, "default": true }
});
var busStopModel = mongoose.model('busStop', busStop);
exports.saveBusStop = function (object) {
    var deffered = q.defer();
    var saveBusModel = new busStopModel(object);
    saveBusModel.save(function (err, success) {
        if (!err) {
            deffered.resolve({ status: 1, data: success });
        }
        else {
            deffered.reject({ status: 0, data: err });
        }
    });
    return deffered.promise;
};
exports.findBusStop = function (object) {
    var deffered = q.defer();
    busStopModel.find({}, function (err, success) {
        if (!err) {
            deffered.resolve({ status: 1, data: success });
        }
        else {
            deffered.reject({ status: 0, data: err });
        }
    });
    return deffered.promise;
};
