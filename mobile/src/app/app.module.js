"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var ionic_angular_1 = require("ionic-angular");
var splash_screen_1 = require("@ionic-native/splash-screen");
var status_bar_1 = require("@ionic-native/status-bar");
var geolocation_1 = require("@ionic-native/geolocation");
var app_component_1 = require("./app.component");
var home_1 = require("../pages/home/home");
var map_1 = require("../components/map/map");
var pickup_1 = require("../components/pickup/pickup");
var driver_1 = require("../components/driver/driver");
var login_1 = require("../pages/login/login");
var angularfire2_1 = require("angularfire2");
var auth_1 = require("angularfire2/auth");
var http_1 = require("@angular/http");
var firebase_service_1 = require("../providers/firebase-service");
var database_1 = require("angularfire2/database");
exports.firebaseConfig = {
    apiKey: "AIzaSyCuZRR_WkQxHZOtpZqSQUF1MogJ-eZhOT8",
    authDomain: "school-web-7d8e8.firebaseapp.com",
    databaseURL: "https://school-web-7d8e8.firebaseio.com",
    storageBucket: "school-web-7d8e8.appspot.com",
    messagingSenderId: "1049476182454"
};
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        declarations: [
            app_component_1.MyApp,
            home_1.HomePage,
            map_1.Map,
            pickup_1.Pickup,
            login_1.Login,
            driver_1.Driver
        ],
        imports: [
            angularfire2_1.AngularFireModule.initializeApp(exports.firebaseConfig),
            platform_browser_1.BrowserModule,
            http_1.HttpModule,
            ionic_angular_1.IonicModule.forRoot(app_component_1.MyApp)
        ],
        bootstrap: [ionic_angular_1.IonicApp],
        entryComponents: [
            app_component_1.MyApp,
            home_1.HomePage,
            map_1.Map,
            pickup_1.Pickup,
            login_1.Login,
            driver_1.Driver
        ],
        providers: [
            status_bar_1.StatusBar,
            splash_screen_1.SplashScreen,
            geolocation_1.Geolocation,
            firebase_service_1.FirebaseService,
            auth_1.AngularFireAuth,
            database_1.AngularFireDatabase,
            { provide: core_1.ErrorHandler, useClass: ionic_angular_1.IonicErrorHandler }
        ]
    })
], AppModule);
exports.AppModule = AppModule;
