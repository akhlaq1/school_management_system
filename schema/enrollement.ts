

import mongoose = require('mongoose');
import q = require('q');

let Schema = mongoose.Schema;

var enrollementSchema = new mongoose.Schema({
    eid: Schema.Types.ObjectId,
    classid: { type: Schema.Types.ObjectId, ref: 'class' },
    teacherId: [{ type: Schema.ObjectId, ref: 'teacher' }],
    date: { type: Date, default: Date.now }
})

let enrollementModel = mongoose.model('enrollement', enrollementSchema);

export let saveEnrollement = function (object) {
    let deffered = q.defer();


    let saveEnrollementModel = new enrollementModel(object);


    console.log('comming from enrollment', object)

    enrollementModel.update(
        { classid: object.classid },
        { $push: { teacherId: object.teacherId } }
        , (err, success) => {
            if (!err && success.nModified == '0') {
                saveEnrollementModel.save((err, success) => {
                    if (!err) {
                        deffered.resolve({ status: 1, data: success });
                    }
                    else {
                        deffered.reject({ status: 0, data: err })
                    }
                })
                // deffered.resolve({ status: 1, data: success });
            }
            else if (err) {
                console.log(err)
                deffered.reject({ status: 0, data: err })
            }
            else {

                if (!err) {
                    deffered.resolve({ status: 1, data: success });
                }
                else {
                    deffered.reject({ status: 0, data: err })
                }

            }
        })


    /* saveEnrollementModel.save((err, success) => {
         if (!err) {
             deffered.resolve({ status: 1, data: success });
         }
         else {
             deffered.reject({ status: 0, data: err })
         }
     })*/
    return deffered.promise;
}

export let findEnrollement = function (object) {
    let deffered = q.defer();
    enrollementModel.find(object, (err, success) => {
        if (!err) {
            deffered.resolve({ status: 1, data: success });
        }
        else {
            deffered.reject({ status: 0, data: err })
        }
    });
    return deffered.promise;
}

export let findEnrollementOfClassAndTeacher = function (object) {
    let deffered = q.defer();
    enrollementModel
        .find(object)
        .populate('classid')
        .populate('teacherId')
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
