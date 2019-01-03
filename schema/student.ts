

import mongoose = require('mongoose');
import q = require('q');

let Schema = mongoose.Schema;

var studentSchema = new mongoose.Schema({
    sId: Schema.Types.ObjectId,
    name: String,
    area: String,
    phoneNo: String,
    eid: { type: Schema.Types.ObjectId, ref: 'enrollement' },
    date: { type: Date, default: Date.now },
    uid: String,
    VanAssign: {
        type: Boolean,
        default: false
    },
    //auth : { type: Schema.Types.ObjectId, ref: 'authentication'  }
})

let studentModel = mongoose.model('student', studentSchema);

export let saveStudent = function (object) {
    let deffered = q.defer();
    let saveStudentModel = new studentModel(object);
    saveStudentModel.save((err, success) => {
        if (!err) {
            deffered.resolve({ status: 1, data: success });
        }
        else {
            deffered.reject({ status: 0, data: err })
        }
    })
    return deffered.promise;
}

export let findStudent = function (object) {
    let deffered = q.defer();
    studentModel.find(object, (err, success) => {
        if (!err) {
            deffered.resolve({ status: 1, data: success });
        }
        else {
            deffered.reject({ status: 0, data: err })
        }

    });
    return deffered.promise;
}



export let findStudentEmail = function (object) {
    let deffered = q.defer();
    studentModel
        .findOne(object, (err, success) => {
            if (!err) {

                deffered.resolve({ status: 1, data: success });
            }
            else {
                deffered.reject({ status: 0, data: err })
            }

        });
    return deffered.promise;
}


export let findAllStudentEnrolled = function (object) {
    let deffered = q.defer();
    studentModel
        .find({})
        .populate('eid')
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

export let saveStudentEnrolled = function (match, object) {


    console.log(match, object);
    /*studentModel
       .findByIdAndUpdate({ _id : '584bd32fca465010c053c2a1' } ,
        {$push : { "enr" :  '584bd324ca465010c053c2a0' }  } ,
       { upsert: true, new : true},
        (err, success) => {
       if (!err) {
           deffered.resolve({ status: 1, data: success });
       }
       else {
           deffered.reject({ status: 0, data: err })
       }        
            
    });*/

    let deffered = q.defer();
    studentModel
        .findByIdAndUpdate({ _id: match },
        { $set: { "eid": object } },
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

export let EditStudent = function (object) {
    let deffered = q.defer();
    studentModel.findOneAndUpdate({_id : object._id }, object  , (err, success) => {
        if (!err) {
            deffered.resolve({ status: 1, data: success });
        }
        else {
            deffered.reject({ status: 0, data: err })
        }

    });
    return deffered.promise;
}

