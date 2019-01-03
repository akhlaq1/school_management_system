"use strict";
var mongoose = require("mongoose");
var q = require("q");
var Schema = mongoose.Schema;
var vanSchema = new mongoose.Schema({
    vanId: Schema.Types.ObjectId,
    vanName: String,
    AreaId: String,
    date: { type: Date, "default": Date.now },
    schoolLocationX: String,
    schoolLocationY: String,
    startTime: String,
    endTime: String,
    uid: String,
    groupOfStudents: []
});
var vanModel = mongoose.model('van', vanSchema);
exports.saveVan = function (object) {
    var deffered = q.defer();
    var saveVanModel = new vanModel(object);
    saveVanModel.save(function (err, success) {
        if (!err) {
            deffered.resolve({ status: 1, data: success });
        }
        else {
            deffered.reject({ status: 0, data: err });
        }
    });
    return deffered.promise;
};
exports.findVan = function (object) {
    var deffered = q.defer();
    vanModel.find(object, function (err, success) {
        if (!err) {
            deffered.resolve({ status: 1, data: success });
        }
        else {
            deffered.reject({ status: 0, data: err });
        }
    });
    return deffered.promise;
};
