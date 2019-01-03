"use strict";
var express = require("express");
var bodyParser = require('body-parser');
var connection_1 = require("./database/connection");
connection_1.connectionToDb();
var request = require('request');
//import * as admin from "firebase-admin";
var admin = require("firebase-admin");
var FCM = require('fcm-node');
var SERVER_API_KEY = "AIzaSyBiYHGe_bMqWkTR8It_u8GOQ4sw27hX6TA";
var fcmCli = new FCM(SERVER_API_KEY);
/*
var firebase = require("firebase");

*/
var app = admin.initializeApp({
    credential: admin.credential.cert('school-web-7d8e8-firebase-adminsdk-rf9d0-68d90661a5.json'),
    databaseURL: "https://school-web-7d8e8.firebaseio.com"
});
var db = admin.database();
var ref = db.ref("/notification");
var teacher_1 = require("./schema/teacher");
var student_1 = require("./schema/student");
var subject_1 = require("./schema/subject");
var email_1 = require("./schema/email");
var van_1 = require("./schema/van");
var vanregistration_1 = require("./schema/vanregistration");
var area_1 = require("./schema/area");
var solution_1 = require("./schema/solution");
var vote_1 = require("./schema/vote");
var problem_1 = require("./schema/problem");
var class_1 = require("./schema/class");
var parent_1 = require("./schema/parent");
var event_1 = require("./schema/event");
var authentication_1 = require("./schema/authentication");
var enrollement_1 = require("./schema/enrollement");
var calendar_1 = require("./schema/calendar");
var email_function_1 = require("./email-setup/email-function");
// import {saveStudentIntract,findStudentIntract} from './schema/studentintract';
// import {saveStudentActivity ,findStudentActivity} from './schema/studentactivity';
var path = require('path');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 'extended': 'true' })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
// app.use(methodOverride());
// app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
//app.use('/web' , express.static('web-public'));
//app.use('/static', express.static(path.join(__dirname, 'web-public')))
app.use(express.static(__dirname + '/web'));
//------------------ Calendar ----------------------------- //
app.post('/SaveCalendar', function (req, res) {
    console.log('request', req.body.data);
    calendar_1.saveCalendar(req.body.data)
        .then(function (error) {
        res.send(error);
    }, function (resolve) {
        res.send(resolve);
    });
});
app.post('/FindCalendar', function (req, res) {
    console.log('run', req.body.data.date);
    calendar_1.findCalendar(req.body.data.date)
        .then(function (error) {
        res.send(error);
    }, function (resolve) {
        res.send(resolve);
    });
});
// ----------------- studentActivity --------------------- //
app.post('/SaveAuthentication', function (req, res) {
    console.log('request', req.body.data);
    authentication_1.saveAuthentication(req.body.data)
        .then(function (error) {
        res.send(error);
    }, function (resolve) {
        res.send(resolve);
    });
});
app.post('/FindAuthentication', function (req, res) {
    authentication_1.findAuthentication(req.body.data)
        .then(function (error) {
        res.send(error);
    }, function (resolve) {
        res.send(resolve);
    });
});
app.post('/UpdateToken', function (req, res) {
    authentication_1.updateToken(req.body.data).then(function (error) {
        res.send(error);
    }, function (resolve) {
        res.send(resolve);
    });
});
app.post('/SendNotification', function (req, _res) {
    var object = req.body.data;
    authentication_1.notificationSend(object)
        .then(function (error) {
        res.send(error);
    }, function (resolve) {
        authentication_1.findAuthentication({ email: resolve.data.data['emailId'] })
            .then(function (success) {
            //http request
            if (typeof success['data']['token'] == 'string') {
                var payloadOK = {
                    to: success['data']['token'],
                    data: {
                        url: 'news',
                        foo: 'fooooooooooooo',
                        bar: 'bar bar bar'
                    },
                    priority: 'high',
                    notification: {
                        title: object.subject, body: object.username + ' Asked a question', sound: "default", badge: "1"
                    }
                };
                fcmCli.send(payloadOK, function (err, res) {
                    if (err) {
                        _res.send({ data: err });
                    }
                    else {
                        ref.child(object.tuid).push(object).then(function (a) { console.log("a", a); }, function (a) { console.log("bB", a); });
                        // saveNotification()
                        //     .then((error) => {
                        //         res.send(error);
                        //     }, (resolve) => {
                        //         res.send(resolve);
                        //     })
                        _res.send({ data: res });
                    }
                });
            }
        }, function (error) {
            console.log('error', success);
        });
    });
});
// ----------------- studentActivity --------------------- //
app.post('/SaveStudentActivity', function (req, res) {
    console.log('request', req.body.data);
    saveStudentActivity(req.body.data)
        .then(function (error) {
        res.send(error);
    }, function (resolve) {
        res.send(resolve);
    });
});
app.get('/FindAllStudentIntract', function (req, res) {
    findStudentIntract({})
        .then(function (error) {
        res.send(error);
    }, function (resolve) {
        res.send(resolve);
    });
});
// ----------------- studentintract --------------------- //
app.post('/SaveStudentIntract', function (req, res) {
    console.log('request', req.body.data);
    saveStudentIntract(req.body.data)
        .then(function (error) {
        res.send(error);
    }, function (resolve) {
        res.send(resolve);
    });
});
app.get('/FindAllStudentIntract', function (req, res) {
    findStudentIntract({})
        .then(function (error) {
        res.send(error);
    }, function (resolve) {
        res.send(resolve);
    });
});
// ----------------- event --------------------- //
app.post('/SaveEvent', function (req, res) {
    console.log('request', req.body.data);
    event_1.saveEvent(req.body.data)
        .then(function (error) {
        res.send(error);
    }, function (resolve) {
        res.send(resolve);
    });
});
app.get('/FindAllEvent', function (req, res) {
    email_1.findEmail({})
        .then(function (error) {
        res.send(error);
    }, function (resolve) {
        res.send(resolve);
    });
});
// ----------------- parent --------------------- //
app.post('/SaveParent', function (req, res) {
    console.log('request', req.body.data);
    parent_1.saveParent(req.body.data)
        .then(function (error) {
        res.send(error);
    }, function (resolve) {
        res.send(resolve);
    });
});
app.get('/FindAllParent', function (req, res) {
    parent_1.findParent({})
        .then(function (error) {
        res.send(error);
    }, function (resolve) {
        res.send(resolve);
    });
});
// ----------------- enrollement --------------------- //
app.post('/SaveEnrollement', function (req, res) {
    console.log('request', req.body.data);
    enrollement_1.saveEnrollement(req.body.data)
        .then(function (error) {
        res.send(error);
    }, function (resolve) {
        res.send(resolve);
    });
});
app.get('/FindAllEnrollement', function (req, res) {
    enrollement_1.findEnrollement({})
        .then(function (error) {
        res.send(error);
    }, function (resolve) {
        res.send(resolve);
    });
});
app.get('/FindFullEnrollement', function (req, res) {
    enrollement_1.findEnrollementOfClassAndTeacher({})
        .then(function (error) {
        res.send(error);
    }, function (resolve) {
        res.send(resolve);
    });
});
// ----------------- class --------------------- //
app.post('/SaveClass', function (req, res) {
    console.log('request', req.body.data);
    class_1.saveClass(req.body.data)
        .then(function (error) {
        res.send(error);
    }, function (resolve) {
        res.send(resolve);
    });
});
app.get('/FindAllClass', function (req, res) {
    class_1.findClass({})
        .then(function (error) {
        res.send(error);
    }, function (resolve) {
        res.send(resolve);
    });
});
// ----------------- vote --------------------- //
app.post('/SaveVote', function (req, res) {
    console.log('request', req.body.data);
    vote_1.saveVote(req.body.data)
        .then(function (error) {
        res.send(error);
    }, function (resolve) {
        res.send(resolve);
    });
});
app.get('/FindAllVote', function (req, res) {
    vote_1.findVote({})
        .then(function (error) {
        res.send(error);
    }, function (resolve) {
        res.send(resolve);
    });
});
// ----------------- vanregistration --------------------- //
app.post('/SaveVanRegistration', function (req, res) {
    console.log('request', req.body.data);
    vanregistration_1.saveVanregistration(req.body.data)
        .then(function (error) {
        res.send(error);
    }, function (resolve) {
        res.send(resolve);
    });
});
app.get('/FindAllSolution', function (req, res) {
    vanregistration_1.findVanregistration({})
        .then(function (error) {
        res.send(error);
    }, function (resolve) {
        res.send(resolve);
    });
});
// ----------------- problem --------------------- //
app.post('/SaveProblem', function (req, res) {
    console.log('request', req.body.data);
    problem_1.saveProblem(req.body.data)
        .then(function (error) {
        res.send(error);
    }, function (resolve) {
        res.send(resolve);
    });
});
app.put('/UpdateStudentProblem', function (req, res) {
    console.log('request', req.body.data);
    problem_1.updateStudentProblem(req.body.data.match, req.body.data.studentId)
        .then(function (error) {
        res.send(error);
    }, function (resolve) {
        res.send(resolve);
    });
});
app.put('/UpdateStudentProblemVisited', function (req, res) {
    console.log('request', req.body.data);
    problem_1.updateStudentProblemVisited(req.body.data.match, req.body.data.studentId)
        .then(function (error) {
        res.send(error);
    }, function (resolve) {
        res.send(resolve);
    });
});
app.put('/UpdateStudentProblemVotes', function (req, res) {
    console.log('request', req.body.data);
    problem_1.updateStudentProblemVotes(req.body.data.match, req.body.data.studentId)
        .then(function (error) {
        res.send(error);
    }, function (resolve) {
        res.send(resolve);
    });
});
app.get('/FindAllStudentProblem', function (req, res) {
    problem_1.findAllStudentProblem({})
        .then(function (error) {
        res.send(error);
    }, function (resolve) {
        res.send(resolve);
    });
});
app.get('/FindAllProblem', function (req, res) {
    problem_1.findProblem({})
        .then(function (error) {
        res.send(error);
    }, function (resolve) {
        res.send(resolve);
    });
});
// ----------------- solution --------------------- //
app.post('/SaveSolution', function (req, res) {
    console.log('request', req.body.data);
    solution_1.saveSolution(req.body.data)
        .then(function (error) {
        res.send(error);
    }, function (resolve) {
        res.send(resolve);
    });
});
app.get('/FindAllSolution', function (req, res) {
    solution_1.findSolution({})
        .then(function (error) {
        res.send(error);
    }, function (resolve) {
        res.send(resolve);
    });
});
// ----------------- area --------------------- //
app.post('/SaveArea', function (req, res) {
    console.log('request', req.body.data);
    area_1.saveArea(req.body.data)
        .then(function (error) {
        res.send(error);
    }, function (resolve) {
        res.send(resolve);
    });
});
app.get('/FindAllVan', function (req, res) {
    area_1.findArea({})
        .then(function (error) {
        res.send(error);
    }, function (resolve) {
        res.send(resolve);
    });
});
// ----------------- van --------------------- //
app.post('/SaveVan', function (req, res) {
    console.log('request', req.body.data);
    van_1.saveVan(req.body.data)
        .then(function (error) {
        res.send(error);
    }, function (resolve) {
        res.send(resolve);
    });
});
app.get('/FindAllVan', function (req, res) {
    van_1.findVan({})
        .then(function (error) {
        res.send(error);
    }, function (resolve) {
        res.send(resolve);
    });
});
//------------------ email ------------------- //
app.post('/SaveEmail', function (req, res) {
    console.log('request', req.body.data);
    email_1.saveEmail(req.body.data)
        .then(function (error) {
        res.send(error);
    }, function (resolve) {
        res.send(resolve);
    });
});
app.get('/FindAllEmail', function (req, res) {
    email_1.findEmail({})
        .then(function (error) {
        res.send(error);
    }, function (resolve) {
        res.send(resolve);
    });
});
//------------------ subject ----------------- //
app.post('/SaveSubject', function (req, res) {
    console.log('request', req.body.data);
    subject_1.saveSubject(req.body.data)
        .then(function (error) {
        res.send(error);
    }, function (resolve) {
        res.send(resolve);
    });
});
app.post('/AssignSubject', function (req, res) {
    console.log('request', req.body.data);
    subject_1.assignSubject(req.body.data.id, req.body.data.teacherid)
        .then(function (error) {
        res.send(error);
    }, function (resolve) {
        res.send(resolve);
    });
});
app.post('/UpdateSubject', function (req, res) {
    console.log('request', req.body.data);
    subject_1.updateSubject(req.body.data.id, req.body.data)
        .then(function (error) {
        res.send(error);
    }, function (resolve) {
        res.send(resolve);
    });
});
app.get('/FindAllSubject', function (req, res) {
    subject_1.findSubject({})
        .then(function (error) {
        res.send(error);
    }, function (resolve) {
        res.send(resolve);
    });
});
app.get('/FindAllSubjectAssign', function (req, res) {
    subject_1.findAllSubjectAssign({})
        .then(function (error) {
        res.send(error);
    }, function (resolve) {
        res.send(resolve);
    });
});
//------------------ student ----------------- //
app.post('/SaveStudent', function (req, res) {
    console.log('request', req.body.data);
    student_1.saveStudent(req.body.data)
        .then(function (error) {
        res.send(error);
    }, function (resolve) {
        res.send(resolve);
    });
});
app.post('/SaveStudentEnrolled', function (req, res) {
    student_1.saveStudentEnrolled(req.body.data.sId, req.body.data.enrolled)
        .then(function (error) {
        res.send(error);
    }, function (resolve) {
        res.send(resolve);
    });
});
app.get('/FindAllStudent', function (req, res) {
    student_1.findStudent({})
        .then(function (error) {
        res.send(error);
    }, function (resolve) {
        res.send(resolve);
    });
});
app.get('/FindAllStudentEnrolled', function (req, res) {
    student_1.findAllStudentEnrolled({})
        .then(function (error) {
        res.send(error);
    }, function (resolve) {
        res.send(resolve);
    });
});
//------------------ teacher ----------------- //
app.post('/SaveTeacher', function (req, res) {
    console.log('request', req.body.data);
    teacher_1.saveTeacher(req.body.data)
        .then(function (error) {
        res.send(error);
    }, function (resolve) {
        res.send(resolve);
    });
});
app.get('/FindAllTeacher', function (req, res) {
    teacher_1.findTeacher({})
        .then(function (error) {
        res.send(error);
    }, function (resolve) {
        res.send(resolve);
    });
});
//------------- Email Template --------------------//
app.post('/FindAllEmails', function (req, res) {
    authentication_1.findAllEmails(req.body.data)
        .then(function (error) {
        res.send(error);
    }, function (resolve) {
        res.send(resolve);
    });
});
//----------- SEND SMS -----------------------//
var accountSid = 'AC8e626cb6e47df39963be8396f7f1f1d0';
var authToken = "108acedd714b2a1037b99921f107c0e4";
var client = require('twilio')(accountSid, authToken);
app.post('/SendAllsms', function (req, res) {
    client.messages.create({
        body: req.body.data.body,
        to: req.body.data.phone[0],
        from: "+17085710763"
    }, function (err, sms) {
        console.log(sms); // outputs "+14506667788"
        //console.log(sms); // outputs "word to your mother."
    });
});
app.post('/SendAllEmails', function (req, res) {
    authentication_1.SendAllEmail(req.body.data);
    // .then((error) => {
    //     res.send(error);
    // }, (resolve) => {
    //     res.send(resolve);
    // })
});
app.post('/SaveStudentEnrolled', function (req, res) {
    student_1.saveStudentEnrolled(req.body.data.match, req.body.data)
        .then(function (error) {
        res.send(error);
    }, function (resolve) {
        res.send(resolve);
    });
});
//------------------ teacher ----------------- //
//--- sms + email ---//
var CronJob = require('cron').CronJob;
var job = new CronJob({
    cronTime: '00 30 11 * * 1-5',
    onTick: function () {
        var rightNow = new Date();
        var todayDate = rightNow.toISOString().slice(0, 10);
        console.log(todayDate);
        calendar_1.findCalendar(todayDate + 'T00:00:00.000Z')
            .then(function (resolve) {
            if (resolve)
                console.log('calender data found', resolve);
            email_function_1.SendingMail('hasancomsoft@gmail.com', resolve.data.title, resolve.data.description);
            var accountSid = 'AC8e626cb6e47df39963be8396f7f1f1d0';
            var authToken = "108acedd714b2a1037b99921f107c0e4";
            var client = require('twilio')(accountSid, authToken);
            client.messages.create({
                body: resolve.data.description,
                to: "+923352866346",
                from: "+17085710763"
            }, function (err, sms) {
                console.log(sms.from); // outputs "+14506667788"
                console.log(sms.body); // outputs "word to your mother."
            });
        }, function (error) {
            console.log('!calender data found');
        });
    },
    start: false,
    timeZone: 'America/Los_Angeles'
});
job.start();
app.get('/', function (req, res) {
    console.log('....');
});
app.listen(process.env.PORT || 3000, function () {
    console.log('server start');
});
