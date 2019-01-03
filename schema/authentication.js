"use strict";
var email_function_1 = require("./../email-setup/email-function");
var mongoose = require("mongoose");
var q = require("q");
var teacher_1 = require("./teacher");
var Schema = mongoose.Schema;
var authenticationSchema = new mongoose.Schema({
    authenticationId: Schema.Types.ObjectId,
    username: String,
    password: String,
    roll: String,
    uid: String,
    email: String,
    date: { type: Date, "default": Date.now },
    token: String,
    img: { data: Buffer, contentType: String },
    coordX: String,
    coordY: String,
    start: { type: Schema.Types.String },
    end: { type: Schema.Types.String },
    voters: [{ type: Schema.ObjectId, ref: 'authentication' }]
});
var authenticationModel = mongoose.model('authentication', authenticationSchema);
exports.saveAuthentication = function (object) {
    var deffered = q.defer();
    var saveAuthenticationModel = new authenticationModel(object);
    saveAuthenticationModel.save(function (err, success) {
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
    authenticationModel
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
exports.findAuthentication = function (object) {
    var deffered = q.defer();
    authenticationModel
        .findOne(object, function (err, success) {
        if (!err) {
            deffered.resolve({ status: 1, data: success });
        }
        else {
            deffered.reject({ status: 0, data: err });
        }
    });
    return deffered.promise;
};
exports.findAllEmails = function (object) {
    var deffered = q.defer();
    authenticationModel
        .find(object, function (err, success) {
        if (!err) {
            deffered.resolve({ status: 1, data: success });
        }
        else {
            deffered.reject({ status: 0, data: err });
        }
    });
    return deffered.promise;
};
exports.SendAllEmail = function (object) {
    console.log(object);
    email_function_1.SendingMail(object.emails, object.subject, object.body);
};
exports.updateToken = function (obj) {
    var deffered = q.defer();
    authenticationModel.findOneAndUpdate({ email: obj.email }, {
        $set: { token: obj.token }
    }, { "new": true }, function (err, doc) {
        if (err) {
            console.log("Something wrong when updating data!");
            deffered.reject({ status: 0, data: err });
        }
        else {
            deffered.resolve({ status: 1, data: doc });
        }
    });
    return deffered.promise;
};
exports.notificationSend = function (obj) {
    var deffered = q.defer();
    teacher_1.findTeacherEmail({ uid: obj.tuid })
        .then(function (error) {
        deffered.reject({ status: 0, data: error });
    }, function (resolve) {
        /*  */
        deffered.resolve({ status: 1, data: resolve });
    });
    return deffered.promise;
};
exports.notificationSendStudent = function (obj) {
    var deffered = q.defer();
    authenticationModel
        .findOne({ uid: obj.stuid }, function (error, success) {
        if (!error) {
            deffered.resolve({ status: 1, data: success });
        }
        else {
            deffered.reject({ status: 0, data: error });
        }
    });
    return deffered.promise;
};
exports.findAllAuthentication = function (object) {
    var deffered = q.defer();
    authenticationModel
        .find({ roll: 'admin' })
        .populate('voters')
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
exports.updateAuthentication = function (object) {
    var deffered = q.defer();
    authenticationModel.findOneAndUpdate({ '_id': object._id }, { $set: { voters: object.voters } }, { upsert: true, "new": true }, function (err, success) {
        if (!err) {
            console.log(success);
            deffered.resolve({ status: 1, data: success });
        }
        else {
            deffered.reject({ status: 0, data: err });
        }
    });
    return deffered.promise;
};
exports.updateProfileAuthentication = function (object) {
    var deffered = q.defer();
    authenticationModel.findOneAndUpdate({ '_id': object._id }, { $set: { img: object.src } }, { upsert: true, "new": true }, function (err, success) {
        if (!err) {
            console.log(success);
            deffered.resolve({ status: 1, data: success });
        }
        else {
            deffered.reject({ status: 0, data: err });
        }
    });
    return deffered.promise;
};
exports.updateTiming = function (object) {
    var deffered = q.defer();
    authenticationModel.findOneAndUpdate({ '_id': object._id }, { $set: { start: object.start, end: object.end } }, { upsert: true, "new": true }, function (err, success) {
        if (!err) {
            console.log(success);
            deffered.resolve({ status: 1, data: success });
        }
        else {
            deffered.reject({ status: 0, data: err });
        }
    });
    return deffered.promise;
};
