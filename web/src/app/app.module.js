"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
//import { MdUniqueSelectionDispatcher } from '@angular2-material/core';
/*import { MdIconModule, MdIconRegistry } from '@angular2-material/icon';
*/
var core_2 = require("angular2-google-maps/core");
var material_1 = require("@angular/material");
var flex_layout_1 = require("@angular/flex-layout");
var ng2_table_1 = require("ng2-table");
/*
import { MdButtonModule } from '@angular2-material/button';
import { MdCardModule } from '@angular2-material/card';
import { MdCheckboxModule } from '@angular2-material/checkbox';

import { MdInputModule } from '@angular2-material/input';
import { MdRadioModule } from '@angular2-material/radio';
import { MdSliderModule } from '@angular2-material/slider';
import { MdToolbarModule } from '@angular2-material/toolbar';
import { MdTooltipModule } from '@angular2-material/tooltip';
import { Ng2DropdownModule } from 'ng2-material-dropdown';
import { MdTabsModule } from '@angular2-material/tabs';

import { MdListModule } from '@angular2-material/list';
*/
var app_component_1 = require("./app.component");
require("hammerjs");
var forum_component_1 = require("./forum/forum.component");
var home_component_1 = require("./home/home.component");
var login_component_1 = require("./login/login.component");
var message_component_1 = require("./message/message.component");
var student_component_1 = require("./student/student.component");
var teacher_component_1 = require("./teacher/teacher.component");
var parent_component_1 = require("./parent/parent.component");
var van_component_1 = require("./van/van.component");
var registration_component_1 = require("./registration/registration.component");
var class_component_1 = require("./class/class.component");
var class_student_registration_component_1 = require("./class/class-student-registration/class-student-registration.component");
var class_teacher_registration_component_1 = require("./class/class-teacher-registration/class-teacher-registration.component");
var class_detail_component_1 = require("./class/class-detail/class-detail.component");
var subject_component_1 = require("./subject/subject.component");
var subject_class_registration_component_1 = require("./subject/subject-class-registration/subject-class-registration.component");
var subject_detail_component_1 = require("./subject/subject-detail/subject-detail.component");
var app_authGuards_1 = require("./app.authGuards");
/**
 * services
 */
