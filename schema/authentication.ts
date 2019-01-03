import { SendingMail } from './../email-setup/email-function'
import mongoose = require('mongoose');
import q = require('q');
import { findTeacherEmail } from './teacher'
import { findStudentEmail } from './student'



let Schema = mongoose.Schema;

var authenticationSchema = new mongoose.Schema({
    authenticationId: Schema.Types.ObjectId,
    username: String,
    password: String,
    roll: String,
    uid: String,
    email: String,
    date: { type: Date, default: Date.now },
    token: String,
    img: { data: Buffer, contentType: String },
    coordX: String,
    coordY: String,
    start: { type: Schema.Types.String},
    end: { type: Schema.Types.String},
    voters: [{type: Schema.ObjectId, ref: 'authentication' }],
})


let authenticationModel = mongoose.model('authentication', authenticationSchema);

export let saveAuthentication = function (object) {
    let deffered = q.defer();
    let saveAuthenticationModel = new authenticationModel(object);
    saveAuthenticationModel.save((err, success) => {
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
    authenticationModel
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

export let findAuthentication = function (object) {

    let deffered = q.defer();
    authenticationModel
      
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

export let findAllEmails = function (object) {

    let deffered = q.defer();

    authenticationModel
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

export let SendAllEmail = function (object) {

    console.log(object);
    SendingMail(object.emails, object.subject, object.body);
}

export let updateToken = function (obj) {

    let deffered = q.defer();
    authenticationModel.findOneAndUpdate({ email: obj.email },
        {
            $set: { token: obj.token }
        }, { new: true }, function (err, doc) {
            if (err) {
                console.log("Something wrong when updating data!");
                deffered.reject({ status: 0, data: err })
            }
            else {

                deffered.resolve({ status: 1, data: doc });
            }
        });
    return deffered.promise;
}

export let notificationSend = function (obj) {
    let deffered = q.defer();

    findTeacherEmail({ uid: obj.tuid })
        .then((error) => {
            deffered.reject({ status: 0, data: error })
        }, (resolve) => {

            /*  */
            deffered.resolve({ status: 1, data: resolve });
        })
    return deffered.promise;
}

export let notificationSendStudent = function (obj) {
    let deffered = q.defer();
    authenticationModel
        .findOne({ uid: obj.stuid }, (error, success) => {
            if (!error) {
                deffered.resolve({ status: 1, data: success });
            }
            else {
                deffered.reject({ status: 0, data: error })
            }
        })
    return deffered.promise;
}

export let findAllAuthentication = function (object) {

       let deffered = q.defer();
    authenticationModel
    .find({roll : 'admin' })
    .populate('voters')       
    .exec(function (err, success) {
        if (!err) {
            deffered.resolve({ status: 1, data: success });
        }
        else {
            deffered.reject({ status: 0, data: err })
        }

    });
    return deffered.promise;
}

export let updateAuthentication = function (object) {

    let deffered = q.defer();

    authenticationModel.findOneAndUpdate(
        { '_id': object._id },
        { $set: { voters: object.voters } },
        { upsert: true, new: true },
        (err, success) => {
            if (!err) {
                console.log(success)
                deffered.resolve({ status: 1, data: success });
            }
            else {
                deffered.reject({ status: 0, data: err })
            }

        });
    return deffered.promise;
}

export let updateProfileAuthentication = function (object) {

    let deffered = q.defer();

    authenticationModel.findOneAndUpdate(
        { '_id': object._id },
        { $set: { img : object.src } },
        { upsert: true, new: true },
        (err, success) => {
            if (!err) {
                console.log(success)
                deffered.resolve({ status: 1, data: success });
            }
            else {
                deffered.reject({ status: 0, data: err })
            }

        });
    return deffered.promise;
}



export let updateTiming = function (object) {

    let deffered = q.defer();

    authenticationModel.findOneAndUpdate(
        { '_id': object._id },
        { $set: { start : object.start , end : object.end } },
        { upsert: true, new: true },
        (err, success) => {
            if (!err) {
                console.log(success)
                deffered.resolve({ status: 1, data: success });
            }
            else {
                deffered.reject({ status: 0, data: err })
            }

        });
    return deffered.promise;
}


