"use strict";
var mongoose = require("mongoose");
var q = require("q");
var Schema = mongoose.Schema;
var emailSchema = new mongoose.Schema({
    emailId: { type: Schema.Types.ObjectId },
    description: String,
    date: { type: Date, "default": Date.now }
});
var emailModel = mongoose.model('email', emailSchema);
exports.saveEmail = function (object) {
    var deffered = q.defer();
    var saveEmailModel = new emailModel(object);
    saveEmailModel.save(function (err, success) {
        if (!err) {
            deffered.resolve({ status: 1, data: success });
        }
        else {
            deffered.reject({ status: 0, data: err });
        }
    });
    return deffered.promise;
};
exports.findEmail = function (object) {
    var deffered = q.defer();
    emailModel.find(object, function (err, success) {
        if (!err) {
            deffered.resolve({ status: 1, data: success });
        }
        else {
            deffered.reject({ status: 0, data: err });
        }
    });
    return deffered.promise;
};
