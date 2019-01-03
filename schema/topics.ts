

import mongoose = require('mongoose');
import q = require('q');

let Schema = mongoose.Schema;

var docSchema = new mongoose.Schema({

    topicName: String,
    words: [],
    date: { type: Date, default: Date.now }
})

let topicModel = mongoose.model('topic', docSchema);

export let saveTopic = function (object) {
    let deffered = q.defer();

    console.log(object)

    let saveTopicModel = new topicModel(object);
    saveTopicModel.save((err, success) => {
        if (!err) {
            deffered.resolve({ status: 1, data: success });
        }
        else {
            deffered.reject({ status: 0, data: err })
        }

    })
    return deffered.promise;
}

export let findTopic = function (words) {
    let deffered = q.defer();

    topicModel.find()
        
        .where('words')
        .in(words)
        .exec(function (err, success) {
            if (!err) {
                deffered.resolve({ status: 1, data: success });
            }
            else {
                deffered.reject({ status: 0, data: err })
            }
        })
    return deffered.promise;
}

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