import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { firebaseService } from './../app.firebaseService'
import { MdSnackBar } from '@angular/material';
@Component({
  selector: 'app-schoolranking',
  templateUrl: './schoolranking.component.html',
  styleUrls: ['./schoolranking.component.css']
})
export class SchoolrankingComponent implements OnInit {

  schools = [];
  voters = [];
  _id;
  votedFor;
  profile;
  isEdit = false;
  otherImages = [];
  constructor(public http: Http, private af: firebaseService, private snackBar: MdSnackBar, ) {
    this._id = localStorage.getItem('_id')
    this.profile = localStorage.getItem('image')

  }

  ngOnInit() {
    this.makeRequest();
  }

  doEdit() {
    this.isEdit = !this.isEdit;
  }

  imageUploaded(res) {

    this.http.post('/UpdateAuthentication', { _id: this._id, src: res.src })
      .subscribe((res: Response) => {
        this.snackBar.open('', 'Image Uploaded', {
          duration: 2000
        })

      })
  }
  makeRequest(): void {

    this.http.request('/FindAuthentication')
      .subscribe((res: Response) => {
        let temp = res.json().data;

        this.schools = res.json().data;

        this.schools.forEach((element, i) => {
          this.schools[i]['countVoters'] = element['voters'].length;

          element['voters'].forEach((ele, i) => {

            this.otherImages.push(ele.img);

          })


        });

        this.schools.sort((a, b) => {

          if (a.countVoters === b.countVoters) {
            return 0;
          }
          else {
            return (a.countVoters < b.countVoters) ? 1 : -1;
          }
        })

        console.log(this.otherImages);




      }, (error) => {
        console.log(error);
      });
  }


  upVote(schoolId) {
    this.checkForVoters();

    if (!this.votedFor) {
      this.voters.push(this._id);
      this.http.post('/SchoolVote',
        {
          data: { _id: schoolId, voters: this.voters }
        })
        .subscribe((res) => {
          this.makeRequest();

        })
    }
    else if (this.votedFor != schoolId) {
      this.voters.splice(this.voters.indexOf(this._id))
      this.http.post('/SchoolVote',
        {
          data: { _id: this.votedFor, voters: this.voters }
        })
        .subscribe((res) => {
          this.makeRequest();

        })

      this.feacthSchool(schoolId);


    }

  }


  checkForVoters() {
    this.schools.forEach((items, i) => {
      items.voters.forEach((item) => {
        if (item == this._id) {
          this.votedFor = items._id;
          this.voters = items.voters;
        }
        else {
          this.votedFor = false;
          this.voters = items.voters;
        }

      })
    })
  }

  feacthSchool(schoolId) {

    this.http.post('/FindAuthentication',
      {
        data: { _id: schoolId }
      })
      .subscribe((res) => {
        //this.voters = res.json().data.voters
        this.voters = res.json().data.voters;
        this.voters.push(this._id);
        this.http.post('/SchoolVote',
          {
            data: { _id: schoolId, voters: this.voters }
          })
          .subscribe((res) => {
            this.makeRequest();

          })


      })


  }
  Logout() {
    this.af.Logout()
    localStorage.clear();
    //     this._router.navigate(['/login']);


  }


  /*checkForVoters() {
    
    this.schools.forEach(item => {
      console.log(item.voters.filter((cItem, i) => {
        return (cItem == this._id) ? this.schools : false
      }))
    })
  }*/



  /*

  checkVoters() {
    this.voters.filter(item => {
      item != this._id ? this.voters.push(this._id) : false;
    })
  }

  upVote(schoolId): void {



    if (!this.voters.length || this.checkVoters()) {
      this.voters.push(this._id)
    }


    this.http.post('/SchoolVote',
      { data: { _id: schoolId, voters: this.voters } }
      , (res) => {

      })
      .subscribe(res => {
        console.log(res.json().data)
      }, err => {
        console.log(err)
      })

  }
  downVote(schoolId): void {

    if (this.voters.indexOf(this._id) != -1) {
      this.voters.splice(this.voters.indexOf(this._id));
    }

    this.http.post('/SchoolVote',
      { data: { _id: schoolId, voters: this.voters } }
      , (res) => {
        console.log(res)
      })

  }*/

}
