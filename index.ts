
import express = require('express');

var bodyParser = require('body-parser');

import { connectionToDb } from './database/connection';
connectionToDb();


let request = require('request');

//import * as admin from "firebase-admin";

var admin = require("firebase-admin");

var FCM = require('fcm-node');

var SERVER_API_KEY = "AIzaSyBiYHGe_bMqWkTR8It_u8GOQ4sw27hX6TA";

var fcmCli = new FCM(SERVER_API_KEY);


/*
var firebase = require("firebase");

*/

let app = admin.initializeApp({
    credential: admin.credential.cert('school-web-7d8e8-firebase-adminsdk-rf9d0-68d90661a5.json'),
    databaseURL: "https://school-web-7d8e8.firebaseio.com"
});

var db = admin.database();
var ref = db.ref("/notification");



import { saveTeacher, findTeacher, updateTeacher } from './schema/teacher';
import { saveStudent, findStudent, saveStudentEnrolled, findAllStudentEnrolled, EditStudent } from './schema/student';
import { saveSubject, findSubject, assignSubject, findAllSubjectAssign, updateSubject, updateCSubject } from './schema/subject';
import { saveEmail, findEmail } from './schema/email';
import { saveDriver, findDriver } from './schema/driver';
import { saveVanregistration, findVanregistration, findFullVanDoc, updateVans, updateDriver } from './schema/vanregistration';
import { saveArea, findArea } from './schema/area';
import { saveSolution, findSolution } from './schema/solution';
import { saveVote, findVote } from './schema/vote';
import { saveProblem, findProblem, updateStudentProblem, updateStudentProblemVisited, updateStudentProblemVotes, findAllStudentProblem } from './schema/problem';
import { saveClass, findClass } from './schema/class';
import { saveParent, findParent, findSingleParent , editParent } from './schema/parent';
import { saveEvent, findEvent } from './schema/event';
import {
    updateAuthentication, updateCoordinates, updateProfileAuthentication,
    saveAuthentication, findAuthentication, findAllEmails, SendAllEmail, notificationSend,
    notificationSendStudent, updateToken, findAllAuthentication, updateTiming
} from './schema/authentication'
import { saveEnrollement, findEnrollement, findEnrollementOfClassAndTeacher } from './schema/enrollement'
import { saveCalendar, findCalendar } from './schema/calendar'
import { SendingMail } from './email-setup/email-function'
import { saveNotification, findNotification } from './schema/notification'

import { saveDoc, findDoc } from './schema/document';
import { saveTopic, findTopic } from './schema/topics';

import { findabuse, saveabuse } from './schema/abusment';

import { tripSave, findTrip } from './schema/trip'

import { saveBusStop, findBusStop } from './schema/routeArea'

import { saveRoute, findRoutes } from './schema/routes'



// import {saveStudentIntract,findStudentIntract} from './schema/studentintract';
// import {saveStudentActivity ,findStudentActivity} from './schema/studentactivity';

var path = require('path');

var app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 'extended': 'true' }));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
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




//----------------- Trip --------------------------//
/*
app.post('/SaveTrip',(req: express.Request, res: express.Response)=>{

    let object = req.body.data ;
    tripSave(object)
    .then((err)=>{
        res.send(err);        

    },(resolve)=>{
        res.send(resolve);

    })


})*/
//------------ Routes ----------------------//

app.post('/SaveRoute', (req: express.Request, res: express.Response) => {

    saveRoute(req.body.data)
        .then((error) => {
            res.send(error);
        }, (resolve) => {
            res.send(resolve);
        })
})

app.get('/FindRoute', (req: express.Request, res: express.Response) => {

    findRoutes(req.body.data)
        .then((error) => {
            res.send(error);
        }, (resolve) => {
            res.send(resolve);
        })
})


//-------------- BUS  STOP--------------------------------//
app.post('/SaveBusStop', (req: express.Request, res: express.Response) => {

    saveBusStop(req.body.data)
        .then((error) => {
            res.send(error);
        }, (resolve) => {
            res.send(resolve);
        })
})

app.get('/FindBusStop', (req: express.Request, res: express.Response) => {

    findBusStop(req.body.data)
        .then((error) => {
            res.send(error);
        }, (resolve) => {
            res.send(resolve);
        })
})

//----------------- schoolss -----------------------//


