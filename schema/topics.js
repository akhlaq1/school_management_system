"use strict";
var mongoose = require("mongoose");
var q = require("q");
var Schema = mongoose.Schema;
var docSchema = new mongoose.Schema({
    topicName: String,
    words: [],
    date: { type: Date, "default": Date.now }
});
var topicModel = mongoose.model('topic', docSchema);
exports.saveTopic = function (object) {
    var deffered = q.defer();
    console.log(object);
    var saveTopicModel = new topicModel(object);
    saveTopicModel.save(function (err, success) {
        if (!err) {
            deffered.resolve({ status: 1, data: success });
        }
        else {
            deffered.reject({ status: 0, data: err });
        }
    });
    return deffered.promise;
};
exports.findTopic = function (words) {
    var deffered = q.defer();
    topicModel.find()
        .where('words')["in"](words)
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
/*
export let updateCoordinates = function (match, coordX , coordY) {
    let deffered = q.defer();
    docModel
        .findByIdAndUpdate(match,
        { $set: { "coordX": coordX  , "coordY" : coordY} },
        { upsert: true, new: true },
        (err, success) => {
            if (!err) {
                deffered.resolve({ status: 1, data: success });
            }
            else {
                deffered.reject({ status: 0, data: err })
            }

        });
    return deffered.promise;
}*/ 
