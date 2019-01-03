"use strict";
var mongoose = require("mongoose");
var q = require("q");
var Schema = mongoose.Schema;
var calendar = new mongoose.Schema({
    calenderId: { type: Schema.Types.ObjectId },
    description: String,
    status: { type: String, Default: 1 },
    date: { type: Date },
    title: { type: String }
});
var calendarModel = mongoose.model('calendar', calendar);
exports.saveCalendar = function (object) {
    var deffered = q.defer();
    var saveCalendarModel = new calendarModel(object);
    saveCalendarModel.save(function (err, success) {
        if (!err) {
            deffered.resolve({ status: 1, data: success });
        }
        else {
            deffered.reject({ status: 0, data: err });
        }
    });
    return deffered.promise;
};
exports.findCalendar = function (object) {
    var deffered = q.defer();
    calendarModel.findOne({ 'date': object }, function (err, success) {
        if (!err) {
            deffered.resolve({ status: 1, data: success });
        }
        else {
            deffered.reject({ status: 0, data: err });
        }
    });
    return deffered.promise;
};
