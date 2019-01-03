import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgModule } from '@angular/core';


import { FormsModule } from '@angular/forms';
import { ConnectionBackend, HttpModule, XHRBackend, RequestOptions, Http } from '@angular/http';
import { RouterModule, Routes, ActivatedRoute } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
//import { MdUniqueSelectionDispatcher } from '@angular2-material/core';
/*import { MdIconModule, MdIconRegistry } from '@angular2-material/icon';
*/

import { AgmCoreModule } from 'angular2-google-maps/core';

import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from "@angular/flex-layout";
import { Ng2TableModule } from 'ng2-table/ng2-table';


import {ImageUploadModule} from 'angular2-image-upload'




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
import { AppComponent } from './app.component';

import 'hammerjs';



import { ForumComponent } from './forum/forum.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MessageComponent } from './message/message.component';
import { StudentComponent } from './student/student.component';
import { TeacherComponent } from './teacher/teacher.component';
import { ParentComponent } from './parent/parent.component';
import { VanComponent } from './van/van.component';
import { RegistrationComponent } from './registration/registration.component';
import { ClassComponent } from './class/class.component';
import { ClassStudentRegistrationComponent } from './class/class-student-registration/class-student-registration.component';
import { ClassTeacherRegistrationComponent } from './class/class-teacher-registration/class-teacher-registration.component';
import { ClassDetailComponent } from './class/class-detail/class-detail.component';
import { SubjectComponent } from './subject/subject.component';
import { SubjectClassRegistrationComponent } from './subject/subject-class-registration/subject-class-registration.component';
import { SubjectDetailComponent } from './subject/subject-detail/subject-detail.component';


import { AuthGuard } from './app.authGuards';
/**
 * services
 */
import { CustomHttp } from './app.Service'
import { firebaseService } from './app.firebaseService'

const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'dashboard', component: HomeComponent },
  /* { path: 'dashboard', component: AppComponent },*/
  //{ path: 'student', component: StudentComponent , canActivate: [AuthGuard] },
  { path: 'student', component: StudentComponent },
  { path: 'teacher', component: TeacherComponent },
  { path: 'message', component: MessageComponent },
  { path: 'parent', component: ParentComponent },
  { path: 'van', component: VanComponent },
  { path: 'forum', component: ForumComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'class', component: ClassComponent },
  { path: 'subject', component: SubjectComponent },
  { path: 'student-profile/:id', component: StudentDetailComponent },
  { path: 'teacher-profile/:id', component: TeacherDetailComponent },
  { path: 'email', component: EmailComponent },
  { path: 'setting', component: SettingComponent },
  { path: 'schoolranking', component: SchoolrankingComponent },
  { path: 'area', component: AreaComponent },
  { path: 'map', component: MapComponent },
  { path: 'driver', component: DriverComponent },
  { path: 'writedoc', component: WritedocComponent },
  { path: 'writesubject', component: WritesubjectComponent },
  { path: 'writetopic', component: TopicsComponent },
  { path: 'routes', component: RoutesComponent }



];


//import {MathJax} from 'mathjax'

import { AngularFireModule } from 'angularfire2';
import { ForumDetailComponent } from './forum/forum-detail/forum-detail.component';
import { ForumDetailAnsComponent } from './forum/forum-detail-ans/forum-detail-ans.component';
import { StudentDetailComponent } from './student-detail/student-detail.component';
import { TeacherDetailComponent } from './teacher-detail/teacher-detail.component';
import { EmailComponent } from './email/email.component';
import { SettingComponent } from './setting/setting.component';

import { FormArrayPipe } from './form-array.pipe';
import { RankComponent } from './rank/rank.component';
import { NotificationComponent } from './notification/notification.component';
import { AreaComponent } from './area/area.component';

import { MapComponent } from './map/map.component';
import { RankingComponent } from './ranking/ranking.component';
import { NoticeBoardComponent } from './notice-board/notice-board.component';
import { QuestionsComponent } from './questions/questions.component';
import { DriverComponent } from './driver/driver.component';
import { FilterStudentStatusPipe } from './van/filter-student-status.pipe';
import { SchoolrankingComponent } from './schoolranking/schoolranking.component';
import { SearchpipePipe } from './searchpipe.pipe';
import { WritedocComponent } from './writedoc/writedoc.component';
import { WritesubjectComponent } from './writesubject/writesubject.component';
import { ReputationComponent } from './reputation/reputation.component';
import { TopicsComponent } from './topics/topics.component';
import { DetailtopicComponent } from './detailtopic/detailtopic.component';
import { RoutesComponent } from './routes/routes.component';
// Must export the config
export const firebaseConfig = {
  apiKey: "AIzaSyCuZRR_WkQxHZOtpZqSQUF1MogJ-eZhOT8",
  authDomain: "school-web-7d8e8.firebaseapp.com",
  databaseURL: "https://school-web-7d8e8.firebaseio.com",
  storageBucket: "school-web-7d8e8.appspot.com",
  messagingSenderId: "1049476182454"
};


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StudentComponent,
    TeacherComponent,
    MessageComponent,
    ParentComponent,
    VanComponent,
    ForumComponent,
    LoginComponent,
    RegistrationComponent,
    ClassComponent,
    ClassStudentRegistrationComponent,
    ClassTeacherRegistrationComponent,
    ClassDetailComponent,
    SubjectComponent,
    SubjectClassRegistrationComponent,
    SubjectDetailComponent,
    ForumDetailComponent,
    ForumDetailAnsComponent,
    StudentDetailComponent,
    TeacherDetailComponent,
    EmailComponent,
    SettingComponent,

    FormArrayPipe,
    RankComponent,
    NotificationComponent,
    AreaComponent,

    MapComponent,
    RankingComponent,
    NoticeBoardComponent,
    QuestionsComponent,
    DriverComponent,
    FilterStudentStatusPipe,
    SchoolrankingComponent,
    SearchpipePipe,
    WritedocComponent,
    WritesubjectComponent,
    ReputationComponent,
    TopicsComponent,
    DetailtopicComponent,
    RoutesComponent,

  ],
  imports: [
    
    Ng2TableModule,
    HttpModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    ImageUploadModule.forRoot(),
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
    MaterialModule.forRoot(),
    FlexLayoutModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    RouterModule.forRoot(routes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBZVs2PkDv9btc_nqQvBytm_JFTVzjyd4k'
    })
  ],
  providers: [
    firebaseService,
    AuthGuard,
    // MdUniqueSelectionDispatcher,
    { provide: LocationStrategy, useClass: HashLocationStrategy },



    {
      provide: Http,
      useFactory: httpFactory,
      deps: [XHRBackend, RequestOptions]
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function httpFactory(backend: XHRBackend, defaultOptions: RequestOptions) {
  return new CustomHttp(backend, defaultOptions);
}
/*
platformBrowserDynamic().bootstrapModule(AppComponent)
  .catch((err: any) => console.error(err))
*/