

import mongoose = require('mongoose');
import q = require('q');

let Schema = mongoose.Schema;

var subjectSchema = new mongoose.Schema({
    sid: Schema.Types.ObjectId,
    name: String,
    teacherid: { type: Schema.Types.ObjectId, ref: 'teacher' },
    date: { type: Date, default: Date.now },
    uid: String
})

let subjectModel = mongoose.model('subject', subjectSchema);

export let saveSubject = function (object) {
    let deffered = q.defer();
    let saveSubjectModel = new subjectModel(object);
    saveSubjectModel.save((err, success) => {
        if (!err) {
            deffered.resolve({ status: 1, data: success });
        }
        else {
            deffered.reject({ status: 0, data: err })
        }

    })
    return deffered.promise;
}

export let findAllSubjectAssign = function (object) {
    let deffered = q.defer();
    subjectModel
        .find({})
        .populate('teacherid')
        .exec((err, success) => {
            if (!err) {
                deffered.resolve({ status: 1, data: success });
            }
            else {
                deffered.reject({ status: 0, data: err })
            }
        })
    return deffered.promise;

}

export let assignSubject = function (match, object) {
    let deffered = q.defer();
    subjectModel
        .findByIdAndUpdate({ _id: match },
        { $set: { "teacherid": object } },
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

export let updateSubject = function (match, object) {
    let deffered = q.defer();
    subjectModel
        .findByIdAndUpdate({ _id: match },
        { $set: { "teacherid": object.teacherid, "name": object.name } },
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


export let updateCSubject = function (match, object) {

    console.log(object)

    let deffered = q.defer();
    subjectModel
        .findByIdAndUpdate({ _id: match },
        { $set: { "teacherid": object.teacherid } },
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

export let findSubject = function (object) {
    let deffered = q.defer();
    subjectModel
        .find(object, (err, success) => {
            if (!err) {
                deffered.resolve({ status: 1, data: success });
            }
            else {
                deffered.reject({ status: 0, data: err })
            }

        });
    return deffered.promise;
}