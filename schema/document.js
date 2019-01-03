"use strict";
var mongoose = require("mongoose");
var q = require("q");
var Schema = mongoose.Schema;
var docSchema = new mongoose.Schema({
    DocName: String,
    words: [],
    date: { type: Date, "default": Date.now }
});
var docModel = mongoose.model('document', docSchema);
exports.saveDoc = function (object) {
    var deffered = q.defer();
    var saveDocModel = new docModel(object);
    saveDocModel.save(function (err, success) {
        if (!err) {
            deffered.resolve({ status: 1, data: success });
        }
        else {
            deffered.reject({ status: 0, data: err });
        }
    });
    return deffered.promise;
};
exports.findDoc = function (words) {
    var deffered = q.defer();
    docModel.find()
        .distinct("DocName")
        .where('words')["in"](words)
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
    docModel
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
