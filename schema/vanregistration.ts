import mongoose = require('mongoose');
import q = require('q');

let Schema = mongoose.Schema;

var vanregistrationSchema = new mongoose.Schema({
    vanregId: Schema.Types.ObjectId,
    areaId: { type: Schema.Types.ObjectId, ref: 'area' },
    driverId: [{ type: Schema.Types.ObjectId, ref: 'driver' }],
    name: String,
    address: String,
    phone: String,
    lisence: String,
    nic: String,
    servicelocation: String,
    departmentId: { type: Schema.Types.ObjectId, ref: 'department' },
    date: { type: Date, default: Date.now },
    groupOfStudents: [{ type: Schema.ObjectId, ref: 'student' }],
    noOfSeats: String,
    driverUid: String,
    routeId: { type: Schema.Types.ObjectId, ref: 'route' },

})


let vanregistrationModel = mongoose.model('vanregistration', vanregistrationSchema);

export let saveVanregistration = function (object) {
    let deffered = q.defer();
    let saveVanregistrationModel = new vanregistrationModel(object);

    saveVanregistrationModel.save((err, success) => {
        if (!err) {
            deffered.resolve({ status: 1, data: success });
        }
        else {
            deffered.reject({ status: 0, data: err })
        }
    })
    return deffered.promise;
}


export let updateVans = function (vanregId, groupOfStudents) {
    let match = { _id: vanregId }
    let deffered = q.defer();
    vanregistrationModel
        .findByIdAndUpdate(match,
        { $set: { "groupOfStudents": groupOfStudents } },
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



export let updateDriver = function (vanregId, driverId, uid) {


    console.log(vanregId ,driverId,uid)

    let match = { _id: vanregId }
    let deffered = q.defer();
    vanregistrationModel
        .update(match,
        {
            $set: {
                "driverUid": uid,
            },
            $push: { "driverId": driverId }
        },
        { upsert: true, new: true, multi: true },
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

export let findVanregistration = function (object) {
    let deffered = q.defer();

    vanregistrationModel
    .find(object)
    .populate('areaId')
    .populate('driverId')
    .populate('groupOfStudents')
    .populate('routeId')
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
export let findFullVanDoc = function (object) {
    let deffered = q.defer();
    vanregistrationModel
        .findOne(object)
        .populate('areaId')
        .populate('driverId')
        .populate('groupOfStudents')
        .exec((err, doc) => {
            if (!err) {
                deffered.resolve({ status: 1, data: doc });
            }
            else {
                deffered.reject({ status: 0, data: err })
            }
        })
    return deffered.promise;

}
