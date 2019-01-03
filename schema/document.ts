

import mongoose = require('mongoose');
import q = require('q');

let Schema = mongoose.Schema;

var docSchema = new mongoose.Schema({

    DocName: String,
    words: [],
    date: { type: Date, default: Date.now }
})

let docModel = mongoose.model('document', docSchema);

export let saveDoc = function (object) {
    let deffered = q.defer();
    let saveDocModel = new docModel(object);
    saveDocModel.save((err, success) => {
        if (!err) {
            deffered.resolve({ status: 1, data: success });
        }
        else {
            deffered.reject({ status: 0, data: err })
        }

    })
    return deffered.promise;
}

export let findDoc = function (words) {
    let deffered = q.defer();

    docModel.find()
        .distinct("DocName")
        
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
}