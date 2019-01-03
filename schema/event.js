"use strict";
var mongoose = require("mongoose");
var q = require("q");
var Schema = mongoose.Schema;
var eventSchema = new mongoose.Schema({
    eveId: String,
    description: String,
    date: { type: Date, "default": Date.now }
});
var eventModel = mongoose.model('event', eventSchema);
exports.saveEvent = function (object) {
    var deffered = q.defer();
    var saveEventModel = new eventModel(object);
    saveEventModel.save(function (err, success) {
        if (!err) {
            deffered.resolve({ status: 1, data: success });
        }
        else {
            deffered.reject({ status: 0, data: err });
        }
    });
    return deffered.promise;
};
exports.findEvent = function (object) {
    var deffered = q.defer();
    eventModel.find(object, function (err, success) {
        if (!err) {
            deffered.resolve({ status: 1, data: success });
        }
        else {
            deffered.reject({ status: 0, data: err });
        }
    });
    return deffered.promise;
};
