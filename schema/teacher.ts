

import mongoose = require('mongoose');
import q = require('q');

let Schema = mongoose.Schema;
let teacherSchema = new mongoose.Schema({
    tId: Schema.Types.ObjectId,
    name: String,
    address: String,
    qualification: String,
    rank: String,
    emailId: String,
    phoneNo: String,
    status: String,
    teacherInteractiveId: [{ type: Schema.Types.ObjectId, ref: 'teacherInteractive' }],
    date: { type: Date, default: Date.now },
    uid: String
})

let teacherModel = mongoose.model("teacher", teacherSchema);

export let saveTeacher = function (object) {

    
     let deffered = q.defer();
     let saveTeacherModel = new teacherModel(object);
     saveTeacherModel.save((err, success) => {
         if (!err) {
             deffered.resolve({ status: 1, data: success });
         }
         else {
             deffered.reject({ status: 0, data: err })
         }
 
     })
    return deffered.promise;
}

export let findTeacher = function (object) {
    let deffered = q.defer();
    teacherModel
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

export let findTeacherEmail = function (object) {
    let deffered = q.defer();
    teacherModel
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

export let updateTeacher = function (object) {


    let deffered = q.defer();
    let query = { _id: object.tId }
    teacherModel.update(query, {
        $set: {
            name: object.name,
            address: object.address,
            qualification: object.qualification,
            emailId: object.emailId,
            phoneNo: object.phoneNo,

        }
    }, (err, success) => {
        if (!err) {

            deffered.resolve({ status: 1, data: success });
        }
        else {
            deffered.reject({ status: 0, data: err })
        }
    })
    return deffered.promise;
}