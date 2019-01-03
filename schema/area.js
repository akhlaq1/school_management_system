"use strict";
var mongoose = require("mongoose");
var q = require("q");
var Schema = mongoose.Schema;
var areaSchema = new mongoose.Schema({
    areaId: Schema.Types.ObjectId,
    area: String,
    areaBound: {},
    date: { type: Date, "default": Date.now }
});
var areaModel = mongoose.model('area', areaSchema);
exports.saveArea = function (object) {
    var deffered = q.defer();
    var saveAreaModel = new areaModel(object);
    saveAreaModel.save(function (err, success) {
        if (!err) {
            deffered.resolve({ status: 1, data: success });
        }
        else {
            deffered.reject({ status: 0, data: err });
        }
    });
    return deffered.promise;
};
exports.findArea = function (object) {
    var deffered = q.defer();
    areaModel.find(object, function (err, success) {
        if (!err) {
            deffered.resolve({ status: 1, data: success });
        }
        else {
            deffered.reject({ status: 0, data: err });
        }
    });
    return deffered.promise;
};
