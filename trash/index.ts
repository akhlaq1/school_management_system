
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



import { saveTeacher, findTeacher } from './schema/teacher';
import { saveStudent, findStudent, saveStudentEnrolled, findAllStudentEnrolled } from './schema/student';
import { saveSubject, findSubject, assignSubject, findAllSubjectAssign, updateSubject } from './schema/subject';
import { saveEmail, findEmail } from './schema/email';
import { saveVan, findVan } from './schema/van';
import { saveVanregistration, findVanregistration } from './schema/vanregistration';
import { saveArea, findArea } from './schema/area';
import { saveSolution, findSolution } from './schema/solution';
import { saveVote, findVote } from './schema/vote';
import { saveProblem, findProblem, updateStudentProblem, updateStudentProblemVisited, updateStudentProblemVotes, findAllStudentProblem } from './schema/problem';
import { saveClass, findClass } from './schema/class';
import { saveParent, findParent, updateCoordinates } from './schema/parent';
import { saveEvent, findEvent } from './schema/event';
import { saveAuthentication, findAuthentication, findAllEmails, SendAllEmail, notificationSend, updateToken } from './schema/authentication'
import { saveEnrollement, findEnrollement, findEnrollementOfClassAndTeacher } from './schema/enrollement'
import { saveCalendar, findCalendar } from './schema/calendar'
import { SendingMail } from './email-setup/email-function'
import { saveNotification, findNotification } from './schema/notification'


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

                                ref.child(object.tuid).push(object).then((a) => { console.log("a", a) }, (a) => { console.log("bB", a) })

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
                    console.log('error', success)


                })

        })
})

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
app.post('/UpdateCoordinates', (req: express.Request, res: express.Response) => {
        
    updateCoordinates(req.body.data.match,req.body.data.coordX,req.body.data.coordY)
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
    findEnrollementOfClassAndTeacher({})
        .then((error) => {
            res.send(error);
        }, (resolve) => {
            res.send(resolve);
        })
})

// ----------------- class --------------------- //
app.post('/SaveClass', (req: express.Request, res: express.Response) => {
    console.log('request', req.body.data);
    saveClass(req.body.data)
        .then((error) => {
            res.send(error);
        }, (resolve) => {
            res.send(resolve);
        })
})
app.get('/FindAllClass', (req: express.Request, res: express.Response) => {
    findClass({})
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
app.get('/FindAllSolution', (req: express.Request, res: express.Response) => {
    findVanregistration({})
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
app.post('/SaveVan', (req: express.Request, res: express.Response) => {
    console.log('request', req.body.data);
    saveVan(req.body.data)
        .then((error) => {
            res.send(error);
        }, (resolve) => {
            res.send(resolve);
        })
})
app.get('/FindAllVan', (req: express.Request, res: express.Response) => {
    findVan({})
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

var accountSid = 'AC8e626cb6e47df39963be8396f7f1f1d0';
var authToken = "108acedd714b2a1037b99921f107c0e4";
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
                    to: "+923352866346",
                    from: "+17085710763"
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



app.listen(process.env.PORT || 3000, () => {
    console.log('server start');
})

process.on('uncaughtException', function (ex) {
    console.log('error', ex)
});