var app_Service_1 = require("./app.Service");
var app_firebaseService_1 = require("./app.firebaseService");
var routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: home_component_1.HomeComponent },
    /* { path: 'dashboard', component: AppComponent },*/
    //{ path: 'student', component: StudentComponent , canActivate: [AuthGuard] },
    { path: 'student', component: student_component_1.StudentComponent },
    { path: 'teacher', component: teacher_component_1.TeacherComponent },
    { path: 'message', component: message_component_1.MessageComponent },
    { path: 'parent', component: parent_component_1.ParentComponent },
    { path: 'van', component: van_component_1.VanComponent },
    { path: 'forum', component: forum_component_1.ForumComponent },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'registration', component: registration_component_1.RegistrationComponent },
    { path: 'class', component: class_component_1.ClassComponent },
    { path: 'subject', component: subject_component_1.SubjectComponent },
    { path: 'student-profile/:id', component: student_detail_component_1.StudentDetailComponent },
    { path: 'teacher-profile/:id', component: teacher_detail_component_1.TeacherDetailComponent },
    { path: 'email', component: email_component_1.EmailComponent },
    { path: 'setting', component: setting_component_1.SettingComponent },
    { path: 'schoolranking', component: schoolranking_component_1.SchoolrankingComponent },
    { path: 'area', component: area_component_1.AreaComponent },
    { path: 'map', component: map_component_1.MapComponent },
    { path: 'driver', component: driver_component_1.DriverComponent }
];
var angularfire2_1 = require("angularfire2");
var forum_detail_component_1 = require("./forum/forum-detail/forum-detail.component");
var forum_detail_ans_component_1 = require("./forum/forum-detail-ans/forum-detail-ans.component");
var student_detail_component_1 = require("./student-detail/student-detail.component");
var teacher_detail_component_1 = require("./teacher-detail/teacher-detail.component");
var email_component_1 = require("./email/email.component");
var setting_component_1 = require("./setting/setting.component");
var form_array_pipe_1 = require("./form-array.pipe");
var rank_component_1 = require("./rank/rank.component");
var notification_component_1 = require("./notification/notification.component");
var area_component_1 = require("./area/area.component");
var map_component_1 = require("./map/map.component");
var ranking_component_1 = require("./ranking/ranking.component");
var notice_board_component_1 = require("./notice-board/notice-board.component");
var questions_component_1 = require("./questions/questions.component");
var driver_component_1 = require("./driver/driver.component");
var filter_student_status_pipe_1 = require("./van/filter-student-status.pipe");
var schoolranking_component_1 = require("./schoolranking/schoolranking.component");
// Must export the config
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
            app_component_1.AppComponent,
            home_component_1.HomeComponent,
            student_component_1.StudentComponent,
            teacher_component_1.TeacherComponent,
            message_component_1.MessageComponent,
            parent_component_1.ParentComponent,
            van_component_1.VanComponent,
            forum_component_1.ForumComponent,
            login_component_1.LoginComponent,
            registration_component_1.RegistrationComponent,
            class_component_1.ClassComponent,
            class_student_registration_component_1.ClassStudentRegistrationComponent,
            class_teacher_registration_component_1.ClassTeacherRegistrationComponent,
            class_detail_component_1.ClassDetailComponent,
            subject_component_1.SubjectComponent,
            subject_class_registration_component_1.SubjectClassRegistrationComponent,
            subject_detail_component_1.SubjectDetailComponent,
            forum_detail_component_1.ForumDetailComponent,
            forum_detail_ans_component_1.ForumDetailAnsComponent,
            student_detail_component_1.StudentDetailComponent,
            teacher_detail_component_1.TeacherDetailComponent,
            email_component_1.EmailComponent,
            setting_component_1.SettingComponent,
            form_array_pipe_1.FormArrayPipe,
            rank_component_1.RankComponent,
            notification_component_1.NotificationComponent,
            area_component_1.AreaComponent,
            map_component_1.MapComponent,
            ranking_component_1.RankingComponent,
            notice_board_component_1.NoticeBoardComponent,
            questions_component_1.QuestionsComponent,
            driver_component_1.DriverComponent,
            filter_student_status_pipe_1.FilterStudentStatusPipe,
            schoolranking_component_1.SchoolrankingComponent,
        ],
        imports: [
            ng2_table_1.Ng2TableModule,
            http_1.HttpModule,
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            /*Ng2DropdownModule,
            MdListModule,
           MdButtonModule,
           MdCardModule,
           MdCheckboxModule,
           MdIconModule,
           MdInputModule,
           MdRadioModule,
           MdSliderModule,
           MdToolbarModule,
           MdTooltipModule,
           MdTabsModule,
        */
            material_1.MaterialModule.forRoot(),
            flex_layout_1.FlexLayoutModule.forRoot(),
            angularfire2_1.AngularFireModule.initializeApp(exports.firebaseConfig),
            router_1.RouterModule.forRoot(routes),
            core_2.AgmCoreModule.forRoot({
                apiKey: 'AIzaSyBZVs2PkDv9btc_nqQvBytm_JFTVzjyd4k'
            })
        ],
        providers: [
            app_firebaseService_1.firebaseService,
            app_authGuards_1.AuthGuard,
            // MdUniqueSelectionDispatcher,
            { provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy },
            {
                provide: http_1.Http,
                useFactory: httpFactory,
                deps: [http_1.XHRBackend, http_1.RequestOptions]
            }
        ],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
function httpFactory(backend, defaultOptions) {
    return new app_Service_1.CustomHttp(backend, defaultOptions);
}
exports.httpFactory = httpFactory;
/*
platformBrowserDynamic().bootstrapModule(AppComponent)
  .catch((err: any) => console.error(err))
*/ 