/*
app.post('/RateSchool', (req: express.Request, res: express.Response) => {
    
    rateSchool(req.body.data)
        .then((error) => {
            res.send(error);
        }, (resolve) => {
            res.send(resolve);
        })
})*/
app.post('/UpdateTiming', (req: express.Request, res: express.Response) => {
    console.log(req.body.data, req.query)
    req.body.data._id = req.query._id;
    updateTiming(req.body.data)
        .then((error) => {
            res.send(error);
        }, (resolve) => {
            res.send(resolve);
        })
})
//------------------ Document ----------------------------- //


app.post('/SaveDocument', (req: express.Request, res: express.Response) => {
    console.log(req.body.data)
    saveDoc(req.body.data)
        .then((error) => {
            res.send(error);
        }, (resolve) => {
            res.send(resolve);
        })
})
app.post('/FindDoc', (req: express.Request, res: express.Response) => {

    // console.log(req.body.data.name)

    console.log(req.body.data.words)

    findDoc(req.body.data.words)
        .then((error) => {

            res.send(error);
        }, (resolve) => {

            res.send(resolve);

        })
})

//----------------- Topic --------------------------//

app.post('/SaveTopic', (req: express.Request, res: express.Response) => {
    console.log(req.body.data.words)

    req.body.data.words = JSON.parse(req.body.data.words);

    console.log(req.body.data.words)

    saveTopic(req.body.data)
        .then((error) => {
            res.send(error);
        }, (resolve) => {
            res.send(resolve);
        })
})
app.post('/FindTopic', (req: express.Request, res: express.Response) => {

    // console.log(req.body.data.name)

    console.log(req.body.data.words)

    findTopic(req.body.data.words)
        .then((error) => {

            res.send(error);
        }, (resolve) => {

            res.send(resolve);

        })
})

//------------------ Abusment ----------------------------- //


app.post('/SaveAbuse', (req: express.Request, res: express.Response) => {

    console.log(req.body)
    saveabuse(req.body.data)
        .then((error) => {
            res.send(error);
        }, (resolve) => {
            res.send(resolve);
        })
})
app.post('/FindAbuse', (req: express.Request, res: express.Response) => {

    // console.log(req.body.data.name)
    findabuse(req.body.data.name)
        .then((error) => {

            res.send(error);
        }, (resolve) => {

            res.send(resolve);

        })
})




//------------------ Calendar ----------------------------- //

app.post('/SaveCalendar', (req: express.Request, res: express.Response) => {
    console.log('request', req.body.data);
    saveCalendar(req.body.data)
        .then((error) => {
            res.send(error);
        }, (resolve) => {
            res.send(resolve);
        })
})
app.post('/FindCalendar', (req: express.Request, res: express.Response) => {


    console.log('run', req.body.data.date);

    findCalendar(req.body.data.date)
        .then((error) => {

            res.send(error);
        }, (resolve) => {

            res.send(resolve);

        })
})



// ----------------- studentActivity --------------------- //
app.post('/SaveAuthentication', (req: express.Request, res: express.Response) => {
    console.log('request', req.body.data);
    saveAuthentication(req.body.data)
        .then((error) => {
            res.send(error);
        }, (resolve) => {
            res.send(resolve);
        })
})


app.post('/FindAuthentication', (req: express.Request, res: express.Response) => {


    findAuthentication(req.body.data)
        .then((error) => {
            res.send(error);
        }, (resolve) => {
            res.send(resolve);
        })
})


app.post('/UploadImage', (req: express.Request, res: express.Response) => {

    /*if (req.body) {
        updateProfileAuthentication(req.body)
            .then(error => {
                res.send(error)
            }, (success) => {
                res.send(success)
            })

    }
    else {
        res.send('ok')
    }*/
    res.send('ok')

    /*findAuthentication(req.body.data)
        .then((error) => {
            res.send(error);
        }, (resolve) => {
            res.send(resolve);
        })*/
})

app.post('/UpdateAuthentication', (req: express.Request, res: express.Response) => {

    updateProfileAuthentication(req.body)
        .then(error => {
            res.send(error)
        }, (success) => {
            res.send(success)
        })

})

app.post('/SchoolVote', (req: express.Request, res: express.Response) => {
    console.log(req.body.data)
    updateAuthentication(req.body.data)
        .then((error) => {
            res.send(error);
        }, (resolve) => {
            res.send(resolve);
        })
})





