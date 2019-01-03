"use strict";
var mongoose = require("mongoose");
var q = require("q");
var Schema = mongoose.Schema;
var departmentActivitySchema = new mongoose.Schema({
    departmentAcitivityId: Schema.Types.ObjectId,
});
var departmentActivityModel = mongoose.model('departmentactivity', departmentActivitySchema);
exports.saveDepartment = function (object) {
    var deffered = q.defer();
    var saveDepartmentActivityModel = new departmentActivityModel(object);
    saveDepartmentActivityModel.save(function (err, success) {
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
    departmentActivityModel.find(object, function (err, success) {
        if (!err) {
            deffered.resolve({ status: 1, data: success });
        }
        else {
            deffered.reject({ status: 0, data: err });
        }
        return deffered.promise;
    });
};
