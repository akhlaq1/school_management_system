import mongoose = require('mongoose');
import q = require('q');

let Schema = mongoose.Schema;


var parentSchema = new mongoose.Schema({
    parentId: Schema.Types.ObjectId,
    name: String,
    emailid: String,
    gardian: String,
    address: String,
    houseNo: String,
    coordX: String,
    coordY: String,
    Area: String,
    // phone:String,
    vanId : { type: Schema.Types.ObjectId, ref: 'vanregistration' },
    date: { type: Date, default: Date.now },
    studentId : { type: Schema.Types.ObjectId, ref: 'student' }
})


let parentModel = mongoose.model('parent', parentSchema);

export let saveParent = function (object) {
    let deffered = q.defer();
    let saveparentModel = new parentModel(object);
    saveparentModel.save((err, success) => {
        if (!err) {
            deffered.resolve({ status: 1, data: success });
        }
        else {
            deffered.reject({ status: 0, data: err })
        }

    })
    return deffered.promise;
}

export let findParent = function (object) {

    let deffered = q.defer();
    parentModel.find(object)
        .populate('studentId')
        .populate('vanId')
        .exec((err, success) => {
            if (!err) {
                deffered.resolve({ status: 1, data: success });
            }
            else {
                deffered.reject({ status: 0, data: err })
            }

        });
    return deffered.promise;
}

export let updateCoordinates = function (match, coordX , coordY) {
    let deffered = q.defer();
    parentModel
        .findByIdAndUpdate(match,
        { $set : { "coordX": coordX  , "coordY" : coordY} },
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

export let findSingleParent = function (object) {

    let deffered = q.defer();
    parentModel.findOne(object, (err, success) => {

        if (!err) {
            deffered.resolve({ status: 1, data: success });
        }
        else {
            deffered.reject({ status: 0, data: err })
        }

    });
    return deffered.promise;
}

export let editParent = function (object) {

    let deffered = q.defer();
    parentModel.findOneAndUpdate({ _id : object._id }, object , (err, success) => {

        if (!err) {
            deffered.resolve({ status: 1, data: success });
        }
        else {
            deffered.reject({ status: 0, data: err })
        }

    });
    return deffered.promise;
}
