import { Component, OnInit } from '@angular/core';
import { firebaseService } from './../app.firebaseService'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [firebaseService]
})

export class HomeComponent {

  type;
  uid;
  Opened =true;
  
  constructor(private _firebaseService: firebaseService) {

    if (localStorage.getItem('status')) {
      this.type = JSON.parse(localStorage.getItem('status'))['type']
      this.uid = JSON.parse(localStorage.getItem('status'))['uid']

      if ((this.type == 'teacher' && this.uid)) {
        this.type = 'teacher';
      }
      else if ((this.type == 'student' && this.uid)) {
        this.type = 'student';
      }
      else if ((this.type == 'admin' && this.uid)) {
        this.type = 'admin';
      }
    }

  }
  logout() {
    this._firebaseService.Logout();
    localStorage.clear();

  }
  isOpened(){
    
    this.Opened = !this.Opened;
    
  }

}
