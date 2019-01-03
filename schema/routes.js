"use strict";
var mongoose = require("mongoose");
var q = require("q");
var Schema = mongoose.Schema;
var routes = new mongoose.Schema({
    routeId: { type: Schema.Types.ObjectId },
    waypoints: { type: Schema.Types.Array },
    date: { type: Date },
    title: { type: String },
    origin: { type: String },
    destination: { type: String }
});
var routeModel = mongoose.model('route', routes);
exports.saveRoute = function (object) {
    var deffered = q.defer();
    var saveRouteModel = new routeModel(object);
    saveRouteModel.save(function (err, success) {
        if (!err) {
            deffered.resolve({ status: 1, data: success });
        }
        else {
            deffered.reject({ status: 0, data: err });
        }
    });
    return deffered.promise;
};
exports.findRoutes = function (object) {
    var deffered = q.defer();
    routeModel.find({}, function (err, success) {
        if (!err) {
            deffered.resolve({ status: 1, data: success });
        }
        else {
            deffered.reject({ status: 0, data: err });
        }
    });
    return deffered.promise;
};