app.get('/FindAuthentication', (req: express.Request, res: express.Response) => {
    findAllAuthentication({})
        .then((error) => {
            res.send(error);
        }, (resolve) => {
            res.send(resolve);
        })
})



app.post('/UpdateToken', (req: express.Request, res: express.Response) => {
    updateToken(req.body.data).then((error) => {
        res.send(error);
    }, (resolve) => {
        res.send(resolve);
    })
})
app.post('/SendNotification', (req: express.Request, _res: express.Response) => {
    let object = req.body.data;




    notificationSend(object)
        .then((error) => {
            res.send(error);
        }, (resolve) => {

            findAuthentication({ email: resolve.data.data['emailId'] })
                .then((success) => {
                    //http request

                    if (typeof success['data']['token'] == 'string') {
                        var payloadOK = {

                            to: success['data']['token'],
                            data: { //some data object (optional)
                                url: 'news',
                                foo: 'fooooooooooooo',
                                bar: 'bar bar bar'
                            },
                            priority: 'high',
                            notification: { //notification object
                                title: object.subject, body: object.username + ' Asked a question', sound: "default", badge: "1"
                            }
                        };

                        fcmCli.send(payloadOK, function (err, res) {
                            if (err) {
                                _res.send({ data: err });
                            }
                            else {



                                ref.child(object.tuid).push(object).then((a) => {
                                    console.log("a")
                                }, (a) => { console.log("bB") })

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
                }, (error) => {
                    console.log('error', error)


                })

        })
})
app.post('/SendStudentNotification', (req: express.Request, _res: express.Response) => {
    let object = req.body.data;



    notificationSendStudent(object)
        .then((success) => {

            findAuthentication({ email: success['data']['email'] })
                .then((success) => {

                    console.log(success)

                    var payloadOK = {
                        to: success['data']['token'],
                        data: { //some data object (optional)
                            url: 'news',
                            foo: 'fooooooooooooo',
                            bar: 'bar bar bar'
                        },
                        priority: 'high',
                        notification: { //notification object
                            title: object.subject, body: object.username + ' Given Answer', sound: "default", badge: "1"
                        }
                    };

                    fcmCli.send(payloadOK, function (err, res) {
                        if (err) {
                            _res.send({ data: err });
                        }
                        else {

                            ref.child(object.stuid).push(object)

                                .then((a) => {
                                    console.log("a")
                                }, (a) => {
                                    console.log("bB")
                                })


                            _res.send({ data: res });
                        }
                    });
                })
        })

})
/*
app.post('/SendStudentNotification', (req: express.Request, _res: express.Response) => {
    let object = req.body.data;
    
    notificationSendStudent(object)
        .then((resolve) => {
 
            console.log('data from resolve',resolve);
 
            /*findAuthentication({ email: resolve.data.data['emailId'] })
                .then((success) => {
                    //http request
 
                    if (typeof success['data']['token'] == 'string') {
                        var payloadOK = {
 
                            to: success['data']['token'],
                            data: { //some data object (optional)
                                url: 'news',
                                foo: 'fooooooooooooo',
                                bar: 'bar bar bar'
                            },
                            priority: 'high',
                            notification: { //notification object
                                title: object.subject, body: object.username + ' Given Answer', sound: "default", badge: "1"
                            }
                        };
 
                        fcmCli.send(payloadOK, function (err, res) {
                            if (err) {
                                _res.send({ data: err });
                            }
                            else {
 
                                ref.child(object.stuid).push(object).then((a) => { console.log("a", a) }, (a) => { console.log("bB", a) })
 
 
                                _res.send({ data: res });
                            }
                        });
                    }
                }
            },(error)=>{
                console.log(error)
            })
    
        }, (error) => {
            console.log(error);
 
        })
})*/
/*
// ----------------- studentActivity --------------------- //
app.post('/SaveStudentActivity', (req: express.Request, res: express.Response) => {
    console.log('request', req.body.data);
    saveStudentActivity(req.body.data)
        .then((error) => {
            res.send(error);
        }, (resolve) => {
            res.send(resolve);
        })
})
app.get('/FindAllStudentIntract', (req: express.Request, res: express.Response) => {
    findStudentIntract({})
        .then((error) => {
            res.send(error);
        }, (resolve) => {
            res.send(resolve);
        })
})
 
// ----------------- studentintract --------------------- //
app.post('/SaveStudentIntract', (req: express.Request, res: express.Response) => {
    console.log('request', req.body.data);
    saveStudentIntract(req.body.data)
        .then((error) => {
            res.send(error);
        }, (resolve) => {
            res.send(resolve);
        })
})
app.get('/FindAllStudentIntract', (req: express.Request, res: express.Response) => {
    findStudentIntract({})
        .then((error) => {
            res.send(error);
        }, (resolve) => {
            res.send(resolve);
        })
})*/

// ----------------- event --------------------- //
app.post('/SaveEvent', (req: express.Request, res: express.Response) => {
    console.log('request', req.body.data);
    saveEvent(req.body.data)
        .then((error) => {
            res.send(error);
        }, (resolve) => {
            res.send(resolve);
        })
})
app.get('/FindAllEvent', (req: express.Request, res: express.Response) => {
    findEmail({})
        .then((error) => {
            res.send(error);
        }, (resolve) => {
            res.send(resolve);
        })
})

// ----------------- parent --------------------- //
app.post('/SaveParent', (req: express.Request, res: express.Response) => {
    console.log('request', req.body.data);
    saveParent(req.body.data)
        .then((error) => {
            res.send(error);
        }, (resolve) => {
            res.send(resolve);
        })
})
app.get('/FindAllParent', (req: express.Request, res: express.Response) => {
    findParent({})
        .then((error) => {
            res.send(error);
        }, (resolve) => {
            res.send(resolve);
        })
})
app.post('/FindAllParent', (req: express.Request, res: express.Response) => {

    let object = req.body.data;

    findParent(object)
        .then((error) => {
            res.send(error);
        }, (resolve) => {
            res.send(resolve);
        })
})


app.post('/FindSingleParent', (req: express.Request, res: express.Response) => {

    let obj = req.body.data;
    findSingleParent(obj)
        .then((error) => {
            res.send(error);
        }, (resolve) => {
            res.send(resolve);
        })
})
app.post('/UpdateCoordinates', (req: express.Request, res: express.Response) => {

    updateCoordinates(req.body.data.match, req.body.data.coordX, req.body.data.coordY)
        .then((error) => {
            res.send(error);
        }, (resolve) => {
            res.send(resolve);
        })
})

app.post('/UpdateSchoolCoordinates', (req: express.Request, res: express.Response) => {

    updateCoordinates({ _id: req.query._id }, req.body.data.coordX, req.body.data.coordY)
        .then((error) => {
            res.send(error);
        }, (resolve) => {
            res.send(resolve);
        })
})

app.post('/EditParent', (req: express.Request, res: express.Response) => {

    let data = req.query.data;
    editParent(data)
        .then((error) => {
            res.send(error);
        }, (resolve) => {
            res.send(resolve);
        })
})

// ----------------- enrollement --------------------- //
app.post('/SaveEnrollement', (req: express.Request, res: express.Response) => {
    console.log('request', req.body.data);
    saveEnrollement(req.body.data)
        .then((error) => {
            res.send(error);
        }, (resolve) => {
            res.send(resolve);
        })
})
app.get('/FindAllEnrollement', (req: express.Request, res: express.Response) => {
    findEnrollement({})
        .then((error) => {
            res.send(error);
        }, (resolve) => {
            res.send(resolve);
        })
})
app.get('/FindFullEnrollement', (req: express.Request, res: express.Response) => {

    console.log(req.query._id)
    findEnrollementOfClassAndTeacher({})
        .then((error) => {
            res.send(error);
        }, (resolve) => {
            res.send(resolve);
        })
})

// ----------------- class --------------------- //
app.post('/SaveClass', (req: express.Request, res: express.Response) => {

    req.body.data.schoolId = req.query._id;




    saveClass(req.body.data)
        .then((error) => {
            res.send(error);
        }, (resolve) => {
            res.send(resolve);
        })
})
app.get('/FindAllClass', (req: express.Request, res: express.Response) => {

    console.log(req.query._id);
    findClass({ schoolId: req.query._id })
        .then((error) => {
            res.send(error);
        }, (resolve) => {
            res.send(resolve);
        })
})


// ----------------- vote --------------------- //
app.post('/SaveVote', (req: express.Request, res: express.Response) => {
    console.log('request', req.body.data);
    saveVote(req.body.data)
        .then((error) => {
            res.send(error);
        }, (resolve) => {
            res.send(resolve);
        })
})
app.get('/FindAllVote', (req: express.Request, res: express.Response) => {
    findVote({})
        .then((error) => {
            res.send(error);
        }, (resolve) => {
            res.send(resolve);
        })
})
//------------------ van --------------------------------//

app.post('/SaveVan', (req: express.Request, res: express.Response) => {

    saveVan(req.body.data)
        .then((error) => {
            res.send(error);
        }, (resolve) => {
            res.send(resolve);
        })
})

// ----------------- vanregistration --------------------- //
app.post('/SaveVanRegistration', (req: express.Request, res: express.Response) => {
    console.log('request', req.body.data);
    saveVanregistration(req.body.data)
        .then((error) => {
            res.send(error);
        }, (resolve) => {
            res.send(resolve);
        })
})

app.get('/FindVanRegistration', (req: express.Request, res: express.Response) => {
    findVanregistration({})
        .then((error) => {
            res.send(error);
        }, (resolve) => {
            res.send(resolve);
        })
})

app.post('/FindVanRegistration', (req: express.Request, res: express.Response) => {

    let uid = req.body.data.uid;

    console.log(uid)


    findVanregistration({ driverUid: uid })
        .then((error) => {
            res.send(error);
        }, (resolve) => {
            res.send(resolve);
        })
})



app.post('/GetAllVanDoc', (req: express.Request, res: express.Response) => {
    let obj = req.body.data.object
    console.log(obj)
    findFullVanDoc(obj)
        .then((error) => {
            res.send(error);
        }, (resolve) => {
            res.send(resolve);
        })
})

app.post('/AssignVan', (req: express.Request, res: express.Response) => {

    updateVans(req.body.data.vanregId, req.body.data.groupOfStudents)
        .then((error) => {
            res.send(error);
        }, (resolve) => {
            res.send(resolve);
        })
})


app.post('/AssignDriver', (req: express.Request, res: express.Response) => {

    updateDriver(req.body.data.vanregId, req.body.data.driverId, req.body.data.driveruid)
        .then((error) => {
            res.send(error);
        }, (resolve) => {
            res.send(resolve);
        })
})


//------------------ 


app.get('/FindAllSolution', (req: express.Request, res: express.Response) => {
    findDriverregistration({})
        .then((error) => {
            res.send(error);
        }, (resolve) => {
            res.send(resolve);
        })
})
// ----------------- problem --------------------- //
app.post('/SaveProblem', (req: express.Request, res: express.Response) => {
    console.log('request', req.body.data);
    saveProblem(req.body.data)
        .then((error) => {
            res.send(error);
        }, (resolve) => {
            res.send(resolve);
        })
})


app.put('/UpdateStudentProblem', (req: express.Request, res: express.Response) => {
    console.log('request', req.body.data);
    updateStudentProblem(req.body.data.match, req.body.data.studentId)
        .then((error) => {
            res.send(error);
        }, (resolve) => {
            res.send(resolve);
        })
})

app.put('/UpdateStudentProblemVisited', (req: express.Request, res: express.Response) => {
    console.log('request', req.body.data);
    updateStudentProblemVisited(req.body.data.match, req.body.data.studentId)
        .then((error) => {
            res.send(error);
        }, (resolve) => {
            res.send(resolve);
        })
})

app.put('/UpdateStudentProblemVotes', (req: express.Request, res: express.Response) => {
    console.log('request', req.body.data);
    updateStudentProblemVotes(req.body.data.match, req.body.data.studentId)
        .then((error) => {
            res.send(error);
        }, (resolve) => {
            res.send(resolve);
        })
})

app.get('/FindAllStudentProblem', (req: express.Request, res: express.Response) => {
    findAllStudentProblem({})
        .then((error) => {
            res.send(error);
        }, (resolve) => {
            res.send(resolve);
        })
})

app.get('/FindAllProblem', (req: express.Request, res: express.Response) => {
    findProblem({})
        .then((error) => {
            res.send(error);
        }, (resolve) => {
            res.send(resolve);
        })
})


// ----------------- solution --------------------- //
app.post('/SaveSolution', (req: express.Request, res: express.Response) => {
    console.log('request', req.body.data);
    saveSolution(req.body.data)
        .then((error) => {
            res.send(error);
        }, (resolve) => {
            res.send(resolve);
        })
})
app.get('/FindAllSolution', (req: express.Request, res: express.Response) => {
    findSolution({})
        .then((error) => {
            res.send(error);
        }, (resolve) => {
            res.send(resolve);
        })
})
// ----------------- area --------------------- //
app.post('/SaveArea', (req: express.Request, res: express.Response) => {
    console.log('request', req.body.data);
    saveArea(req.body.data)
        .then((error) => {
            res.send(error);
        }, (resolve) => {
            res.send(resolve);
        })
})
app.get('/FindAllArea', (req: express.Request, res: express.Response) => {
    findArea({})
        .then((error) => {
            res.send(error);
        }, (resolve) => {
            res.send(resolve);
        })
})
// ----------------- van --------------------- //
app.post('/SaveDriver', (req: express.Request, res: express.Response) => {
    console.log('request', req.body.data);
    saveDriver(req.body.data)
        .then((error) => {
            res.send(error);
        }, (resolve) => {
            res.send(resolve);
        })
})
app.get('/FindAllDriver', (req: express.Request, res: express.Response) => {
    findDriver({})
        .then((error) => {
            res.send(error);
        }, (resolve) => {
            res.send(resolve);
        })
})

//------------------ email ------------------- //
app.post('/SaveEmail', (req: express.Request, res: express.Response) => {
    console.log('request', req.body.data);
    saveEmail(req.body.data)
        .then((error) => {
            res.send(error);
        }, (resolve) => {
            res.send(resolve);
        })
})
app.get('/FindAllEmail', (req: express.Request, res: express.Response) => {
    findEmail({})
        .then((error) => {
            res.send(error);
        }, (resolve) => {
            res.send(resolve);
        })
})
//------------------ subject ----------------- //

app.post('/SaveSubject', (req: express.Request, res: express.Response) => {
    console.log('request', req.body.data);
    saveSubject(req.body.data)
        .then((error) => {
            res.send(error);
        }, (resolve) => {
            res.send(resolve);
        })
})

app.post('/AssignSubject', (req: express.Request, res: express.Response) => {
    console.log('request', req.body.data);
    assignSubject(req.body.data.id, req.body.data.teacherid)
        .then((error) => {
            res.send(error);
        }, (resolve) => {
            res.send(resolve);
        })
})

app.post('/UpdateSubject', (req: express.Request, res: express.Response) => {
    console.log('request', req.body.data);
    updateSubject(req.body.data.id, req.body.data)
        .then((error) => {
            res.send(error);
        }, (resolve) => {
            res.send(resolve);
        })
})

app.post('/UpdateCSubject', (req: express.Request, res: express.Response) => {
    console.log('request', req.body.data);
    updateCSubject(req.body.data._id, req.body.data)
        .then((error) => {
            res.send(error);
        }, (resolve) => {
            res.send(resolve);
        })
})


app.get('/FindAllSubject', (req: express.Request, res: express.Response) => {
    findSubject({})
        .then((error) => {
            res.send(error);
        }, (resolve) => {
            res.send(resolve);
        })

})

app.get('/FindAllSubjectAssign', (req: express.Request, res: express.Response) => {
    findAllSubjectAssign({})
        .then((error) => {
            res.send(error);
        }, (resolve) => {
            res.send(resolve);
        })

})
//------------------ student ----------------- //
app.post('/SaveStudent', (req: express.Request, res: express.Response) => {
    console.log('request', req.body.data);
    saveStudent(req.body.data)
        .then((error) => {
            res.send(error);
        }, (resolve) => {
            res.send(resolve);
        })
})
app.post('/SaveStudentEnrolled', (req: express.Request, res: express.Response) => {


    saveStudentEnrolled(req.body.data.sId, req.body.data.enrolled)
        .then((error) => {
            res.send(error);
        }, (resolve) => {
            res.send(resolve);
        })
})

app.get('/FindAllStudent', (req: express.Request, res: express.Response) => {
    findStudent({})
        .then((error) => {
            res.send(error);
        }, (resolve) => {
            res.send(resolve);
        })

})

app.get('/FindAllStudentEnrolled', (req: express.Request, res: express.Response) => {
    findAllStudentEnrolled({})
        .then((error) => {
            res.send(error);
        }, (resolve) => {
            res.send(resolve);
        })

})

app.post('/EditStudent', (req: express.Request, res: express.Response) => {
    let obj = req.body.data;

    EditStudent(obj)
        .then((error) => {
            res.send(error);
        }, (resolve) => {
            res.send(resolve);
        })

})

//------------------ teacher ----------------- //
app.post('/SaveTeacher', (req: express.Request, res: express.Response) => {
    console.log('request', req.body.data);
    saveTeacher(req.body.data)
        .then((error) => {
            res.send(error);
        }, (resolve) => {
            res.send(resolve);
        })
})
app.get('/FindAllTeacher', (req: express.Request, res: express.Response) => {
    findTeacher({})
        .then((error) => {
            res.send(error);
        }, (resolve) => {
            res.send(resolve);
        })

})

app.post('/UpdateTeacher', (req: express.Request, res: express.Response) => {

    updateTeacher(req.body.data)
        .then((error) => {
            res.send(error);
        }, (resolve) => {
            res.send(resolve);
        })
})

//------------- Email Template --------------------//
app.post('/FindAllEmails', (req: express.Request, res: express.Response) => {
    findAllEmails(req.body.data)
        .then((error) => {
            res.send(error);
        }, (resolve) => {
            res.send(resolve);
        })
})
//----------- SEND SMS -----------------------//

var accountSid = 'ACebf5584696c33c13f789dd67b2cc1969';
var authToken = "b9069902043b4b7179bfdac8c21e6a61";
var client = require('twilio')(accountSid, authToken);


app.post('/SendAllsms', (req: express.Request, res: express.Response) => {

    client.messages.create({
        body: req.body.data.body,
        to: req.body.data.phone[0],
        from: "+17085710763"
    }, function (err, sms) {

        console.log(sms); // outputs "+14506667788"
        //console.log(sms); // outputs "word to your mother."
    });
})


app.post('/SendAllEmails', (req: express.Request, res: express.Response) => {
    SendAllEmail(req.body.data)

    // .then((error) => {
    //     res.send(error);
    // }, (resolve) => {
    //     res.send(resolve);
    // })
})




app.post('/SaveStudentEnrolled', (req: express.Request, res: express.Response) => {

    saveStudentEnrolled(req.body.data.match, req.body.data)
        .then((error) => {
            res.send(error);
        }, (resolve) => {
            res.send(resolve);
        })
})

app.post('/writeDoc', (req: express.Request, res: express.Response) => {

    console.log(req.body.data)
    req.body.data.words = JSON.parse(req.body.data.words)
    saveDoc(req.body.data)
        .then((error) => {
            res.send(error);
        }, (resolve) => {
            res.send(resolve);
        })
})


app.post('/writeSubject', (req: express.Request, res: express.Response) => {
    console.log('request', req.body.data);
    saveSubject(req.body.data)
        .then((error) => {
            res.send(error);
        }, (resolve) => {
            res.send(resolve);
        })
})





//------------------ teacher ----------------- //


//--- sms + email ---//


var CronJob = require('cron').CronJob;
var job = new CronJob({
    cronTime: '00 30 11 * * 1-5',
    onTick: function () {
        var rightNow = new Date();
        var todayDate = rightNow.toISOString().slice(0, 10);
        console.log(todayDate);
        findCalendar(todayDate + 'T00:00:00.000Z')
            .then((resolve) => {
                if (resolve)
                    console.log('calender data found', resolve);
                SendingMail('hasancomsoft@gmail.com', resolve.data.title, resolve.data.description)


                var accountSid = 'AC8e626cb6e47df39963be8396f7f1f1d0';
                var authToken = "108acedd714b2a1037b99921f107c0e4";
                var client = require('twilio')(accountSid, authToken);

                client.messages.create({
                    body: resolve.data.description,
                    to: "+923322294881",
                    from: "+923322294881"
                }, function (err, sms) {
                    console.log(sms.from); // outputs "+14506667788"
                    console.log(sms.body); // outputs "word to your mother."
                });
            }, (error) => {
                console.log('!calender data found');

            })
    },
    start: false,
    timeZone: 'America/Los_Angeles'
});
job.start();

app.get('/', (req, res) => {
    console.log('....');
})

app.get('/getDate', (req, res) => {

    let date = new Date();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    res.send({ date: date.getFullYear() + "-" + month + "-" + day });

})

app.listen(process.env.PORT || 3000, () => {
    console.log('server start');
})

process.on('uncaughtException', function (ex) {
    console.log('error', ex)
});