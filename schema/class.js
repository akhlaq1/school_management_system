"use strict";
var mongoose = require("mongoose");
var q = require("q");
var Schema = mongoose.Schema;
var classSchema = new mongoose.Schema({
    cid: Schema.Types.ObjectId,
    name: String,
    date: { type: Date, "default": Date.now },
    schoolId: String
});
var classModel = mongoose.model('class', classSchema);
exports.saveClass = function (object) {
    var deffered = q.defer();
    var saveClassModel = new classModel(object);
    saveClassModel.save(function (err, success) {
        if (!err) {
            deffered.resolve({ status: 1, data: success });
        }
        else {
            deffered.reject({ status: 0, data: err });
        }
    });
    return deffered.promise;
};
exports.findClass = function (object) {
    var deffered = q.defer();
    classModel.find(object, function (err, success) {
        if (!err) {
            deffered.resolve({ status: 1, data: success });
        }
        else {
            deffered.reject({ status: 0, data: err });
        }
    });
    return deffered.promise;
};
