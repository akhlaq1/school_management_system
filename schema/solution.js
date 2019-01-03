"use strict";
var mongoose = require("mongoose");
var q = require("q");
var Schema = mongoose.Schema;
var solutionSchema = new mongoose.Schema({
    solId: Schema.Types.ObjectId,
    solution: String,
    teacherId: [{ type: Schema.Types.ObjectId, ref: 'teacher' }],
    problemId: [{ type: Schema.Types.ObjectId, ref: 'problem' }],
    voteId: { type: Schema.Types.ObjectId },
    date: { type: Date, "default": Date.now }
});
var solutionModel = mongoose.model("solution", solutionSchema);
exports.saveSolution = function (object) {
    var deffered = q.defer();
    var saveSolutionModel = new solutionModel(object);
    saveSolutionModel.save(function (err, success) {
        if (!err) {
            deffered.resolve({ status: 1, data: success });
        }
        else {
            deffered.reject({ status: 0, data: err });
        }
    });
    return deffered.promise;
};
exports.findSolution = function (object) {
    var deffered = q.defer();
    solutionModel.find(object, function (err, success) {
        if (!err) {
            deffered.resolve({ status: 1, data: success });
        }
        else {
            deffered.reject({ status: 0, data: err });
        }
    });
    return deffered.promise;
};
//find All teacher problem
