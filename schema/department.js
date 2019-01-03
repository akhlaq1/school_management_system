"use strict";
var mongoose = require("mongoose");
var q = require("q");
var Schema = mongoose.Schema;
var departmentSchema = new mongoose.Schema({
    departmentId: Schema.Types.ObjectId,
    name: String,
    date: { type: Date, default: Date.now }
});
var departmentModel = mongoose.model('department', departmentSchema);
exports.saveDepartment = function (object) {
    var deffered = q.defer();
    var saveDepartmentModel = new departmentModel(object);
    saveDepartmentModel.save(function (err, success) {
        if (!err) {
            deffered.resolve({ status: 1, data: success });
        }
        else {
            deffered.reject({ status: 0, data: err });
        }
        return deffered.promise;
    });
};
var findDepartment = function (object) {
    var deffered = q.defer();
    departmentModel.find(object, function (err, success) {
        if (!err) {
            deffered.resolve({ status: 1, data: success });
        }
        else {
            deffered.reject({ status: 0, data: err });
        }
        return deffered.promise;
    });
};
